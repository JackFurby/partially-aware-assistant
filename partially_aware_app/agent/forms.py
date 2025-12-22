from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired


class ChatForm(FlaskForm):
	agent_id = SelectField("Agent", coerce=int, validators=[DataRequired()])
	model_name = SelectField("Model", validators=[DataRequired()])
	message = TextAreaField("Message", validators=[DataRequired()])
	submit = SubmitField('Send')
