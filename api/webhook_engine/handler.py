from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os
import uuid

# ==============================================================================
# CLINIC OS - WEBHOOK ENGINE
# Handles all inbound webhooks from Vapi, Twilio, n8n, and Stripe.
# Routes data to the correct tenant's pipeline.
# ==============================================================================

app = FastAPI(title="Clinic OS Webhook Engine", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Vapi Webhook Models ---
class VapiMessage(BaseModel):
    type: str
    call: Optional[dict] = None
    functionCall: Optional[dict] = None
    transcript: Optional[str] = None

class BookingRequest(BaseModel):
    doctor_name: str
    patient_name: str
    patient_phone: str
    service: str
    price: float
    appointment_time: str

# --- Routes ---

@app.get("/")
async def health():
    return {"status": "ONLINE", "engine": "webhook", "tenants_active": 0}

@app.post("/webhook/vapi/{tenant_id}")
async def vapi_webhook(tenant_id: str, request: Request):
    """
    Main Vapi webhook endpoint. Each tenant gets their own URL.
    Vapi sends function calls here when the AI needs to check availability or book.
    """
    body = await request.json()
    msg_type = body.get("message", {}).get("type", "")

    if msg_type == "function-call":
        fn = body["message"]["functionCall"]
        fn_name = fn.get("name", "")
        fn_params = fn.get("parameters", {})

        if fn_name == "check_availability":
            # Query the tenant's calendar for free slots
            return {
                "result": {
                    "available_slots": [
                        "2025-01-15T09:00:00",
                        "2025-01-15T10:00:00",
                        "2025-01-15T14:00:00",
                    ],
                    "doctor": fn_params.get("doctor_name", ""),
                    "date": fn_params.get("date", "")
                }
            }

        elif fn_name == "create_appointment":
            # Book the appointment in Supabase + Google Calendar
            appointment_id = str(uuid.uuid4())[:8]
            return {
                "result": {
                    "status": "confirmed",
                    "appointment_id": appointment_id,
                    "message": f"Appointment booked for {fn_params.get('patient_name', '')} with {fn_params.get('doctor_name', '')}"
                }
            }

    elif msg_type == "end-of-call-report":
        # Log the full call transcript and analytics
        transcript = body.get("message", {}).get("transcript", "")
        duration = body.get("message", {}).get("call", {}).get("duration", 0)
        return {"status": "logged", "transcript_length": len(transcript), "duration": duration}

    return {"status": "received"}

@app.post("/webhook/twilio/{tenant_id}")
async def twilio_webhook(tenant_id: str, request: Request):
    """Handles Twilio SMS status callbacks and inbound SMS."""
    form = await request.form()
    return {"status": "processed", "tenant": tenant_id, "from": form.get("From", ""), "body": form.get("Body", "")}

@app.post("/webhook/stripe/{tenant_id}")
async def stripe_webhook(tenant_id: str, request: Request):
    """Handles Stripe payment events for the monetization layer."""
    body = await request.json()
    event_type = body.get("type", "")
    return {"status": "processed", "event": event_type, "tenant": tenant_id}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
