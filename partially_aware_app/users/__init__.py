from flask import Blueprint

bp = Blueprint('users', __name__)

from partially_aware_app.users import routes
from partially_aware_app.users import forms
