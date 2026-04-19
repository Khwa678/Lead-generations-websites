from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # allow requests from React

# Load model + columns
model = joblib.load("model (1).pkl")
columns = joblib.load("columns.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # create correct input shape
    df = pd.DataFrame([[0] * len(columns)], columns=columns)

    # fill values
    df["age"] = int(data.get("age", 30))
    df["balance"] = int(data.get("balance", 1000))
    df["campaign"] = 1
    df["pdays"] = -1
    df["previous"] = 0

    job_col = f"job_{data.get('job','admin.')}"
    if job_col in df.columns:
        df[job_col] = 1

    housing_col = f"housing_yes"
    if housing_col in df.columns:
        df[housing_col] = 1

    # predict
    prob = model.predict_proba(df)[0][1]
    score = round(prob * 100, 2)

    return jsonify({
        "score": score,
        "status": "Hot" if score > 70 else "Warm" if score > 40 else "Cold"
    })


if __name__ == "__main__":
    app.run(port=5001)