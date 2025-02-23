from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('refund_model.pkl')

@app.route('/', methods=['GET'])
def home():
    return "✅ Flask API is running!"

@app.route('/predict-refund', methods=['POST'])
def predict_refund():
    data = request.get_json()
    features = [[data['DelayDuration'], data['InternationalFlight']]]
    prediction = model.predict_proba(features)[0][1]  # Probability of refund
    return jsonify({'refund_probability': round(prediction * 100, 2)})

if __name__ == '__main__':
    app.run(port=5000)
