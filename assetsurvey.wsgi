"""
Web application startup script for the asset survey.
"""

import sys

# Quick fix to avoid installing the asset survey into the system path.
sys.path.insert(0, '/var/www/assetsurvey')

# Configure the application.
import survey
survey.response_path = '/var/www/assetsurvey/responses'

# Import and make the application available.
from survey import app as application

