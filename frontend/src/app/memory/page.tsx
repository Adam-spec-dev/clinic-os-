"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Search, Phone, User, Calendar, MessageSquare, History, Database, Sparkles } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const MOCK_PATIENTS = [
  { id: "p1", name: "Fatima Zohra", phone: "+213 661 22 33 44", lastCall: "2 hours ago", status: "Anxious", summary: "Sensitive tooth, needs warm tone." },
  { id: "p2", name: "Karim Benani", phone: "+213 550 11 22 33", lastCall: "Yesterday", status: "Regular", summary: "Routine cleaning, family plan." },
  { id: "p3", name: "Amira Hamidi", phone: "+213 770 44 55 66", lastCall: "3 days ago", status: "VIP", summary: "Orthodontics, preferred Dr. Mansouri." },
];

export default function MemoryPage() {
  return (
    <div className="flex h-screen w-screen bg-[#5C1A1A] text-[#F5F0E8] overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-[6px] mb-2">Patient Memory</h1>
              <p className="text-sm opacity-40 uppercase tracking-widest font-semibold">Graph Database: Neo4j Connected</p>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
              <input 
                placeholder="Search patient graph..." 
                className="bg-[#F5F0E8]/5 border border-[#F5F0E8]/10 rounded-full py-3 pl-12 pr-8 w-[400px] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left: Global Stats */}
            <div className="col-span-1 space-y-8">
              <div className="glass-panel p-8 flex flex-col gap-4">
                <Database className="text-[#D4AF37]" size={24} />
                <h3 className="text-xl font-bold uppercase tracking-widest">Graph Stats</h3>
                <div className="space-y-4 mt-2">
                  <div className="flex justify-between items-end border-b border-[#F5F0E8]/5 pb-2">
                    <span className="text-[10px] opacity-40 uppercase tracking-widest">Nodes</span>
                    <span className="text-xl font-black">12,482</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-[#F5F0E8]/5 pb-2">
                    <span className="text-[10px] opacity-40 uppercase tracking-widest">Relationships</span>
                    <span className="text-xl font-black">84,103</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-[#F5F0E8]/5 pb-2">
                    <span className="text-[10px] opacity-40 uppercase tracking-widest">Sync Latency</span>
                    <span className="text-xl font-black text-green-400">14ms</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 border-[#D4AF37]/20">
                <Sparkles className="text-[#D4AF37] mb-4" size={24} />
                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">AI Memory Insight</h3>
                <p className="text-xs leading-relaxed opacity-60">
                  The graph detected 3 families with overlapping appointment patterns. Suggesting "Family Plan" discounts in next outbound campaign could increase retention by 14%.
                </p>
              </div>
            </div>

            {/* Right: Recent Interactions */}
            <div className="col-span-2 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[4px] opacity-40 flex items-center gap-3">
                <History size={14} /> Recent Cognitive Updates
              </h3>
              
              <div className="space-y-4">
                {MOCK_PATIENTS.map((patient, i) => (
                  <motion.div 
                    key={patient.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-panel p-6 flex items-center justify-between hover:bg-[#F5F0E8]/5 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center border border-[#F5F0E8]/10">
                        <User size={20} className="opacity-40" />
                      </div>
                      <div>
                        <h4 className="font-bold tracking-widest uppercase mb-1">{patient.name}</h4>
                        <div className="flex gap-4 text-[10px] opacity-40 uppercase font-semibold">
                          <span className="flex items-center gap-1"><Phone size={10} /> {patient.phone}</span>
                          <span className="flex items-center gap-1"><Calendar size={10} /> {patient.lastCall}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-bold tracking-widest border ${
                        patient.status === "Anxious" ? "text-red-400 border-red-400/20 bg-red-400/5" : 
                        patient.status === "VIP" ? "text-[#D4AF37] border-[#D4AF37]/20 bg-[#D4AF37]/5" : 
                        "text-green-400 border-green-400/20 bg-green-400/5"
                      }`}>
                        {patient.status}
                      </span>
                      <p className="text-[10px] opacity-40 max-w-[200px] line-clamp-1 group-hover:opacity-80 transition-opacity">
                        {patient.summary}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
