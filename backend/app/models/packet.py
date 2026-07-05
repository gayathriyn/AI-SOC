from datetime import datetime

from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Packet(Base):
    __tablename__ = "packets"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    timestamp: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    source_ip: Mapped[str] = mapped_column(
        String(50)
    )

    destination_ip: Mapped[str] = mapped_column(
        String(50)
    )

    protocol: Mapped[str] = mapped_column(
        String(20)
    )

    packet_size: Mapped[int] = mapped_column(
        Integer
    )

    # Threat Analysis
    risk_score: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    threat_level: Mapped[str] = mapped_column(
        String(20),
        default="LOW"
    )

    reason: Mapped[str] = mapped_column(
        String(255),
        default="Normal Traffic"
    )

    # AI Prediction
    ai_prediction: Mapped[str] = mapped_column(
        String(50),
        default="Normal"
    )

    ai_confidence: Mapped[int] = mapped_column(
        Integer,
        default=0
    )