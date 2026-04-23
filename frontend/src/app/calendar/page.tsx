"use client";

import { motion } from "framer-motion";
import { CalendarClock, Check, RefreshCw, Plus, Calendar as CalendarIcon, User } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const DOCTOR_CALENDARS = [
  { name: "Dr. Mansouri", email: "mansouri@clinic.dz", status: "Synced", appointments: 12 },
  { name: "Dr. Belkacem", email: "belkacem@clinic.dz", status: "Synced", appointments: 8 },
  { name: "Dr. Haddad", email: "haddad@clinic.dz", status: "Disconnected", appointments: 0 },
];

export default function CalendarPage() {
  return (
    <div className="flex h-screen w-screen bg-[#5C1A1A] text-[#F5F0E8] overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-[6px] mb-2">Calendar Sync</h1>
              <p className="text-sm opacity-40 uppercase tracking-widest font-semibold">Real-time G-Cal & n8n Bridge</p>
            </div>
            <button className="bg-[#D4AF37] text-[#5C1A1A] px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all">
              <Plus size={14} /> Connect New Calendar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {DOCTOR_CALENDARS.map((cal, i) => (
              <motion.div 
                key={cal.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 flex flex-col gap-6 group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5F0E8]/5 flex items-center justify-center border border-[#F5F0E8]/10 group-hover:border-[#D4AF37]/30 transition-all">
                      <User size={24} className="opacity-40" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-widest">{cal.name}</h3>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest font-semibold">{cal.email}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    cal.status === "Synced" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                  }`}>
                    {cal.status === "Synced" ? <Check size={10} /> : <RefreshCw size={10} className="animate-spin" />}
                    {cal.status}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 bg-[#F5F0E8]/5 rounded-xl p-4 border border-[#F5F0E8]/10">
                    <span className="text-[9px] opacity-30 uppercase tracking-widest block mb-1">Today&apos;s Appointments</span>
                    <span className="text-2xl font-black">{cal.appointments}</span>
                  </div>
                  <div className="flex-1 bg-[#F5F0E8]/5 rounded-xl p-4 border border-[#F5F0E8]/10">
                    <span className="text-[9px] opacity-30 uppercase tracking-widest block mb-1">Sync Frequency</span>
                    <span className="text-2xl font-black uppercase">Realtime</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-2">
                  <button className="flex-1 py-3 rounded-lg bg-[#F5F0E8]/5 border border-[#F5F0E8]/10 text-[10px] font-bold uppercase tracking-widest hover:bg-[#F5F0E8]/10 transition-all">View Schedule</button>
                  <button className="flex-1 py-3 rounded-lg bg-[#F5F0E8]/5 border border-[#F5F0E8]/10 text-[10px] font-bold uppercase tracking-widest hover:bg-[#F5F0E8]/10 transition-all">Re-Sync</button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Infrastructure Health */}
          <div className="mt-12 glass-panel p-8 bg-gradient-to-r from-green-500/5 to-transparent">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <RefreshCw className="text-green-500" size={24} />
                  <div>
                    <h3 className="font-bold uppercase tracking-widest mb-1">n8n Execution Engine</h3>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest font-semibold">Active & Healthy &middot; 4,209 successful syncs today</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                    <div key={i} className="w-1 h-8 bg-green-500/30 rounded-full" />
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
