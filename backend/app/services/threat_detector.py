def analyze_packet(packet_info):
    risk_score = 0
    threat_level = "LOW"
    reason = []

    # Large Packet
    if packet_info["packet_size"] > 1000:
        risk_score += 40
        reason.append("Large Packet")

    # TCP
    if packet_info["protocol"] == "TCP":
        risk_score += 20

    # Private Network
    if packet_info["source_ip"].startswith("192.168"):
        risk_score += 5

    # Threat Level
    if risk_score >= 70:
        threat_level = "HIGH"
    elif risk_score >= 40:
        threat_level = "MEDIUM"

    return {
        "risk_score": risk_score,
        "threat_level": threat_level,
        "reason": ", ".join(reason) if reason else "Normal Traffic"
    }