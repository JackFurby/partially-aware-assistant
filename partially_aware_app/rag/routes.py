import requests
from flask import request, Response, flash, jsonify, session, render_template, redirect, url_for
from partially_aware_app.rag import bp
from partially_aware_app import db
from partially_aware_app.models import User, Agent, Model, KnowledgeBase
from partially_aware_app.rag.forms import UploadKnowledgeBaseForm, RAGQueryForm, LoadKnowledgeBaseForm
from partially_aware_app.rag.rag_service import RAGService
from flask_security import auth_required, current_user
from werkzeug.utils import secure_filename

# Global dict to store RAG services per session
# Key: (user_id, kb_id), Value: RAGService instance
rag_services = {}


@bp.route('/rag', methods=["GET", "POST"])
@auth_required("token", "session")
def rag():
	"""Main RAG interface"""
	upload_form = UploadKnowledgeBaseForm()
	load_form = LoadKnowledgeBaseForm()
	query_form = RAGQueryForm()

	# Populate agent/model choices
	agents = Agent.query.all()
	upload_form.agent_id.choices = [(a.id, a.name) for a in agents]
	upload_form.embedding_model.choices = []  # Populated dynamically
	query_form.agent_id.choices = [(a.id, a.name) for a in agents]
	query_form.model_name.choices = []  # Populated dynamically

	# Get user's knowledge bases
	knowledge_bases = KnowledgeBase.query.filter_by(user_id=current_user.id).order_by(KnowledgeBase.create_datetime.desc()).all()
	load_form.knowledge_base_id.choices = [(kb.id, kb.name) for kb in knowledge_bases]

	# Load knowledge base form submitted
	if request.method == "POST" and request.form.get('action') == 'load':
		kb_id = request.form.get("knowledge_base_id")
		if kb_id:
			session["kb_id"] = int(kb_id)
			flash("Knowledge base loaded successfully!", "success")
			return redirect(url_for('rag.rag'))

	# Get current knowledge base info
	current_kb = None
	agent_model = [None, None]
	if "kb_id" in session:
		current_kb = KnowledgeBase.query.get(session["kb_id"])
		# Ensure knowledge base belogs to current_user
		if current_kb and (current_kb.user_id != current_user.id):
			session.pop("kb_id")
			current_kb = None

	return render_template(
		'rag/rag.html',
		title='RAG Query',
		upload_form=upload_form,
		load_form=load_form,
		query_form=query_form,
		knowledge_bases=knowledge_bases,
		current_kb=current_kb,
		agent_model=agent_model
	)


@bp.route('/rag/upload', methods=["POST"])
@auth_required("token", "session")
def upload():
	"""Upload and create knowledge base"""
	form = UploadKnowledgeBaseForm()

	# Populate choices before validation
	agents = Agent.query.all()
	form.agent_id.choices = [(a.id, a.name) for a in agents]

	# Populate embedding model choices based on submitted agent
	if form.agent_id.data:
		models = Model.query.filter_by(agent_id=form.agent_id.data).all()
		form.embedding_model.choices = [(m.model_name, m.model_name) for m in models]
	else:
		form.embedding_model.choices = []

	if form.validate_on_submit():
		file = form.file.data
		name = form.name.data
		agent_id = form.agent_id.data
		embedding_model = form.embedding_model.data
		filename = secure_filename(file.filename)

		# Validate agent exists
		agent = Agent.query.filter_by(id=agent_id).first()
		if not agent:
			flash("Selected agent not found", "danger")
			return redirect(url_for('rag.rag'))

		# Read file content. Entire file content is saved to the DB
		try:
			content = file.read().decode('utf-8')
		except Exception as e:
			flash(f"Error reading file: {str(e)}", "danger")
			return redirect(url_for('rag.rag'))

		# Create knowledge base
		try:
			kb = KnowledgeBase(
				user_id=current_user.id,
				name=name,
				document_filename=filename,
				document_content=content,
				chunk_size=500,
				chunk_overlap=50,
				agent_id=agent_id,
				embedding_model=embedding_model
			)
			db.session.add(kb)
			db.session.commit()

			# Set as current knowledge base
			session["kb_id"] = kb.id

			flash(f"Knowledge base '{name}' created successfully!", "success")
			return redirect(url_for('rag.rag'))
		except Exception as e:
			db.session.rollback()
			flash(f"Error creating knowledge base: {str(e)}", "danger")
	else:
		for field, errors in form.errors.items():
			for error in errors:
				flash(f"{field}: {error}", "danger")

	return redirect(url_for('rag.rag'))


