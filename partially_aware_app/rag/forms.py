from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField, SelectField, TextAreaField, SubmitField
from wtforms.validators import DataRequired


class UploadKnowledgeBaseForm(FlaskForm):
	name = StringField("Knowledge Base Name", validators=[DataRequired()])
	agent_id = SelectField("Agent", coerce=int, validators=[DataRequired()])
	embedding_model = SelectField("Embedding Model", validators=[DataRequired()])
	file = FileField(
		"Document ('txt', 'md', 'csv', or 'log' File)",
		validators=[
			FileRequired(),
			FileAllowed(['txt', 'md', 'csv', 'log'], 'Text files only!')
		]
	)
	submit = SubmitField('Upload')


class RAGQueryForm(FlaskForm):
	agent_id = SelectField("Agent", coerce=int, validators=[DataRequired()])
	model_name = SelectField("Model", validators=[DataRequired()])
	query = TextAreaField("Query", validators=[DataRequired()])
	submit = SubmitField('Ask')


class LoadKnowledgeBaseForm(FlaskForm):
	knowledge_base_id = SelectField("Knowledge Base", coerce=int, validators=[DataRequired()])
	submit = SubmitField('Select')
