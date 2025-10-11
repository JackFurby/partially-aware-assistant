import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
	SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	MAIL_SUPPRESS_SEND = True

	SECRET_KEY = os.environ.get('PARTIALLY_AWARE_SECRET_KEY') or 'PARTIALLY_AWARE_TEST_KEY'
	SECURITY_PASSWORD_SALT = os.environ.get('PARTIALLY_AWARE_SECURITY_PASSWORD_SALT') or 'PARTIALLY_AWARE_TEST_SALT'
	SECURITY_REGISTERABLE = False  # disable account sign up by anyone without an account
	SECURITY_TRACKABLE = True
	SECURITY_CHANGEABLE = True
	SECURITY_CONFIRMABLE = True
	SECURITY_CHANGE_EMAIL = True
	SECURITY_MSG_INVALID_PASSWORD = ('Your username and password do not match our records', 'danger')
	SECURITY_MSG_USER_DOES_NOT_EXIST = ('Your username and password do not match our records', 'danger')
	SECURITY_MSG_PASSWORD_NOT_SET = ('Password not set', 'danger')
	SECURITY_MSG_CONFIRMATION_REQUIRED = ('Email has not been confirmed yet. Please check your emails.', 'info')
	SECURITY_MSG_DISABLED_ACCOUNT = ('This account has been disabled', 'danger')
	SECURITY_EMAIL_VALIDATOR_ARGS = {"check_deliverability": False}
	SECURITY_CHANGEABLE = True
	SECURITY_RECOVERABLE = True
	SECURITY_POST_LOGOUT_VIEW = "/login"
