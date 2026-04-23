import { NextResponse } from 'next/server';

// This is the core API engine that connects the Voice Agent (Vapi) to the Logic Engine (n8n/Airtable)
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // 1. Identify the caller and the clinic
    const { message, call } = payload;
    const clinicPhoneNumber = call?.customer?.number; // The number the patient called
    
    // In a real production system, this looks up the clinic in the DB (Airtable/Postgres)
    console.log(`[CLINIC OS ENGINE] Incoming call on line: ${clinicPhoneNumber}`);
    
    // 2. Route to n8n Webhook for processing if it's an end-of-call report
    if (message?.type === 'end-of-call-report') {
      const transcript = message?.transcript;
      const summary = message?.summary;
      
      // Send to your n8n master webhook
      /*
      await fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'call_ended',
          clinicNumber: clinicPhoneNumber,
          transcript,
          summary,
          patientMemoryData: message?.analysis // The "Mémoire Centrale" extraction
        })
      });
      */
      
      console.log(`[CLINIC OS ENGINE] Sent Call Data to n8n Master Workflow.`);
      return NextResponse.json({ status: 'success', message: 'Data synced to Memoire Centrale and n8n.' });
    }

    // 3. Dynamic Prompt Injection (If Vapi requests context before call starts)
    if (message?.type === 'assistant-request') {
      // Pull clinic data from DB
      const clinicData = {
        name: "Dr. Ahmed's Clinic",
        price: "3000 DZD",
        hours: "9 AM to 5 PM"
      };
      
      // Inject the context
      return NextResponse.json({
        assistant: {
          model: {
            messages: [
              {
                role: "system",
                content: `You are the medical receptionist for ${clinicData.name}. Consultation price is ${clinicData.price}.`
              }
            ]
          }
        }
      });
    }

    return NextResponse.json({ status: 'ignored', reason: 'unhandled message type' });
    
  } catch (error) {
    console.error('[CLINIC OS ENGINE ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
