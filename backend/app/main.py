from fastapi import FastAPI
from sqlalchemy import text

from app.api.users import router as user_router
from app.database.database import engine

app = FastAPI(
    title="AI-SOC",
    description="AI Powered Security Operations Center",
    version="1.0.0"
)

# Register API Routers
app.include_router(user_router)


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