from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SelectMultipleField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_security import SQLAlchemyUserDatastore
from partially_aware_app import db
from partially_aware_app.models import User, Role


user_datastore = SQLAlchemyUserDatastore(db, User, Role)


class CreateUserForm(FlaskForm):
	email = StringField('Email', validators=[DataRequired(), Email()])
	password = PasswordField('Password', validators=[DataRequired()])
	roles = SelectMultipleField('Roles', choices=[], coerce=str)
	submit = SubmitField('Create User')

	def validate_email(self, field):
		if user_datastore.find_user(email=field.data):
			raise ValidationError('A user with this email already exists.')
