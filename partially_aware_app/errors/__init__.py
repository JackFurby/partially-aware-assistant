from flask import Blueprint

bp = Blueprint('errors', __name__)

from partially_aware_app.errors import routes
