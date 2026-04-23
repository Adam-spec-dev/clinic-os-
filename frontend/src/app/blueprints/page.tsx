"use client";

import { motion } from "framer-motion";
import { Workflow, Plus, Database, Share2, Play, Settings2, FileCode } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const BLUEPRINTS = [
  { id: "b1", name: "Standard Medical Booking", nodes: 12, complexity: "High", lastUsed: "4 mins ago", status: "Verified" },
  { id: "b2", name: "Emergency Triage Routing", nodes: 8, complexity: "Medium", lastUsed: "1 hour ago", status: "Verified" },
  { id: "b3", name: "After-Hours Auto Responder", nodes: 5, complexity: "Low", lastUsed: "2 days ago", status: "Draft" },
  { id: "b4", name: "Insurance Verification Bridge", nodes: 15, complexity: "Elite", lastUsed: "5 mins ago", status: "Verified" },
];

export default function BlueprintsPage() {
  return (
    <div className="flex h-screen w-screen bg-[#5C1A1A] text-[#F5F0E8] overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-[6px] mb-2">Automation Blueprints</h1>
              <p className="text-sm opacity-40 uppercase tracking-widest font-semibold">Master n8n Workflow Library (Agency Only)</p>
            </div>
            <button className="bg-[#D4AF37] text-[#5C1A1A] px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Plus size={14} /> Design New Blueprint
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {BLUEPRINTS.map((bp, i) => (
              <motion.div 
                key={bp.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl rounded-full" />
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5F0E8]/5 flex items-center justify-center border border-[#F5F0E8]/10 group-hover:border-[#D4AF37]/30 transition-all">
                      <Workflow size={24} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-widest">{bp.name}</h3>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest font-semibold">{bp.nodes} Nodes &middot; {bp.complexity} Complexity</p>
                    </div>
                  </div>
                  <span className={`text-[9px] px-2.5 py-1 rounded-full uppercase font-black tracking-widest ${
                    bp.status === "Verified" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {bp.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
                   <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <span className="text-[8px] opacity-30 uppercase tracking-widest block mb-1">Last Deploy</span>
                      <span className="text-[11px] font-bold uppercase">{bp.lastUsed}</span>
                   </div>
                   <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <span className="text-[8px] opacity-30 uppercase tracking-widest block mb-1">Integrations</span>
                      <div className="flex gap-1.5 mt-1">
                         <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center text-[8px]">T</div>
                         <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center text-[8px]">V</div>
                         <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center text-[8px]">S</div>
                      </div>
                   </div>
                   <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <span className="text-[8px] opacity-30 uppercase tracking-widest block mb-1">Type</span>
                      <span className="text-[11px] font-bold uppercase">Production</span>
                   </div>
                </div>

                <div className="flex gap-3 relative z-10">
                  <button className="flex-1 py-3 rounded-lg bg-[#D4AF37] text-[#5C1A1A] text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <FileCode size={12} /> Edit JSON
                  </button>
                  <button className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <Share2 size={12} /> Clone
                  </button>
                  <button className="w-12 h-11 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center hover:bg-green-500/20 transition-all border border-green-500/20">
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* n8n Status Bar */}
          <div className="mt-12 glass-panel p-6 bg-gradient-to-r from-[#D4AF37]/5 to-transparent flex items-center justify-between border-[#D4AF37]/10">
            <div className="flex items-center gap-6">
              <Settings2 className="text-[#D4AF37]" size={20} />
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest mb-1">n8n Execution Engine (Agency Cluster)</h4>
                <p className="text-[9px] opacity-40 uppercase tracking-widest">Self-hosted &middot; 4 Nodes Active &middot; 99.99% Uptime</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-[10px] font-bold text-green-400 bg-green-400/5 px-4 py-2 rounded-lg border border-green-400/10 uppercase tracking-widest">Sync Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
