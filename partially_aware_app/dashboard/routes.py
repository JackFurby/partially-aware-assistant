from flask import Flask, request, Response, flash
from flask import render_template, url_for, redirect
from partially_aware_app.dashboard import bp
from partially_aware_app import db
from partially_aware_app.models import User
from flask_security import auth_required, hash_password, current_user, roles_required


@bp.route('/')
@bp.route('/dashboard')
@auth_required("token", "session")
def dashboard():
	return render_template('dashboard/dashboard.html', title='Dashboard')
