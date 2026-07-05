from scapy.all import sniff

from app.packet_capture.parser import parse_packet
from app.services.threat_detector import analyze_packet
from app.ai.predictor import predict_packet
from app.database.database import SessionLocal
from app.models.packet import Packet


def process_packet(packet):
    packet_info = parse_packet(packet)

    # Rule-Based Threat Detection
    threat = analyze_packet(packet_info)

    # AI Prediction
    ai_result = predict_packet(
        packet_info["packet_size"],
        packet_info["protocol"]
    )

    print("=" * 70)
    print(f"Timestamp       : {packet_info['timestamp']}")
    print(f"Source IP       : {packet_info['source_ip']}")
    print(f"Destination IP  : {packet_info['destination_ip']}")
    print(f"Protocol        : {packet_info['protocol']}")
    print(f"Packet Size     : {packet_info['packet_size']} Bytes")

    print("\n------ Rule Engine ------")
    print(f"Risk Score      : {threat['risk_score']}")
    print(f"Threat Level    : {threat['threat_level']}")
    print(f"Reason          : {threat['reason']}")

    print("\n------ AI Engine ------")
    print(f"Prediction      : {ai_result['prediction']}")
    print(f"Confidence      : {ai_result['confidence']}%")

    db = SessionLocal()

    try:
        new_packet = Packet(
            timestamp=packet_info["timestamp"],
            source_ip=packet_info["source_ip"],
            destination_ip=packet_info["destination_ip"],
            protocol=packet_info["protocol"],
            packet_size=packet_info["packet_size"],

            # Rule Engine
            risk_score=threat["risk_score"],
            threat_level=threat["threat_level"],
            reason=threat["reason"],

            # AI Engine
            ai_prediction=ai_result["prediction"],
            ai_confidence=ai_result["confidence"]
        )

        db.add(new_packet)
        db.commit()

    except Exception as e:
        print("Database Error:", e)
        db.rollback()

    finally:
        db.close()


def start_capture(packet_count=10):
    print("\n🚀 Starting AI-SOC Packet Capture...\n")

    sniff(
        prn=process_packet,
        count=packet_count,
        store=False
    )


if __name__ == "__main__":
    start_capture()