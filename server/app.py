# Standard library imports
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from config import db

# Define the base directory
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Define the database URI
DATABASE_URI = os.getenv("DATABASE_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'app.db')}")

# Instantiate the Flask app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-key")  # Change this to a secure key

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)

# Example route
@app.route("/")
def index():
    return "<h1>Recipe Sharing Platform</h1>"

# Import routes after creating the app instance to avoid circular imports
import routes

if __name__ == "__main__":
    app.run(port=5000, debug=True)
