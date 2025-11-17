import requests
from flask import flash, request
from flask import render_template, url_for, redirect, Response, stream_with_context
from partially_aware_app.models import UserSettings, Role, Agent, Model
from partially_aware_app.settings import bp
from partially_aware_app.settings.forms import CreateAgentForm, AddModelForm
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

	return render_template('settings/settings.html', title='Settings', agents=agents)


@bp.route('/settings/create_agent', methods=['GET', 'POST'])
@auth_required("token", "session")
@roles_required('admin')
def create_agent():
	form = CreateAgentForm()

	if form.validate_on_submit():
		try:
			agent = Agent(
				name=form.name.data,
				url=form.url.data,
				user_id=current_user.id,
			)
			db.session.add(agent)
			db.session.commit()
			flash(f"Agent {form.name.data} created successfully!", "success")
			return redirect(url_for('settings.settings'))
		except Exception as e:
			db.session.rollback()
			flash(f"An error occurred: {str(e)}", "danger")

	return render_template('settings/create_agent.html', form=form)

@bp.route('/settings/edit_agent/<id>', methods=['GET', 'POST'])
@auth_required("token", "session")
@roles_required('admin')
def edit_agent(id):
	form = AddModelForm()

	# Check to make sure an agent exists with the requested id
	if Agent.query.filter_by(id=id).count() == 0:
		flash(f"Agent with id {id} not found", "danger")
		return redirect(url_for('settings.settings'))
	else:
		if form.validate_on_submit():
			try:
				model = Model(
					model_name=form.name.data,
					agent_id=id,
				)
				db.session.add(model)
				db.session.commit()
				flash(f"Model {form.name.data} created successfully!", "success")
				return redirect(url_for('settings.edit_agent', id=id))
			except Exception as e:
				db.session.rollback()
				flash(f"An error occurred: {str(e)}", "danger")

		models = Model.query.filter_by(agent_id=id).all()

	return render_template('settings/edit_agent.html', form=form, models=models)


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
