import os
import json
from enum import Enum
from typing import Dict, Any

# ==============================================================================
# MULTI-AGENT ORCHESTRATOR 
# Core Intelligence Layer - Coordinates multiple LLMs for optimal cost/latency
# ==============================================================================

class ModelType(Enum):
    CLAUDE_3_OPUS = "claude-3-opus"          # For complex medical triage
    GPT_4O = "gpt-4o"                        # For standard conversation / reasoning
    GEMINI_1_5_FLASH = "gemini-1.5-flash"    # For ultra-low latency routing/parsing

class Orchestrator:
    def __init__(self):
        self.memory_graph_connected = True
        self.voice_latency_budget_ms = 400

    def route_request(self, patient_transcript: str, triage_flags: list) -> Dict[str, Any]:
        """
        Dynamically routes the patient request to the cheapest/fastest model 
        that can safely handle it.
        """
        print(f"[ORCHESTRATOR] Analyzing transcript depth...")
        
        # 1. Triage Detection -> Requires Highest Intelligence (Claude 3 Opus)
        if "chest pain" in patient_transcript.lower() or "emergency" in patient_transcript.lower() or len(triage_flags) > 0:
            print("[ORCHESTRATOR] High Risk Detected. Routing to CLAUDE_3_OPUS for Medical Safety.")
            return self._execute_model(ModelType.CLAUDE_3_OPUS, patient_transcript, priority="CRITICAL")

        # 2. Complex Scheduling / Multi-turn -> GPT-4o
        if "reschedule" in patient_transcript.lower() or "insurance" in patient_transcript.lower():
            print("[ORCHESTRATOR] Complex Workflow Detected. Routing to GPT_4O.")
            return self._execute_model(ModelType.GPT_4O, patient_transcript, priority="HIGH")

        # 3. Simple Booking / FAQ -> Ultra-Fast Gemini Flash
        print("[ORCHESTRATOR] Standard Request. Routing to GEMINI_1_5_FLASH for ultra-low latency.")
        return self._execute_model(ModelType.GEMINI_1_5_FLASH, patient_transcript, priority="NORMAL")

    def _execute_model(self, model: ModelType, payload: str, priority: str) -> Dict[str, Any]:
        # Simulated execution
        return {
            "model_used": model.value,
            "latency_ms": 120 if model == ModelType.GEMINI_1_5_FLASH else 650,
            "decision": "Proceed to Booking Phase",
            "priority": priority
        }

if __name__ == "__main__":
    brain = Orchestrator()
    response = brain.route_request("I need to book a checkup for tomorrow.", [])
    print(json.dumps(response, indent=2))
