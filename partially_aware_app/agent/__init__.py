from flask import Blueprint

bp = Blueprint('agent', __name__)

from partially_aware_app.agent import routes
from partially_aware_app.agent import forms
