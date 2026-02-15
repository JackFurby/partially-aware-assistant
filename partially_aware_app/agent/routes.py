import requests
from flask import Flask, request, Response, flash, jsonify, session
from flask import render_template, url_for, redirect, abort
from partially_aware_app.agent import bp
from partially_aware_app import db
from partially_aware_app.models import User
from partially_aware_app.agent.forms import ChatForm
from partially_aware_app.models import Agent, Model, Chat, Message
from flask_security import auth_required, hash_password, current_user, roles_required


@bp.route('/chat', methods=["GET", "POST"])
@auth_required("token", "session")
def chat():

	if request.method == "POST":
		chat_id = request.form.get("chat_id")
		chat = Chat.query.filter_by(id=chat_id).first()

		# make sure the chat to load belongs to the current user
		if chat.user_id != current_user.id:
			abort(403)
		else:
			session["chat_id"] = chat_id

		messages = Message.query.filter_by(chat_id=chat_id).all()

		agent_model = [chat.agent_id, chat.model_name]

		# add messages to session
		messages_sorted = sorted(messages, key=lambda m: m.create_datetime)
		session_key = "chat_history"
		session[session_key] = [{"role": m.role, "content": m.message} for m in messages_sorted]

	elif request.method == "GET":
		messages_sorted = []
		agent_model = [None, None]

	form = ChatForm()

	agents = Agent.query.all()
	form.agent_id.choices = [(a.id, a.name) for a in agents]

	# Models can onpy be selected after an agent. Start with an emply list.
	form.model_name.choices = []

	# Clear chat session for new chat
	if request.method == "GET":
		session.pop("chat_history", None)
		session.modified = True

	return render_template('agent/chat.html', title='Chat', form=form, messages=messages_sorted, agent_model=agent_model)


# return a json of models and model tags given an agent ID
@bp.route("/chat/models/<int:agent_id>")
def models(agent_id):
	models = Model.query.filter_by(agent_id=agent_id).all()
	return jsonify([{"model_name": m.model_name, "tags": [t.name for t in m.tags]} for m in models])


# route to send and recieve model messages
@bp.route('/chat/send_message', methods=["POST"])
@auth_required("token", "session")
def stream_pull():

	agent_id = request.form.get("agent_id")
	model_name = request.form.get("model_name")
	message = request.form.get("message")

	if not agent_id or not model_name or not message:
		return jsonify({"error": "Missing required fields"}), 400

	agent = Agent.query.filter_by(id=agent_id).first()
	if not agent:
		return jsonify({"error": f"Agent with id {agent_id} not found"}), 404

	model = Model.query.filter_by(agent_id=agent_id, model_name=model_name).first()
	if not model:
		return jsonify({"error": f"Model {model_name} not found"}), 404

	# Initialize session history
	session_key = "chat_history"  # A user will have a single chat history saved in their session
	if session_key not in session:
		session[session_key] = []

		# create DB entery to save chat
		try:
			chat = Chat(
				name="New chat",
				user_id=current_user.id,
			)
			db.session.add(chat)
			db.session.commit()

			session["chat_id"] = chat.id
		except Exception as e:
			db.session.rollback()
			flash(f"An error occurred: {str(e)}", "danger")

	# Append user message
	session[session_key].append({"role": "user", "content": message})
	session.modified = True

	# save message to chat history
	try:
		message = Message(
			chat_id=session["chat_id"],
			message=message,
			role="user",
		)
		db.session.add(message)
		db.session.commit()
	except Exception as e:
		db.session.rollback()
		flash(f"An error occurred 1: {str(e)}", "danger")

	# Update chat with agent and model details
	try:
		chat = Chat.query.get(session["chat_id"])
		chat.agent_id = agent.id
		chat.model_name = model.model_name

		db.session.commit()
	except Exception as e:
		db.session.rollback()
		flash(f"An error occurred 1: {str(e)}", "danger")

	ollama_url = f"{agent.url}/api/chat"
	payload = {
		"model": model_name,
		"messages": session[session_key],  # send full thread
		"stream": True
	}

	def generate():
		with requests.post(ollama_url, json=payload, stream=True) as r:
			for line in r.iter_lines():
				if line:
					yield line.decode() + "\n"

	return Response(generate(), mimetype="text/event-stream")


# save assistent message to session
@bp.route("/chat/save_message", methods=["POST"])
@auth_required("token", "session")
def save_message():
	agent_message = request.json.get("message")
	if not agent_message:
		return jsonify({"error": "No message provided"}), 400

	session_key = "chat_history"
	if session_key not in session:
		session[session_key] = []

	session[session_key].append({"role": "assistant", "content": agent_message})
	session.modified = True

	# save message to chat history
	try:
		message = Message(
			chat_id=session["chat_id"],
			message=agent_message,
			role="assistant",
		)
		db.session.add(message)
		db.session.commit()
	except Exception as e:
		db.session.rollback()
		flash(f"An error occurred 2: {str(e)}", "danger")

	return jsonify({"success": True})
