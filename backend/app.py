from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Allow React frontend requests
app.secret_key = "supersecretkey"     # Change in production

@app.route("/")
def home():
    return jsonify({"msg": "Backend is running"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
