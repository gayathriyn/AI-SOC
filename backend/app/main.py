from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.users import router as user_router
from app.api.packets import router as packet_router
from app.api.threats import router as threat_router
from app.database.database import engine

app = FastAPI(
    title="AI-SOC",
    description="AI Powered Security Operations Center",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173",
    "https://ai-soc-zeta.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(user_router)
app.include_router(packet_router)
app.include_router(threat_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI-SOC 🚀",
        "status": "Backend Running Successfully"
    }


@app.get("/health")
def health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "database": "Connected ✅",
        "api": "Running ✅"
    }