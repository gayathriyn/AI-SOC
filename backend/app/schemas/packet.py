from datetime import datetime

from pydantic import BaseModel


class PacketResponse(BaseModel):
    id: int
    timestamp: datetime
    source_ip: str
    destination_ip: str
    protocol: str
    packet_size: int

    # Rule-based Threat Analysis
    risk_score: int
    threat_level: str
    reason: str

    # AI Prediction
    ai_prediction: str
    ai_confidence: int

    class Config:
        from_attributes = True