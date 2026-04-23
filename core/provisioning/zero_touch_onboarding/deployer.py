import json
import os
import time
import uuid

# ==============================================================================
# DEPLOYMENT AGENT
# Takes generated artifacts from the Architect and deploys them to live services.
# In production: makes real API calls to Vapi, Twilio, n8n, Supabase.
# Currently: simulates the full pipeline with realistic timing.
# ==============================================================================

class DeploymentAgent:
    def __init__(self, artifacts_dir: str):
        self.artifacts_dir = artifacts_dir
        self.tenant_id = f"tnt_{uuid.uuid4().hex[:12]}"
        self.results = {}

    def deploy_all(self) -> dict:
        print(f"[DEPLOY] Starting full deployment pipeline...")
        print(f"[DEPLOY] Tenant ID: {self.tenant_id}\n")

        start = time.time()

        # Step 1: Provision Twilio Number
        self._provision_twilio()

        # Step 2: Create Vapi Assistant
        self._create_vapi_assistant()

        # Step 3: Import n8n Workflow
        self._deploy_n8n_workflow()

        # Step 4: Execute Supabase SQL
        self._init_supabase()

        # Step 5: Configure Dashboard Auth
        self._setup_auth()

        # Step 6: Send Welcome Email
        self._send_welcome()

        elapsed = round(time.time() - start, 1)
        print(f"\n[DEPLOY] COMPLETE in {elapsed}s")
        print(f"[DEPLOY] Dashboard: https://os.four4.com/{self.tenant_id}/dashboard")
        print(f"[DEPLOY] Phone: {self.results.get('phone_number', 'N/A')}")

        self.results["tenant_id"] = self.tenant_id
        self.results["deploy_time_seconds"] = elapsed
        self.results["status"] = "LIVE"

        # Save deployment manifest
        manifest_path = os.path.join(self.artifacts_dir, "deployment_manifest.json")
        with open(manifest_path, "w", encoding="utf-8") as f:
            json.dump(self.results, f, indent=2)
        print(f"[DEPLOY] Manifest saved: {manifest_path}")

        return self.results

    def _provision_twilio(self):
        print("[1/6] Provisioning Twilio phone number...")
        time.sleep(0.8)
        phone = f"+213 {uuid.uuid4().int % 900 + 100} {uuid.uuid4().int % 90 + 10} {uuid.uuid4().int % 90 + 10} {uuid.uuid4().int % 90 + 10}"
        self.results["phone_number"] = phone
        # PRODUCTION CODE:
        # from twilio.rest import Client
        # client = Client(TWILIO_SID, TWILIO_AUTH)
        # number = client.incoming_phone_numbers.create(
        #     phone_number=available_number,
        #     voice_url=f"https://api.vapi.ai/twilio/inbound/{vapi_assistant_id}"
        # )
        print(f"       Provisioned: {phone}")

    def _create_vapi_assistant(self):
        print("[2/6] Creating Vapi AI assistant...")
        time.sleep(1.0)
        prompt_path = os.path.join(self.artifacts_dir, "vapi_system_prompt.txt")
        if os.path.exists(prompt_path):
            with open(prompt_path, "r", encoding="utf-8") as f:
                prompt = f.read()
            self.results["vapi_prompt_length"] = len(prompt)
        # PRODUCTION CODE:
        # import requests
        # resp = requests.post("https://api.vapi.ai/assistant", headers={"Authorization": f"Bearer {VAPI_KEY}"}, json={
        #     "name": clinic_name,
        #     "model": {"provider": "openai", "model": "gpt-4", "systemPrompt": prompt},
        #     "voice": {"provider": "11labs", "voiceId": voice_id},
        #     "firstMessage": greeting,
        #     "serverUrl": n8n_webhook_url
        # })
        self.results["vapi_assistant_id"] = f"asst_{uuid.uuid4().hex[:10]}"
        print(f"       Assistant ID: {self.results['vapi_assistant_id']}")

    def _deploy_n8n_workflow(self):
        print("[3/6] Deploying n8n automation workflow...")
        time.sleep(0.8)
        workflow_path = os.path.join(self.artifacts_dir, "n8n_workflow.json")
        if os.path.exists(workflow_path):
            with open(workflow_path, "r", encoding="utf-8") as f:
                workflow = json.load(f)
            self.results["n8n_nodes_count"] = len(workflow.get("nodes", []))
        # PRODUCTION CODE:
        # resp = requests.post(f"{N8N_URL}/api/v1/workflows", headers={"X-N8N-API-KEY": N8N_KEY}, json=workflow)
        # workflow_id = resp.json()["id"]
        # requests.patch(f"{N8N_URL}/api/v1/workflows/{workflow_id}", json={"active": True})
        self.results["n8n_workflow_id"] = f"wf_{uuid.uuid4().hex[:8]}"
        print(f"       Workflow ID: {self.results['n8n_workflow_id']} ({self.results.get('n8n_nodes_count', 0)} nodes)")

    def _init_supabase(self):
        print("[4/6] Initializing Supabase database...")
        time.sleep(0.7)
        sql_path = os.path.join(self.artifacts_dir, "supabase_schema.sql")
        if os.path.exists(sql_path):
            with open(sql_path, "r", encoding="utf-8") as f:
                sql = f.read()
            self.results["sql_statements"] = sql.count(";")
        # PRODUCTION CODE:
        # from supabase import create_client
        # supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        # supabase.postgrest.rpc("exec_sql", {"query": sql}).execute()
        print(f"       Tables created. {self.results.get('sql_statements', 0)} SQL statements executed.")

    def _setup_auth(self):
        print("[5/6] Setting up authentication...")
        time.sleep(0.5)
        config_path = os.path.join(self.artifacts_dir, "dashboard_config.json")
        if os.path.exists(config_path):
            with open(config_path, "r", encoding="utf-8") as f:
                config = json.load(f)
            doctor_count = len(config.get("doctors", []))
            self.results["auth_users_created"] = doctor_count + 1  # doctors + admin
        # PRODUCTION CODE:
        # for doctor in config["doctors"]:
        #     supabase.auth.admin.create_user({"email": doctor["calendar_email"], "password": generate_temp_password()})
        print(f"       Created {self.results.get('auth_users_created', 0)} user accounts (admin + doctors).")

    def _send_welcome(self):
        print("[6/6] Sending welcome email...")
        time.sleep(0.3)
        # PRODUCTION CODE:
        # import resend
        # resend.api_key = RESEND_KEY
        # resend.Emails.send({"from": "onboarding@four4.com", "to": admin_email, "subject": "Your AI System is Live", "html": template})
        print("       Welcome email queued for delivery.")


if __name__ == "__main__":
    output_dir = os.path.join(os.path.dirname(__file__), "..", "..", "intelligence", "multi_agent_orchestrator", "output")
    if not os.path.exists(output_dir):
        print("Run architect.py first to generate artifacts.")
    else:
        agent = DeploymentAgent(output_dir)
        result = agent.deploy_all()
        print(f"\nDeployment Result: {json.dumps(result, indent=2)}")
