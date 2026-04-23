import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function deployToVapi(prompt: string, clinicName: string, voiceId: string = "jennifer-soft") {
  // This is where we call the real Vapi API
  // Documentation: https://docs.vapi.ai/api-reference/assistants/create
  const VAPI_KEY = process.env.VAPI_API_KEY;
  if (!VAPI_KEY) return { id: "mock-vapi-id", message: "VAPI_KEY not set, simulated deployment." };

  try {
    const response = await fetch("https://api.vapi.ai/assistant", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${VAPI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: `${clinicName} Receptionist`,
        model: {
          provider: "openai",
          model: "gpt-4o",
          messages: [{ role: "system", content: prompt }]
        },
        voice: {
          provider: "eleven_labs",
          voiceId: voiceId
        }
      })
    });
    return await response.json();
  } catch (e) {
    console.error("Vapi Deployment Failed", e);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const intake = await req.json();
    const clinicId = intake.clinic_name.toLowerCase().replace(/\s+/g, "_").replace(/'/g, "");

    console.log(`[ORCHESTRATOR] Starting AI Architect for ${intake.clinic_name}...`);

    // 1. Generate Bespoke Vapi Prompt
    const vapiResponse = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are an elite AI Voice Architect. You do not build standard systems; you build bespoke, high-authority medical receptionists that sound indistinguishable from a top-tier human secretary." },
        { 
          role: "user", 
          content: `
          ARCHITECT COMMAND:
          Generate a production-ready Vapi System Prompt for: ${intake.clinic_name}.
          
          BESPOKE LOGIC TO INTEGRATE:
          ${intake.custom_logic}
          
          VOICE DNA (TRAINING):
          ${intake.voice_dna}
          
          CLIENT DATA:
          ${JSON.stringify(intake)}
          
          INSTRUCTIONS:
          1. Use the Voice DNA to define the exact tone, accent, and verbal mannerisms in the prompt.
          2. Incorporate the Bespoke Logic as absolute business rules. If it involves complex routing or specific SMS triggers, define them clearly.
          3. Ensure the AI knows every doctor and service with DA pricing.
          4. Output ONLY the prompt text.
          ` 
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    // 2. Generate Bespoke n8n Workflow
    const n8nResponse = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a master n8n engineer. You translate complex business requirements into elegant, error-proof automation workflows." },
        { 
          role: "user", 
          content: `
          WORKFLOW DESIGN:
          Generate a complete n8n JSON workflow for: ${intake.clinic_name}.
          
          CUSTOM LOGIC TO IMPLEMENT:
          ${intake.custom_logic}
          
          CORE REQUIREMENTS:
          - Vapi Webhook -> Triage Node -> Doctor Router -> G-Cal -> Supabase -> Twilio SMS.
          - Output ONLY valid JSON.
          ` 
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    // 3. Generate SQL Schema
    const sqlResponse = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a PostgreSQL expert." },
        { 
          role: "user", 
          content: `Generate SQL schema for clinic: ${intake.clinic_name}, ID: ${clinicId}. Include tables for clinics, doctors, services, and appointments. Output ONLY raw SQL.` 
        },
      ],
      model: "llama3-70b-8192",
    });

    // 4. DEPLOY LIVE TO VAPI
    const vapiDeployment = await deployToVapi(vapiResponse.choices[0]?.message?.content || "", intake.clinic_name);

    return NextResponse.json({
      status: "SUCCESS",
      clinicId,
      vapi_id: vapiDeployment?.id,
      artifacts: {
        vapi_prompt: vapiResponse.choices[0]?.message?.content || "",
        n8n_workflow: n8nResponse.choices[0]?.message?.content || "",
        supabase_sql: sqlResponse.choices[0]?.message?.content || "",
      },
      dashboard_url: `/clinic/${clinicId}`,
    });

  } catch (error: any) {
    console.error("[ORCHESTRATOR ERROR]", error);
    return NextResponse.json({ status: "ERROR", message: error.message }, { status: 500 });
  }
}
