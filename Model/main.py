from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and allow all origins

@app.route('/smth/', methods=['POST'])
def handle_input():
    data = request.json
    input_message = data.get('input_message', [])
    # print(input_message[1])  # Log the input_message for debugging
    print(input_message)  # Log the input_message for debugging

    
    if not input_message:
        return jsonify({"error": "Invalid input"}), 402
    
    return jsonify({"input_message": input_message}), 200


if __name__ == '__main__':
    app.run(port=5000, debug=True)  # Enable debug mode for easier troubleshooting
