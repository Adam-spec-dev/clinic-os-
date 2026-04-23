"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Building2, Users, Stethoscope, Mic, CalendarClock, Shield, Loader2, Check } from "lucide-react";

const STEPS = ["Clinic Info", "Practitioners", "Services", "AI Voice", "Booking Rules", "Special"];

interface Doctor {
  name: string;
  specialty: string;
  days: string[];
  hours_start: string;
  hours_end: string;
  slot_duration: string;
  calendar_email: string;
}

interface Service {
  name: string;
  price: string;
  duration: string;
}

export default function IntakePage() {
  const [step, setStep] = useState(0);
  const [deploying, setDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [deployed, setDeployed] = useState(false);
  const [clinicName, setClinicName] = useState("");
  const [clinicType, setClinicType] = useState("Dental");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [hours, setHours] = useState({ start: "08:00", end: "17:00", closedDays: [] as string[] });
  const [doctors, setDoctors] = useState<Doctor[]>([{ name: "", specialty: "", days: ["Mon","Tue","Wed","Thu","Fri"], hours_start: "09:00", hours_end: "17:00", slot_duration: "30", calendar_email: "" }]);
  const [services, setServices] = useState<Service[]>([{ name: "", price: "", duration: "30" }]);
  const [tone, setTone] = useState("professional");
  const [voiceGender, setVoiceGender] = useState("female_mature");
  const [languages, setLanguages] = useState<string[]>(["fr"]);
  const [canBookSameDay, setCanBookSameDay] = useState("yes");
  const [bookingAdvance, setBookingAdvance] = useState("1month");
  const [confirmSMS, setConfirmSMS] = useState(true);
  const [reminderSMS, setReminderSMS] = useState(true);
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [patientChooseDoctor, setPatientChooseDoctor] = useState("yes");
  const [customLogic, setCustomLogic] = useState("");
  const [voiceDNA, setVoiceDNA] = useState("");

  const DEPLOY_STEPS = [
    "Analyzing clinic requirements...",
    "Generating AI personality & scripts...",
    "Provisioning Twilio voice number...",
    "Creating Vapi intelligent assistant...",
    "Building n8n automation workflows...",
    "Initializing Supabase database...",
    "Configuring multi-doctor routing...",
    "Deploying dashboard instance...",
    "Sending welcome credentials...",
    "System is LIVE."
  ];

  const handleDeploy = async () => {
    setDeploying(true);
    
    // Trigger the real AI Architect
    try {
      const intakeData = {
        clinic_name: clinicName,
        clinic_type: clinicType,
        city: city,
        address: address,
        hours: hours,
        doctors: doctors,
        services: services,
        tone: tone,
        voice_gender: voiceGender,
        languages: languages,
        can_book_same_day: canBookSameDay,
        booking_advance: bookingAdvance,
        confirm_sms: confirmSMS,
        reminder_sms: reminderSMS,
        patient_choose_doctor: patientChooseDoctor,
        emergency_number: emergencyNumber,
        custom_logic: customLogic,
        voice_dna: voiceDNA
      };

      await fetch("/api/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intakeData)
      });
    } catch (err) {
      console.error("Failed to trigger architect:", err);
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDeployStep(i);
      if (i >= DEPLOY_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => setDeployed(true), 1500);
      }
    }, 3200);
  };


  const addDoctor = () => setDoctors([...doctors, { name: "", specialty: "", days: ["Mon","Tue","Wed","Thu","Fri"], hours_start: "09:00", hours_end: "17:00", slot_duration: "30", calendar_email: "" }]);
  const addService = () => setServices([...services, { name: "", price: "", duration: "30" }]);

  const updateDoctor = (index: number, field: keyof Doctor, value: string | string[]) => {
    const updated = [...doctors];
    (updated[index] as any)[field] = value;
    setDoctors(updated);
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const toggleDay = (docIndex: number, day: string) => {
    const updated = [...doctors];
    const days = updated[docIndex].days;
    updated[docIndex].days = days.includes(day) ? days.filter(d => d !== day) : [...days, day];
    setDoctors(updated);
  };

  const toggleLang = (lang: string) => {
    setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  // DEPLOYING SCREEN
  if (deploying) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {deployed ? "System Deployed" : "Building Your System"}
            </h1>
            <p className="text-sm text-white/40 mt-2">{clinicName}</p>
          </div>

          <div className="space-y-4">
            {DEPLOY_STEPS.map((label, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: i <= deployStep ? 1 : 0.2, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  i < deployStep ? "border-green-500/30 bg-green-500/5" :
                  i === deployStep ? "border-[#D4AF37]/50 bg-[#D4AF37]/5" :
                  "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  {i < deployStep ? (
                    <Check size={16} className="text-green-400" />
                  ) : i === deployStep ? (
                    <Loader2 size={16} className="text-[#D4AF37] animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  )}
                </div>
                <span className={`text-sm ${i < deployStep ? "text-green-400" : i === deployStep ? "text-[#D4AF37]" : "text-white/30"}`}>
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          {deployed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 p-6 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-center">
              <p className="text-[#D4AF37] text-lg font-bold mb-2">Your system is live.</p>
              <p className="text-white/50 text-sm mb-4">Phone: +213 34 XX XX XX</p>
              <p className="text-white/50 text-sm mb-6">Dashboard: os.four4.com/{clinicName.toLowerCase().replace(/\s/g, "-")}</p>
              <button className="bg-[#D4AF37] text-black px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-widest">
                Open Dashboard
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // FORM STEPS
  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none transition-colors";
  const labelClass = "text-[10px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-1.5 block";
  const btnActive = "bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37]";
  const btnInactive = "bg-white/5 border-white/10 text-white/50 hover:border-white/20";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-sm font-bold tracking-widest uppercase text-[#D4AF37]">Clinic OS</h1>
            <span className="text-[10px] text-white/30">{step + 1} / {STEPS.length}</span>
          </div>
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/5">
                <motion.div
                  className="h-full bg-[#D4AF37]"
                  initial={{ width: 0 }}
                  animate={{ width: i <= step ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((s, i) => (
              <span key={i} className={`text-[9px] tracking-wider ${i <= step ? "text-[#D4AF37]" : "text-white/20"}`}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FORM CONTENT */}
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-32">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>

            {/* STEP 0: CLINIC INFO */}
            {step === 0 && (
              <div className="space-y-8">
                <div><Building2 size={32} className="text-[#D4AF37] mb-4" /><h2 className="text-2xl font-bold">Clinic Information</h2><p className="text-white/40 text-sm mt-1">Basic details about your practice.</p></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2"><label className={labelClass}>Clinic Name</label><input className={inputClass} value={clinicName} onChange={e => setClinicName(e.target.value)} placeholder="Cabinet Dentaire El Amir" /></div>
                  <div><label className={labelClass}>Specialty Type</label>
                    <select className={inputClass} value={clinicType} onChange={e => setClinicType(e.target.value)}>
                      <option value="Dental">Dental</option><option value="Medical">General Medical</option><option value="Dermatology">Dermatology</option><option value="Ophthalmology">Ophthalmology</option><option value="Cardiology">Cardiology</option><option value="Pediatrics">Pediatrics</option><option value="Other">Other</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>City</label><input className={inputClass} value={city} onChange={e => setCity(e.target.value)} placeholder="Algiers" /></div>
                  <div className="col-span-2"><label className={labelClass}>Address</label><input className={inputClass} value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Rue Didouche Mourad" /></div>
                  <div><label className={labelClass}>Opening Time</label><input type="time" className={inputClass} value={hours.start} onChange={e => setHours({...hours, start: e.target.value})} /></div>
                  <div><label className={labelClass}>Closing Time</label><input type="time" className={inputClass} value={hours.end} onChange={e => setHours({...hours, end: e.target.value})} /></div>
                </div>
              </div>
            )}

            {/* STEP 1: PRACTITIONERS */}
            {step === 1 && (
              <div className="space-y-8">
                <div><Users size={32} className="text-[#D4AF37] mb-4" /><h2 className="text-2xl font-bold">Practitioners</h2><p className="text-white/40 text-sm mt-1">Add every doctor who works at this clinic.</p></div>
                {doctors.map((doc, di) => (
                  <div key={di} className="p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-4">
                    <h3 className="text-sm font-bold text-[#D4AF37]">Doctor {di + 1}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={labelClass}>Full Name</label><input className={inputClass} value={doc.name} onChange={e => updateDoctor(di, "name", e.target.value)} placeholder="Dr. Mansouri" /></div>
                      <div><label className={labelClass}>Specialty</label><input className={inputClass} value={doc.specialty} onChange={e => updateDoctor(di, "specialty", e.target.value)} placeholder="Orthodontics" /></div>
                      <div className="col-span-2">
                        <label className={labelClass}>Working Days</label>
                        <div className="flex gap-2">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                          <button key={d} onClick={() => toggleDay(di, d)} className={`px-3 py-1.5 rounded border text-xs font-semibold transition-all ${doc.days.includes(d) ? btnActive : btnInactive}`}>{d}</button>
                        ))}</div>
                      </div>
                      <div><label className={labelClass}>Start Hour</label><input type="time" className={inputClass} value={doc.hours_start} onChange={e => updateDoctor(di, "hours_start", e.target.value)} /></div>
                      <div><label className={labelClass}>End Hour</label><input type="time" className={inputClass} value={doc.hours_end} onChange={e => updateDoctor(di, "hours_end", e.target.value)} /></div>
                      <div><label className={labelClass}>Slot Duration</label>
                        <select className={inputClass} value={doc.slot_duration} onChange={e => updateDoctor(di, "slot_duration", e.target.value)}>
                          <option value="15">15 min</option><option value="30">30 min</option><option value="45">45 min</option><option value="60">60 min</option>
                        </select>
                      </div>
                      <div><label className={labelClass}>Google Calendar Email</label><input className={inputClass} value={doc.calendar_email} onChange={e => updateDoctor(di, "calendar_email", e.target.value)} placeholder="doctor@gmail.com" /></div>
                    </div>
                  </div>
                ))}
                <button onClick={addDoctor} className="w-full p-3 rounded-lg border border-dashed border-[#D4AF37]/30 text-[#D4AF37] text-sm font-semibold hover:bg-[#D4AF37]/5 transition-colors">+ Add Another Doctor</button>
              </div>
            )}

            {/* STEP 2: SERVICES */}
            {step === 2 && (
              <div className="space-y-8">
                <div><Stethoscope size={32} className="text-[#D4AF37] mb-4" /><h2 className="text-2xl font-bold">Services & Pricing</h2><p className="text-white/40 text-sm mt-1">The AI will quote these prices on the phone.</p></div>
                {services.map((svc, si) => (
                  <div key={si} className="grid grid-cols-3 gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div><label className={labelClass}>Service Name</label><input className={inputClass} value={svc.name} onChange={e => updateService(si, "name", e.target.value)} placeholder="Teeth Cleaning" /></div>
                    <div><label className={labelClass}>Price (DA)</label><input className={inputClass} value={svc.price} onChange={e => updateService(si, "price", e.target.value)} placeholder="5000" /></div>
                    <div><label className={labelClass}>Duration</label>
                      <select className={inputClass} value={svc.duration} onChange={e => updateService(si, "duration", e.target.value)}>
                        <option value="15">15 min</option><option value="30">30 min</option><option value="45">45 min</option><option value="60">60 min</option><option value="90">90 min</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button onClick={addService} className="w-full p-3 rounded-lg border border-dashed border-[#D4AF37]/30 text-[#D4AF37] text-sm font-semibold hover:bg-[#D4AF37]/5 transition-colors">+ Add Service</button>
                <div><label className={labelClass}>Can patients choose their doctor?</label>
                  <div className="flex gap-3">
                    {[["yes","Yes"],["auto","Auto-assign by availability"],["specialty","Assign by specialty"]].map(([v,l]) => (
                      <button key={v} onClick={() => setPatientChooseDoctor(v)} className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all ${patientChooseDoctor === v ? btnActive : btnInactive}`}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: AI VOICE */}
            {step === 3 && (
              <div className="space-y-8">
                <div><Mic size={32} className="text-[#D4AF37] mb-4" /><h2 className="text-2xl font-bold">AI Personality</h2><p className="text-white/40 text-sm mt-1">How your AI receptionist sounds and behaves.</p></div>
                <div><label className={labelClass}>Tone</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[["professional","Professional & Formal"],["warm","Warm & Friendly"],["empathetic","Empathetic & Caring"],["efficient","Efficient & Direct"]].map(([v,l]) => (
                      <button key={v} onClick={() => setTone(v)} className={`p-4 rounded-lg border text-left text-sm font-semibold transition-all ${tone === v ? btnActive : btnInactive}`}>{l}</button>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>Voice Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[["female_young","Female, Young (20s-30s)"],["female_mature","Female, Mature (40s-50s)"],["male_young","Male, Young"],["male_mature","Male, Mature"]].map(([v,l]) => (
                      <button key={v} onClick={() => setVoiceGender(v)} className={`p-4 rounded-lg border text-left text-sm font-semibold transition-all ${voiceGender === v ? btnActive : btnInactive}`}>{l}</button>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>Languages Supported</label>
                  <div className="flex gap-3">
                    {[["fr","French"],["ar","Arabic"],["kab","Kabyle"],["en","English"]].map(([v,l]) => (
                      <button key={v} onClick={() => toggleLang(v)} className={`px-5 py-3 rounded-lg border text-sm font-semibold transition-all ${languages.includes(v) ? btnActive : btnInactive}`}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: BOOKING RULES */}
            {step === 4 && (
              <div className="space-y-8">
                <div><CalendarClock size={32} className="text-[#D4AF37] mb-4" /><h2 className="text-2xl font-bold">Booking Rules</h2><p className="text-white/40 text-sm mt-1">Control how the AI manages appointments.</p></div>
                <div><label className={labelClass}>Same-day bookings?</label>
                  <div className="flex gap-3">{[["yes","Yes"],["no","No"],["emergency","Emergencies Only"]].map(([v,l]) => (
                    <button key={v} onClick={() => setCanBookSameDay(v)} className={`px-5 py-3 rounded-lg border text-sm font-semibold transition-all ${canBookSameDay === v ? btnActive : btnInactive}`}>{l}</button>
                  ))}</div>
                </div>
                <div><label className={labelClass}>Max advance booking</label>
                  <div className="flex gap-3">{[["1week","1 Week"],["2weeks","2 Weeks"],["1month","1 Month"],["3months","3 Months"]].map(([v,l]) => (
                    <button key={v} onClick={() => setBookingAdvance(v)} className={`px-5 py-3 rounded-lg border text-sm font-semibold transition-all ${bookingAdvance === v ? btnActive : btnInactive}`}>{l}</button>
                  ))}</div>
                </div>
                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={confirmSMS} onChange={() => setConfirmSMS(!confirmSMS)} className="accent-[#D4AF37] w-4 h-4" /><span className="text-sm">Send confirmation SMS</span></label>
                  <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={reminderSMS} onChange={() => setReminderSMS(!reminderSMS)} className="accent-[#D4AF37] w-4 h-4" /><span className="text-sm">Send 24h reminder SMS</span></label>
                </div>
              </div>
            )}

            {/* STEP 5: SPECIAL */}
            {step === 5 && (
              <div className="space-y-8">
                <div><Shield size={32} className="text-[#D4AF37] mb-4" /><h2 className="text-2xl font-bold">Special Requirements</h2><p className="text-white/40 text-sm mt-1">Final configurations before deployment.</p></div>
                <div><label className={labelClass}>Emergency Transfer Number</label><input className={inputClass} value={emergencyNumber} onChange={e => setEmergencyNumber(e.target.value)} placeholder="+213 555 XX XX XX" /><p className="text-[10px] text-white/30 mt-1">The AI will transfer urgent calls to this number instantly.</p></div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between">
          <button onClick={() => setStep(Math.max(0, step - 1))} className={`flex items-center gap-2 px-6 py-3 rounded-lg border text-sm font-semibold transition-all ${step === 0 ? "opacity-20 pointer-events-none" : "border-white/10 hover:border-white/30"}`}>
            <ChevronLeft size={16} /> Back
          </button>
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#D4AF37] text-black text-sm font-bold uppercase tracking-widest hover:bg-[#e8c84a] transition-all">
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={handleDeploy} className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#D4AF37] text-black text-sm font-bold uppercase tracking-widest hover:bg-[#e8c84a] transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              Deploy System
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
