from flask import Flask, jsonify, request
import os
from dotenv import load_dotenv

from datetime import datetime
import pymongo

app = Flask(__name__)


# Load environment variables
load_dotenv()

# MongoDB configuration
client = pymongo.MongoClient(os.getenv("MONGODB_URI"))
db = client['form_submissions']
collection = db['submissions']

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/submit', methods=['POST'])
def submit_form():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({'error': f'Missing or empty {field} field'}), 400
        
        # Insert into MongoDB
        result = collection.insert_one({
            'name': data['name'],
            'email': data['email'],
            'message': data['message'],
            'created_at': datetime.utcnow()
        })
        
        return jsonify({
            'message': 'Form submitted successfully',
            'id': str(result.inserted_id)
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/submissions', methods=['GET'])
def get_submissions():
    try:
        submissions = list(collection.find({}, {'_id': 0, 'created_at': 0}).sort('created_at', -1))
        return jsonify(submissions)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)