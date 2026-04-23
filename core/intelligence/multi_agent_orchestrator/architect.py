import json
import os
from groq import Groq

# ==============================================================================
# THE REAL AI ARCHITECT ENGINE
# Uses Groq (LLaMA 3 70B) to generate custom Vapi prompts, n8n workflows,
# and Supabase schemas from raw clinic intake data.
# ==============================================================================

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
MODEL = "llama-3.3-70b-versatile"

def build_with_ai(intake: dict, output_dir: str = "output"):
    """
    Takes structured intake JSON from the form.
    Sends it to Groq to generate ALL deployment artifacts.
    This is REAL AI, preserving the original strong architectural logic.
    """
    if not GROQ_API_KEY:
        print("[ERROR] Set GROQ_API_KEY environment variable first.")
        return None

    client = Groq(api_key=GROQ_API_KEY)
    os.makedirs(output_dir, exist_ok=True)
    clinic_id = intake.get("clinic_name", "clinic").lower().replace(" ", "_").replace("'", "")

    # =========================================================================
    # STEP 1: Generate Bespoke Vapi Prompt (Strict Data Mode)
    # =========================================================================
    print("[1/4] AI is generating bespoke Vapi system prompt (Strict Mode)...")

    vapi_request = f"""You are an elite AI Voice Architect.
    
    SYSTEM SPECIFICATION (VALIDATED):
    {json.dumps(intake, indent=2, ensure_ascii=False)}
    
    INSTRUCTIONS:
    1. STRICT DATA ADHERENCE: Only use the data provided in the specification. 
    2. HANDLING MISSING PRICES: If a service is listed with 'REQUEST_PRICE_LIVE', the AI must explicitly say it does not know the price and will check with the clinic staff. DO NOT MAKE UP PRICES.
    3. DOCTOR ROUTING: Only route to doctors listed. If a doctor has no schedule, state that their availability must be confirmed.
    4. VOICE DNA: Ensure the character matches the 'professional and efficient' requirement.
    
    Output ONLY the prompt text. No markdown."""

    completion = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": vapi_request}]
    )

    vapi_prompt = completion.choices[0].message.content.strip()

    with open(os.path.join(output_dir, "vapi_system_prompt.txt"), "w", encoding="utf-8") as f:
        f.write(vapi_prompt)
    print(f"   Generated: {len(vapi_prompt)} characters")

    # =========================================================================
    # STEP 2: Generate n8n Workflow JSON (REAL AI)
    # =========================================================================
    print("[2/4] AI is generating n8n automation workflow...")

    n8n_request = f"""You are an n8n workflow automation expert.

A clinic needs an automated booking system. Here are their requirements:

Clinic: {intake.get('clinic_name')}
Doctors: {json.dumps(intake.get('doctors', []), ensure_ascii=False)}
Services: {json.dumps(intake.get('services', []), ensure_ascii=False)}
SMS Confirmation: {intake.get('confirm_sms', True)}
SMS Reminder: {intake.get('reminder_sms', True)}

Generate a complete n8n workflow JSON that:
1. Has a webhook trigger node that receives booking data from Vapi
2. Extracts patient name, phone, doctor, service, time from the webhook payload
3. Routes to the correct doctor's Google Calendar based on doctor name
4. Creates a Google Calendar event with patient name and service
5. Logs the appointment to a Supabase database table called "appointments"
6. Sends an SMS confirmation via Twilio
7. Returns a success response

Output ONLY valid JSON. No markdown code blocks. No explanations. Just the raw JSON object with "name", "nodes", and "connections" keys."""

    completion = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": n8n_request}]
    )
    n8n_text = completion.choices[0].message.content.strip()
    
    # Clean markdown code fences if AI adds them
    if n8n_text.startswith("```"):
        n8n_text = n8n_text.split("\n", 1)[1]
    if n8n_text.endswith("```"):
        n8n_text = n8n_text.rsplit("```", 1)[0]
    n8n_text = n8n_text.strip()

    try:
        n8n_workflow = json.loads(n8n_text)
    except json.JSONDecodeError:
        n8n_workflow = {"name": f"{intake.get('clinic_name')} workflow", "raw": n8n_text, "parse_error": True}

    with open(os.path.join(output_dir, "n8n_workflow.json"), "w", encoding="utf-8") as f:
        json.dump(n8n_workflow, f, indent=2, ensure_ascii=False)
    print(f"   Generated: {len(n8n_workflow.get('nodes', []))} nodes")

    # =========================================================================
    # STEP 3: Generate Supabase SQL Schema (REAL AI)
    # =========================================================================
    print("[3/4] AI is generating Supabase database schema...")

    sql_request = f"""You are a PostgreSQL database architect for Supabase.

A multi-doctor clinic needs a database. Requirements:

Clinic: {intake.get('clinic_name')}
Clinic ID: {clinic_id}
Doctors: {json.dumps(intake.get('doctors', []), ensure_ascii=False)}
Services: {json.dumps(intake.get('services', []), ensure_ascii=False)}

Generate complete SQL that:
1. Creates tables: clinics, doctors, services, appointments, call_logs
2. Uses UUID primary keys with gen_random_uuid()
3. Has proper foreign key relationships
4. Enables Row Level Security on appointments (each doctor sees only their own data)
5. Inserts the actual clinic record with the data above
6. Inserts all doctor records with their real names, specialties, and schedules
7. Inserts all service records with real prices
8. Creates indexes for common queries (clinic_id, doctor_name, appointment_time)

Output ONLY raw SQL. No markdown. No explanations. Just SQL statements."""

    completion = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": sql_request}]
    )
    sql_text = completion.choices[0].message.content.strip()
    if sql_text.startswith("```"):
        sql_text = sql_text.split("\n", 1)[1]
    if sql_text.endswith("```"):
        sql_text = sql_text.rsplit("```", 1)[0]

    with open(os.path.join(output_dir, "supabase_schema.sql"), "w", encoding="utf-8") as f:
        f.write(sql_text.strip())
    print(f"   Generated: {sql_text.count(';')} SQL statements")

    # =========================================================================
    # STEP 4: Generate Dashboard Config (REAL AI)
    # =========================================================================
    print("[4/4] AI is generating dashboard configuration...")

    dashboard_request = f"""You are a SaaS dashboard architect.

Generate a JSON configuration for a clinic management dashboard.

Clinic: {intake.get('clinic_name')}
Clinic ID: {clinic_id}
Doctors: {json.dumps(intake.get('doctors', []), ensure_ascii=False)}

The config must include:
1. clinic_id and clinic_name
2. A "doctors" array with each doctor's name, specialty, and unique dashboard path
3. A "roles" object defining what "admin" sees (all data) vs what "doctor" sees (only their own)
4. A "widgets" array listing: revenue_today, appointments_today, calls_handled, avg_speed_to_book, no_show_rate, revenue_by_doctor
5. A "kpis" object with target values for each metric

Output ONLY valid JSON. No markdown. No explanations."""

    completion = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": dashboard_request}]
    )
    dash_text = completion.choices[0].message.content.strip()
    if dash_text.startswith("```"):
        dash_text = dash_text.split("\n", 1)[1]
    if dash_text.endswith("```"):
        dash_text = dash_text.rsplit("```", 1)[0]

    try:
        dashboard_config = json.loads(dash_text.strip())
    except json.JSONDecodeError:
        dashboard_config = {"clinic_id": clinic_id, "raw": dash_text, "parse_error": True}

    with open(os.path.join(output_dir, "dashboard_config.json"), "w", encoding="utf-8") as f:
        json.dump(dashboard_config, f, indent=2, ensure_ascii=False)

    print(f"\n[DONE] ALL artifacts generated by REAL AI (Groq) in '{output_dir}/'")
    print(f"       Clinic ID: {clinic_id}")
    return {
        "clinic_id": clinic_id,
        "vapi_prompt_length": len(vapi_prompt),
        "n8n_nodes": len(dashboard_config.get("doctors", [])),
        "sql_statements": sql_text.count(";"),
        "output_dir": output_dir
    }


if __name__ == "__main__":
    # Path to the spec generated by the CSV Processor
    spec_path = os.path.join("..", "..", "..", "validated_spec.json")
    
    if os.path.exists(spec_path):
        with open(spec_path, 'r', encoding='utf-8') as f:
            intake = json.load(f)
        result = build_with_ai(intake, "output")
        if result:
            print(json.dumps(result, indent=2))
    else:
        print(f"[ERROR] Validated spec not found at {spec_path}. Run csv_processor.py first.")

