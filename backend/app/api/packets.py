from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.packet import Packet
from app.schemas.packet import PacketResponse

router = APIRouter(
    prefix="/packets",
    tags=["Packets"]
)


@router.get("/", response_model=list[PacketResponse])
def get_packets(db: Session = Depends(get_db)):
    packets = db.query(Packet).order_by(Packet.id.desc()).all()
    return packets


@router.get("/top-source")
def top_source_ips(db: Session = Depends(get_db)):
    packets = db.query(Packet).all()

    counter = Counter(packet.source_ip for packet in packets)

    return [
        {
            "ip": ip,
            "count": count
        }
        for ip, count in counter.most_common(5)
    ]


@router.get("/top-destination")
def top_destination_ips(db: Session = Depends(get_db)):
    packets = db.query(Packet).all()

    counter = Counter(packet.destination_ip for packet in packets)

    return [
        {
            "ip": ip,
            "count": count
        }
        for ip, count in counter.most_common(5)
    ]