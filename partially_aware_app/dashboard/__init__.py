from flask import Blueprint

bp = Blueprint('dashboard', __name__)

from partially_aware_app.dashboard import routes
from partially_aware_app.dashboard import forms
