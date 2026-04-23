from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json
import uuid
import sys

# Add core path to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "..", "core", "intelligence", "multi_agent_orchestrator"))
import architect

app = FastAPI(title="Clinic OS Monopoly Orchestrator", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Doctor(BaseModel):
    name: str
    specialty: str
    days: List[str]
    hours_start: str
    hours_end: str
    slot_duration: str
    calendar_email: Optional[str] = ""

class Service(BaseModel):
    name: str
    price: str
    duration: str

class IntakeData(BaseModel):
    clinic_name: str
    clinic_type: Optional[str] = "Dental"
    city: str
    address: str
    hours: dict
    doctors: List[Doctor]
    services: List[Service]
    tone: str
    voice_gender: str
    languages: List[str]
    can_book_same_day: str
    booking_advance: str
    confirm_sms: bool
    reminder_sms: bool
    patient_choose_doctor: str
    emergency_number: str

@app.get("/")
async def root():
    return {"status": "MONOPOLY_ONLINE", "orchestrator": "active"}

@app.post("/deploy")
async def deploy_clinic(data: IntakeData, background_tasks: BackgroundTasks):
    """
    Triggers the AI Architect to build the clinic infrastructure.
    """
    clinic_id = data.clinic_name.lower().replace(" ", "_").replace("'", "")
    
    # Create output directory for this deployment
    deployment_dir = f"deployments/{clinic_id}_{uuid.uuid4().hex[:6]}"
    os.makedirs(deployment_dir, exist_ok=True)
    
    # Save intake data for the architect
    intake_path = os.path.join(deployment_dir, "intake.json")
    with open(intake_path, "w", encoding="utf-8") as f:
        f.write(data.json())

    # We return immediately to the frontend so it can show the loading screen
    # The architect runs in the background
    background_tasks.add_task(run_architect, intake_path, deployment_dir)

    return {
        "status": "BUILDING",
        "clinic_id": clinic_id,
        "deployment_path": deployment_dir,
        "message": "AI Architect has started the construction process."
    }

def run_architect(intake_path: str, output_dir: str):
    try:
        with open(intake_path, "r", encoding="utf-8") as f:
            intake_json = json.load(f)
        
        # Call the strong AI Architect
        print(f"[SERVER] Starting AI Architect for {intake_json['clinic_name']}...")
        result = architect.build_with_ai(intake_json, output_dir)
        print(f"[SERVER] Architect completed: {result}")
        
    except Exception as e:
        print(f"[SERVER] ERROR in Architect: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005)
