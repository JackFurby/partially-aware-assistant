import requests
from flask import flash, request
from flask import render_template, url_for, redirect, Response, stream_with_context
from partially_aware_app.models import UserSettings, Role, Agent, Model, SystemSettings, ModelTag
from partially_aware_app.settings import bp
from partially_aware_app.settings.utils import get_system_settings
from partially_aware_app.settings.forms import CreateAgentForm, AddModelForm, SystemRAGQueryForm, ModelTagForm
from partially_aware_app import db
from flask_security import auth_required, current_user, roles_required
from sqlalchemy.sql import func


@bp.route('/settings')
@auth_required("token", "session")
def settings():

	if UserSettings.query.filter_by(user_id=current_user.id).count() > 0:
		settings = UserSettings.query.filter_by(user_id=current_user.id).first()  # Get settings for current user
	else:  # if a user does not have a setting entery then make one
		try:
			settings = UserSettings(
				user_id=current_user.id
			)
			db.session.add(settings)
			db.session.commit()
		except Exception as e:
			db.session.rollback()
			flash(f"An error occurred: {str(e)}", "danger")

	agents = Agent.query.all()
	active_tab = 'profile'

	agent_form = CreateAgentForm()

	system_settings = get_system_settings()

	system_forms = {
		"SystemRAGQueryForm": SystemRAGQueryForm(data = {
			"query_template":system_settings.get("rag_prompt")
		})
	}

	return render_template('settings/settings.html', title='Settings', agents=agents, agent_form=agent_form, system_settings=system_settings, system_forms=system_forms, active_tab=active_tab)


@bp.route('/settings/create_agent', methods=['POST'])
@auth_required("token", "session")
@roles_required('admin')
def create_agent():
	agent_form = CreateAgentForm()
	agents = Agent.query.all()
	active_tab = 'agent'
	system_settings = get_system_settings()
	system_forms = {
		"SystemRAGQueryForm": SystemRAGQueryForm(data = {
			"query_template":system_settings.get("rag_prompt")
		})
	}

	if agent_form.validate_on_submit():
		try:
			agent = Agent(
				name=agent_form.name.data,
				url=agent_form.url.data,
				user_id=current_user.id,
			)
			db.session.add(agent)
			db.session.commit()
			flash(f"Agent {agent_form.name.data} created successfully!", "success")

			return redirect(url_for('settings.settings'))
		except Exception as e:
			db.session.rollback()
			flash(f"An error occurred: {str(e)}", "danger")

	# if validation fails or exception occurs, render template with errors
	return render_template('settings/settings.html', title='Settings', agents=agents, agent_form=agent_form, system_settings=system_settings, system_forms=system_forms, active_tab=active_tab)


@bp.route('/settings/system_settings', methods=['POST'])
@auth_required("token", "session")
@roles_required('admin')
def system_settings():
	agent_form = CreateAgentForm()
	agents = Agent.query.all()
	active_tab = 'system'
	system_settings = get_system_settings()
	system_forms = {
		"SystemRAGQueryForm": SystemRAGQueryForm(data = {
			"query_template":system_settings.get("rag_prompt")
		})
	}

	# system RAG query form submitted
	if system_forms["SystemRAGQueryForm"].validate_on_submit():
		try:
			# set all rag_prompt settings to False
			SystemSettings.query.filter(
				SystemSettings.setting_name == "rag_prompt",
				SystemSettings.active.is_(True)
			).update({"active": False}, synchronize_session=False)

			rag_prompt = SystemSettings(
				user_id=current_user.id,
				setting_name="rag_prompt",
				setting_value=system_forms["SystemRAGQueryForm"].query_template.data,
				active=True
			)

			db.session.add(rag_prompt)
			db.session.commit()
			flash(f"System RAG prompt updated successfully!", "success")

			return redirect(url_for('settings.settings'))

		except Exception as e:
			db.session.rollback()
			flash(f"An error occurred: {str(e)}", "danger")

	# Get the latest system settings
	system_settings = get_system_settings()
	system_forms = {
		"SystemRAGQueryForm": SystemRAGQueryForm(data = {
			"query_template":system_settings.get("rag_prompt")
		})
	}

	# if validation fails or exception occurs, render template with errors
	return render_template('settings/settings.html', title='Settings', agents=agents, agent_form=agent_form, system_settings=system_settings, system_forms=system_forms, active_tab=active_tab)


@bp.route('/settings/edit_agent/<id>', methods=['GET', 'POST'])
@auth_required("token", "session")
@roles_required('admin')
def edit_agent(id):
	model_form = AddModelForm()
	tag_form = ModelTagForm()

	# Check to make sure an agent exists with the requested id
	if Agent.query.filter_by(id=id).count() == 0:
		flash(f"Agent with id {id} not found", "danger")
		return redirect(url_for('settings.settings'))
	else:
		if model_form.validate_on_submit():
			try:
				model = Model(
					model_name=model_form.name.data,
					agent_id=id,
				)
				db.session.add(model)
				db.session.commit()
				flash(f"Model {model_form.name.data} created successfully!", "success")
				return redirect(url_for('settings.edit_agent', id=id))
			except Exception as e:
				db.session.rollback()
				flash(f"An error occurred: {str(e)}", "danger")

		models = Model.query.filter_by(agent_id=id).all()

	return render_template('settings/edit_agent.html', model_form=model_form, tag_form=tag_form, models=models)


@bp.route('/settings/add_model_tag/<id>', methods=['GET', 'POST'])
@auth_required("token", "session")
@roles_required('admin')
def add_model_tag(id):
	model_form = AddModelForm()
	tag_form = ModelTagForm()

	print(1)

	# Check to make sure an agent exists with the requested id
	if Agent.query.filter_by(id=id).count() == 0:
		flash(f"Agent with id {id} not found", "danger")
		return redirect(url_for('settings.settings'))
	else:
		print(2)
		print(tag_form)
		if tag_form.validate_on_submit():
			print(3)
			try:
				model = Model.query.get(
					(id, tag_form.model_name.data)
				)
				if model:
					for tag_name in tag_form.tags.data:
						if not any(t.name == tag_name for t in model.tags):
							model.tags.append(ModelTag(name=tag_name))
					db.session.commit()
				return redirect(url_for('settings.edit_agent', id=id))

			except Exception as e:
				db.session.rollback()
				flash(f"An error occurred: {str(e)}", "danger")
		else:
			print(tag_form.errors)

		models = Model.query.filter_by(agent_id=id).all()

	return render_template('settings/edit_agent.html', model_form=model_form, tag_form=tag_form, models=models)


# download model and stream the download progress
@bp.route('/settings/stream_pull/<agent_id>/<model_name>')
@auth_required("token", "session")
@roles_required('admin')
def stream_pull(agent_id, model_name):
	def generate():
		# Check to make sure an agent exists with the requested id
		if Model.query.filter_by(model_name=model_name).count() == 0:
			flash(f"Model with id {id} not found", "danger")
			return redirect(url_for('settings.settings'))
		else:
			model = Model.query.filter_by(model_name=model_name).first()
			agent = Agent.query.filter_by(id=model.agent_id).first()
			with requests.post(f"{agent.url}/api/pull", json={"model": model_name}, stream=True) as r:
				r.raise_for_status()
				for line in r.iter_lines(decode_unicode=True):
					if not line:
						continue
					yield f"data: {line}\n\n"

	return Response(stream_with_context(generate()), mimetype="text/event-stream")
