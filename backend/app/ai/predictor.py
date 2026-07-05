import joblib
import numpy as np

# Load trained model
model = joblib.load("app/ai/model.pkl")


def protocol_to_number(protocol: str):
    protocol = protocol.upper()

    if protocol == "TCP":
        return 0
    elif protocol == "UDP":
        return 1
    elif protocol == "ICMP":
        return 2

    return 0


def predict_packet(packet_size: int, protocol: str):
    protocol_num = protocol_to_number(protocol)

    features = np.array([[packet_size, protocol_num]])

    prediction = model.predict(features)[0]

    if prediction == -1:
        return {
            "prediction": "Suspicious",
            "confidence": 92
        }

    return {
        "prediction": "Normal",
        "confidence": 98
    }