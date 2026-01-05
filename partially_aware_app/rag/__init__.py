from flask import Blueprint

bp = Blueprint('rag', __name__)

from partially_aware_app.rag import routes
from partially_aware_app.rag import forms
