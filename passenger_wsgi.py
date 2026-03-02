import sys
import os

# Add the current directory to the path
sys.path.insert(0, os.path.dirname(__file__))

# Import the Flask app as 'application' for Passenger
from main import app as application
