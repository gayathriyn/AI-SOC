from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.packet import Packet

router = APIRouter(
    prefix="/threats",
    tags=["Threats"]
)


@router.get("/summary")
def threat_summary(db: Session = Depends(get_db)):
    total = db.query(Packet).count()

    low = db.query(Packet).filter(
        Packet.threat_level == "LOW"
    ).count()

    medium = db.query(Packet).filter(
        Packet.threat_level == "MEDIUM"
    ).count()

    high = db.query(Packet).filter(
        Packet.threat_level == "HIGH"
    ).count()

    return {
        "total_packets": total,
        "low_threats": low,
        "medium_threats": medium,
        "high_threats": high
    }
@router.get("/high")
def high_threats(db: Session = Depends(get_db)):
    return db.query(Packet).filter(
        Packet.threat_level == "HIGH"
    ).all()


@router.get("/medium")
def medium_threats(db: Session = Depends(get_db)):
    return db.query(Packet).filter(
        Packet.threat_level == "MEDIUM"
    ).all()


@router.get("/low")
def low_threats(db: Session = Depends(get_db)):
    return db.query(Packet).filter(
        Packet.threat_level == "LOW"
    ).all()