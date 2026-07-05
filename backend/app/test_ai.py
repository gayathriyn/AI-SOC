from app.ai.predictor import predict_packet

print(predict_packet(80, "TCP"))
print(predict_packet(2500, "TCP"))
print(predict_packet(100, "UDP"))
print(predict_packet(5000, "TCP"))