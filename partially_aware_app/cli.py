from flask_security import hash_password
from sqlalchemy.sql import func
from partially_aware_app import db

from datetime import datetime, timedelta, date, time
import json


def register(app, user_datastore):
	@app.cli.command("seed")
	def seed():
		"""
		Seed database with all roles and an admin user
		"""
		roleAdmin = user_datastore.create_role(
			name='admin',
			description='Manage other users on the system')
		roleStandard = user_datastore.create_role(
			name='standard',
			description='Manage the system')
		userAdmin = user_datastore.create_user(
			email='admin@admin.com',
			password=hash_password('password'),
			confirmed_at=func.now()
		)
		userAdmin.roles.append(roleAdmin)
		db.session.commit()

		print("Created seed user data")
