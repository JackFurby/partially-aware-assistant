from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_security import Security, SQLAlchemySessionUserDatastore
from sassutils.wsgi import SassMiddleware
from flask_mail import Mail
from partially_aware_app.utils import seed as seed_db
from itertools import groupby
from datetime import date

db = SQLAlchemy()
migrate = Migrate()
mail = Mail()
security = Security()


import partially_aware_app.models
import partially_aware_app.forms


def create_app(config_class=Config):
	"""
	Construct Flash application without a global variable. This make it easier
	to run unit tests
	"""
	app = Flask(__name__)
	app.config.from_object(config_class)

	db.init_app(app)
	migrate.init_app(app, db)
	user_datastore = SQLAlchemySessionUserDatastore(db.session, partially_aware_app.models.User, partially_aware_app.models.Role)
	security = Security(
		app,
		user_datastore,
		login_form=partially_aware_app.forms.ExtendedLoginForm
	)
	mail.init_app(app)

	# Dashboard
	from partially_aware_app.dashboard import bp as dashboard_bp
	app.register_blueprint(dashboard_bp)

	# Error pages
	from partially_aware_app.errors import bp as errors_bp
	app.register_blueprint(errors_bp)

	# User pages
	from partially_aware_app.users import bp as users_bp
	app.register_blueprint(users_bp)

	# Setting pages
	from partially_aware_app.settings import bp as settings_bp
	app.register_blueprint(settings_bp)

	# AI agent pages
	from partially_aware_app.agent import bp as agent_bp
	app.register_blueprint(agent_bp)

	from flask_login import current_user
	from partially_aware_app.models import Chat

	# Load clat history with every page load
	@app.context_processor
	def inject_sidebar_chats():
		if not current_user.is_authenticated:
			return dict(chats_grouped=[])

		chats = (
			Chat.query
				.filter_by(user_id=current_user.id)
				.order_by(Chat.create_datetime.desc())
				.all()
		)

		# group by day
		def day(chat):
			return chat.create_datetime.date()

		grouped = []
		for day_value, items in groupby(chats, key=day):
			grouped.append({
				"date": day_value,
				"chats": list(items)
			})

		return dict(chats_grouped=grouped, ChatSelectForm=partially_aware_app.forms.ChatSelectForm)

	# Normal app startup
	if not app.debug and not app.testing:
		pass

	return app, user_datastore
