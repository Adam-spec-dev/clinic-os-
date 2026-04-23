"use client";

import { motion } from "framer-motion";
import { Terminal, Shield, Cpu, Zap, Search } from "lucide-react";

const LOGS = [
  { id: 1, type: "SECURITY", msg: "Zero-Trust Handshake Verified (JWT).", time: "12:00:01" },
  { id: 2, type: "AI", msg: "Strategic Prompt Mapping: Industry=MEDICAL.", time: "12:00:05" },
  { id: 3, type: "PROVISION", msg: "Vapi Assistant 'El Amir' Created (ID: v_992).", time: "12:00:12" },
  { id: 4, type: "ORCHESTRATOR", msg: "n8n Workflow Generated & Injected.", time: "12:00:15" },
  { id: 5, type: "SECURITY", msg: "Encryption Key Rotation Complete.", time: "12:05:00" },
];

export default function AgentActivityLog() {
  return (
    <div className="glass-panel p-6 bg-black/40 border-[#F5F0E8]/5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5F0E8]/10">
        <h3 className="text-[10px] font-black uppercase tracking-[3px] flex items-center gap-2">
          <Terminal size={14} className="text-[#D4AF37]" /> Core Engine Logs
        </h3>
        <div className="flex items-center gap-1.5">
           <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
           <span className="text-[9px] opacity-40 uppercase font-bold tracking-widest">Active Ops</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px]">
        {LOGS.map((log) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 group"
          >
            <span className="opacity-20 tabular-nums">{log.time}</span>
            <span className={`font-bold ${
              log.type === "SECURITY" ? "text-blue-400" :
              log.type === "AI" ? "text-purple-400" :
              log.type === "PROVISION" ? "text-green-400" :
              "text-yellow-400"
            }`}>[{log.type}]</span>
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">{log.msg}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#F5F0E8]/10 grid grid-cols-3 gap-2">
         <StatBox icon={Shield} label="Security" val="Secure" />
         <StatBox icon={Cpu} label="Compute" val="92%" />
         <StatBox icon={Zap} label="Latency" val="14ms" />
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, val }: any) {
  return (
    <div className="bg-white/5 p-2 rounded flex flex-col items-center gap-1">
      <Icon size={12} className="opacity-40" />
      <span className="text-[8px] opacity-40 uppercase font-bold">{label}</span>
      <span className="text-[9px] font-black">{val}</span>
    </div>
  );
}
