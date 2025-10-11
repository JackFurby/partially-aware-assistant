from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_security import Security, SQLAlchemySessionUserDatastore
from sassutils.wsgi import SassMiddleware
from flask_mail import Mail
from partially_aware_app.utils import seed as seed_db

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

	# Error pages and functions
	from partially_aware_app.errors import bp as errors_bp
	app.register_blueprint(errors_bp)

	# User pages
	from partially_aware_app.users import bp as users_bp
	app.register_blueprint(users_bp)

	# Normal app startup
	if not app.debug and not app.testing:
		pass

	return app, user_datastore
