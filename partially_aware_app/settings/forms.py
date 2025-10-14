from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_security import SQLAlchemyUserDatastore
from partially_aware_app import db
from partially_aware_app.models import Agent


class CreateAgentForm(FlaskForm):
	name = StringField('Name', validators=[DataRequired()])
	url = StringField('URL', validators=[DataRequired()])
	submit = SubmitField('Create Agent')

	def validate_name(self, field):
		if Agent.query.filter_by(name=field.data).first():
			raise ValidationError('An agent with this name already exists.')

	def validate_url(self, field):
		if Agent.query.filter_by(url=field.data).first():
			raise ValidationError('An agent with this url already exists.')


class AddModelForm(FlaskForm):
	name = StringField('Name', validators=[DataRequired()])
	submit = SubmitField('Add Model')