@bp.route('/rag/models/<int:agent_id>')
def models(agent_id):
	"""return a json of models given an agent ID"""
	models = Model.query.filter_by(agent_id=agent_id).all()
	return jsonify([m.model_name for m in models])


@bp.route('/rag/query', methods=["POST"])
@auth_required("token", "session")
def query():
	"""Process RAG query with streaming"""
	agent_id = request.form.get("agent_id")
	model_name = request.form.get("model_name")
	user_query = request.form.get("query")
	kb_id = session.get("kb_id")

	if not all([agent_id, model_name, user_query, kb_id]):
		return jsonify({"error": "Missing required fields"}), 400

	# Validate agent and model
	agent = Agent.query.filter_by(id=agent_id).first()
	if not agent:
		return jsonify({"error": f"Agent with id {agent_id} not found"}), 404

	model = Model.query.filter_by(agent_id=agent_id, model_name=model_name).first()
	if not model:
		return jsonify({"error": f"Model {model_name} not found"}), 404

	# Get knowledge base and knowledge base agent
	kb = KnowledgeBase.query.get(kb_id)
	if not kb or kb.user_id != current_user.id:
		return jsonify({"error": "Knowledge base not found"}), 404
	kn_agent = Agent.query.filter_by(id=kb.agent_id).first()
	if not kn_agent:
		return jsonify({"error": f"Knowledge base agent with id {agent_id} not found"}), 404

	# Initialize or retrieve RAG service
	service_key = (current_user.id, kb_id)
	try:
		if service_key not in rag_services:
			service = RAGService(kn_agent.url, kb.embedding_model)
			chunks = service.chunk_text(kb.document_content, kb.chunk_size, kb.chunk_overlap)
			if not chunks:
				return jsonify({"error": "Document is empty or could not be chunked"}), 400
			service.build_index(chunks)  # create a np array of embedings to represent chunks
			rag_services[service_key] = service
		else:
			service = rag_services[service_key]

		# Retrieve relevant chunks
		relevant_chunks = service.retrieve(user_query, k=3)  # get k nearest chunks
		augmented_prompt = service.augment_prompt(user_query, relevant_chunks)  # create a prompt to pass into the LLM
	except requests.exceptions.RequestException as e:
		return jsonify({"error": f"Failed to connect to Ollama agent: {str(e)}"}), 500
	except Exception as e:
		return jsonify({"error": f"RAG error: {str(e)}"}), 500

	# Call Ollama with augmented prompt
	ollama_url = f"{agent.url}/api/chat"
	payload = {
		"model": model_name,
		"messages": [{"role": "user", "content": augmented_prompt}],
		"stream": True
	}

	def generate():
		try:
			with requests.post(ollama_url, json=payload, stream=True, timeout=60) as r:
				if r.status_code != 200:
					# Capture the error response from Ollama
					error_text = r.text
					import json
					error_msg = f"Ollama returned {r.status_code}: {error_text}"
					error_response = json.dumps({"error": error_msg})
					yield error_response + "\n"
					return

				for line in r.iter_lines():
					if line:
						yield line.decode() + "\n"
		except Exception as e:
			# Send error as JSON so frontend can display it
			import json
			error_response = json.dumps({"error": str(e)})
			yield error_response + "\n"

	return Response(generate(), mimetype="text/event-stream")


@bp.route('/rag/delete/<int:kb_id>', methods=["POST"])
@auth_required("token", "session")
def delete(kb_id):
	"""Delete knowledge base"""
	kb = KnowledgeBase.query.get(kb_id)

	if not kb:
		flash("Knowledge base not found", "danger")
		return redirect(url_for('rag.rag'))

	if kb.user_id != current_user.id:
		flash("Unauthorized", "danger")
		return redirect(url_for('rag.rag'))

	try:
		# Clear from cache
		service_key = (current_user.id, kb_id)
		if service_key in rag_services:
			del rag_services[service_key]

		# Clear from session
		if session.get("kb_id") == kb_id:
			session.pop("kb_id")

		# Delete from database
		db.session.delete(kb)
		db.session.commit()

		flash(f"Knowledge base '{kb.name}' deleted successfully!", "success")
	except Exception as e:
		db.session.rollback()
		flash(f"Error deleting knowledge base: {str(e)}", "danger")

	return redirect(url_for('rag.rag'))
