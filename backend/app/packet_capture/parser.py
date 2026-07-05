from scapy.layers.inet import IP, TCP, UDP
from scapy.layers.inet6 import IPv6
from datetime import datetime


def parse_packet(packet):
    data = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "source_ip": None,
        "destination_ip": None,
        "protocol": "Unknown",
        "packet_size": len(packet)
    }

    if packet.haslayer(IP):
        data["source_ip"] = packet[IP].src
        data["destination_ip"] = packet[IP].dst

    elif packet.haslayer(IPv6):
        data["source_ip"] = packet[IPv6].src
        data["destination_ip"] = packet[IPv6].dst

    if packet.haslayer(TCP):
        data["protocol"] = "TCP"

    elif packet.haslayer(UDP):
        data["protocol"] = "UDP"

    return data