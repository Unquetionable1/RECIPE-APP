from flask import request, jsonify
from app import app, jwt
from models import db, User, Recipe, Comment, Favorite, Rating, Tag
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

# User registration endpoint
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# User login endpoint
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

# User logout endpoint
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # JWT tokens are stateless, so there is no actual logout. Frontend can handle token removal.
    return jsonify({"msg": "User logged out successfully"}), 200

# Protected endpoint example
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return jsonify(logged_in_as=current_user_id), 200

# Error handler for JWT unauthorized access
@jwt.unauthorized_loader
def unauthorized_callback(callback):
    return jsonify({"msg": "Missing Authorization Header"}), 401

# Error handler for JWT expired tokens
@jwt.expired_token_loader
def expired_token_callback(expired_token):
    return jsonify({"msg": "Token has expired"}), 401

# Error handler for JWT invalid tokens
@jwt.invalid_token_loader
def invalid_token_callback(error_string):
    return jsonify({"msg": "Invalid token"}), 401
