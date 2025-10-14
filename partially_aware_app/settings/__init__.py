from flask import Blueprint

bp = Blueprint('settings', __name__)

from partially_aware_app.settings import routes
from partially_aware_app.settings import forms
