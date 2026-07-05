import joblib
import numpy as np
from sklearn.ensemble import IsolationForest

# -------------------------------
# Sample Training Data
# [packet_size, protocol]
#
# protocol:
# TCP = 0
# UDP = 1
# ICMP = 2
# -------------------------------

X = np.array([
    [60, 0],
    [64, 0],
    [70, 0],
    [128, 0],
    [256, 0],
    [512, 0],
    [1500, 0],
    [80, 1],
    [100, 1],
    [120, 1],
    [90, 2],
    [110, 2],
])

# Train Isolation Forest
model = IsolationForest(
    contamination=0.10,
    random_state=42
)

model.fit(X)

# Save model
joblib.dump(model, "app/ai/model.pkl")

print("✅ AI Model trained successfully!")
print("✅ Model saved as app/ai/model.pkl")