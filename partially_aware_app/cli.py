from flask_security import hash_password
from sqlalchemy.sql import func
from partially_aware_app import db
from partially_aware_app.models import Role, SystemSettings

from datetime import datetime, timedelta, date, time
import json


def register(app, user_datastore):
	@app.cli.command("seed")
	def seed():
		"""
		Seed database with all roles and an admin user
		"""
		roleAdmin = Role.query.filter_by(name='admin').first()
		if not roleAdmin:
			roleAdmin = user_datastore.create_role(
				name='admin',
				description='Manage other users on the system'
			)
		roleStandard = Role.query.filter_by(name='standard').first()
		if not roleStandard:
			roleStandard = user_datastore.find_or_create_role(
				name='standard',
				description='Manage the system'
			)
		db.session.commit()

		userAdmin = user_datastore.find_user(email='admin@admin.com')
		if not userAdmin:
			userAdmin = user_datastore.create_user(
				email='admin@admin.com',
				password=hash_password('password'),
				confirmed_at=func.now()
			)
			userAdmin.roles.append(roleAdmin)

		db.session.commit()

		# default system settings
		setting_name = 'rag_prompt'
		setting_value = """You are a helpful assistant. Use the following context to answer the user's question. If the context doesn't contain relevant information, say so.

[context]

User Question: [query]

Answer:"""

		rag_setting = SystemSettings.query.filter_by(
			user_id=userAdmin.id,
			setting_name=setting_name,
			active=True
		).first()

		if not rag_setting:
			db.session.add(
				SystemSettings(
					user_id=userAdmin.id,
					setting_name=setting_name,
					setting_value=setting_value,
					active=True
				)
			)

		db.session.commit()

		print("Created seed data")
