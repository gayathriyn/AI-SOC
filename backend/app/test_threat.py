from app.services.threat_detector import analyze_packet

packet = {
    "source_ip": "192.168.1.8",
    "destination_ip": "20.184.175.10",
    "protocol": "TCP",
    "packet_size": 1466
}

result = analyze_packet(packet)

print(result)