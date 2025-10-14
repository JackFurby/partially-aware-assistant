from flask import flash, request
from flask import render_template, url_for, redirect
from partially_aware_app.users import bp
from partially_aware_app.models import User, Role
from partially_aware_app import db
from flask_security import auth_required, current_user, roles_required, SQLAlchemyUserDatastore
from partially_aware_app.users.forms import CreateUserForm
from sqlalchemy.sql import func

user_datastore = SQLAlchemyUserDatastore(db, User, Role)


@bp.route('/user/<id>')
@auth_required("token", "session")
def user(id):
	user = User.query.filter_by(id=id).first_or_404()
	# If the user accessing the page has permission render user
	if user.id == current_user.id or (current_user.has_role('admin')):  # Only user owner and admin allowed
		# Get all roles according to the user
		roles = Role.query.all()
		hasRoles = []
		otherRoles = []
		for role in roles:
			if user.has_role(role.name):
				hasRoles.append(role)
			else:
				otherRoles.append(role)
		return render_template('users/user.html', user=user, has_roles=hasRoles, other_roles=otherRoles)
	# If the user does not have permission then redirect to dashboard
	flash('You do not have permission to do that', 'danger')
	return redirect(url_for('dashboard.dashboard'))


@bp.route('/users/')
@auth_required("token", "session")
@roles_required('admin')
def users():
	# If the user accessing the page has permission render users
	if current_user.has_role('admin'):  # Only user owner and admin allowed
		users = User.query.all()
		return render_template('users/users.html', users=users)
	# If the user does not have permission then redirect to dashboard
	flash('You do not have permission to do that', 'danger')
	return redirect(url_for('dashboard.dashboard'))


@bp.route('/user/<id>/toggle_role/<role_name>')
@auth_required("token", "session")
def toggle_user_role(id, role_name):
	user = User.query.filter_by(id=id).first_or_404()
	# If the user accessing the route has permission render user
	# A user has to be an admin, verified and a user cannot change their own permissions
	if (current_user.id != int(id)) and current_user.has_role('admin'):
		role = Role.query.filter_by(name=role_name).first()
		if user.has_role(role_name):
			user.roles.remove(role)
			db.session.commit()
		else:
			user.roles.append(role)
			db.session.commit()
		return redirect(url_for('users.user', id=user.id))
	# If the user does not have permission then reload user template
	flash('You do not have permission to do that', 'danger')
	#return redirect(url_for('users.user', id=user.id), code=403)
	return render_template('errors/403.html'), 403


@bp.route('/user/create_user', methods=['GET', 'POST'])
@auth_required("token", "session")
@roles_required('admin')
def create_user():
	form = CreateUserForm()

	# Populate available roles
	form.roles.choices = [(r.name, r.name) for r in Role.query.all()]

	if form.validate_on_submit():
		try:
			user = user_datastore.create_user(
				email=form.email.data,
				password=form.password.data,
				confirmed_at=func.now()
			)
			for role_name in form.roles.data:
				role = user_datastore.find_role(role_name)
				if role:
					user_datastore.add_role_to_user(user, role)
			db.session.commit()
			flash(f"User {form.email.data} created successfully!", "success")
			return redirect(url_for('users.create_user'))
		except Exception as e:
			db.session.rollback()
			flash(f"An error occurred: {str(e)}", "danger")

	return render_template('users/create_user.html', form=form)
