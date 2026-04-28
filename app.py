from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

# -------------------------------
# Initialize App
# -------------------------------
app = FastAPI()

# -------------------------------
# Enable CORS (VERY IMPORTANT)
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend (React)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Load Disease Database
# -------------------------------
DATA_PATH = os.path.join("data", "disease_database.json")

with open(DATA_PATH, "r", encoding="utf-8") as f:
    disease_db = json.load(f)

# -------------------------------
# Request Model
# -------------------------------
class ChatRequest(BaseModel):
    message: str

# -------------------------------
# Helper Functions
# -------------------------------
def preprocess(text):
    return text.lower().split()

def calculate_score(user_words, disease_keywords):
    matches = len(set(user_words) & set(disease_keywords))
    return matches / len(disease_keywords) if disease_keywords else 0

# -------------------------------
# Routes
# -------------------------------

# Health Check
@app.get("/")
def home():
    return {"message": "Backend is running"}

# Chat Endpoint
@app.post("/chat")
def chat(req: ChatRequest):
    user_input = req.message
    user_words = preprocess(user_input)

    best_match = None
    best_score = 0

    for disease in disease_db:
        keywords = disease.get("symptoms", [])
        score = calculate_score(user_words, keywords)

        if score > best_score:
            best_score = score
            best_match = disease

    # If no match found
    if not best_match:
        return {
            "disease": "Unknown",
            "confidence": 0.0,
            "advice": "Please consult a medical professional."
        }

    return {
        "disease": best_match["name"],
        "confidence": round(best_score, 2),
        "advice": best_match.get("advice", "No advice available.")
    }