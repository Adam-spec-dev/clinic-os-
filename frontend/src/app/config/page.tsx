"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, Bell, Shield, Sliders, Mic, DollarSign, Users, Sparkles } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState("personality");

  const tabs = [
    { id: "personality", name: "AI Personality", icon: Mic },
    { id: "pricing", name: "Services & Pricing", icon: DollarSign },
    { id: "workforce", name: "Workforce", icon: Users },
    { id: "security", name: "Security & RLS", icon: Shield },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#5C1A1A] text-[#F5F0E8] overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-[6px] mb-2">System Config</h1>
              <p className="text-sm opacity-40 uppercase tracking-widest font-semibold">Tweak the AI Intelligence & Business Logic</p>
            </div>
            <button className="bg-green-500 text-white px-10 py-3 rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <Save size={14} /> Deploy Changes Live
            </button>
          </div>

          <div className="flex gap-12">
            {/* Tabs Sidebar */}
            <div className="w-[200px] flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest text-left ${
                      isActive ? "bg-[#F5F0E8] text-[#5C1A1A]" : "text-[#F5F0E8]/40 hover:text-[#F5F0E8] hover:bg-[#F5F0E8]/5"
                    }`}
                  >
                    <Icon size={14} /> {tab.name}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="flex-1 glass-panel p-10">
              {activeTab === "personality" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div className="flex items-center gap-4 text-[#D4AF37]">
                      <Sparkles size={20} />
                      <h3 className="text-lg font-bold uppercase tracking-widest">AI Character Designer</h3>
                   </div>
                   
                   <div className="space-y-6">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold block mb-2">Global Voice Tone</label>
                        <div className="grid grid-cols-2 gap-3">
                          {["Professional", "Warm", "Efficient", "Empathetic"].map(t => (
                            <button key={t} className="p-4 rounded-xl border border-[#F5F0E8]/10 text-left text-xs hover:border-[#D4AF37]/50 transition-all font-semibold uppercase tracking-widest">{t}</button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold block mb-2">Greeting Message</label>
                        <textarea 
                          className="w-full bg-[#F5F0E8]/5 border border-[#F5F0E8]/10 rounded-xl p-4 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]/50" 
                          rows={4}
                          defaultValue="Bonjour, Cabinet Dentaire El Amir. Je suis votre assistant IA, comment puis-je vous aider aujourd'hui ?"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl">
                        <div className="flex items-center gap-4">
                           <Bell className="text-[#D4AF37]" size={16} />
                           <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest">Auto-Triage Active</p>
                              <p className="text-[9px] opacity-60 uppercase tracking-widest">AI will detect dental emergencies automatically.</p>
                           </div>
                        </div>
                        <div className="w-10 h-5 bg-[#D4AF37] rounded-full relative">
                           <div className="absolute right-1 top-1 w-3 h-3 bg-[#5C1A1A] rounded-full" />
                        </div>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === "pricing" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <h3 className="text-lg font-bold uppercase tracking-widest text-[#D4AF37]">Service Catalog</h3>
                   <div className="space-y-4">
                      {[
                        { name: "Consultation", price: "3,000 DA" },
                        { name: "Teeth Cleaning", price: "5,000 DA" },
                        { name: "Root Canal", price: "25,000 DA" },
                      ].map(s => (
                        <div key={s.name} className="flex justify-between items-center p-4 bg-[#F5F0E8]/5 border border-[#F5F0E8]/10 rounded-xl group hover:border-[#D4AF37]/30 transition-all">
                           <span className="font-bold tracking-widest uppercase text-sm">{s.name}</span>
                           <div className="flex items-center gap-6">
                              <span className="text-lg font-black text-[#D4AF37]">{s.price}</span>
                              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase underline">Edit</button>
                           </div>
                        </div>
                      ))}
                      <button className="w-full py-4 border border-dashed border-[#F5F0E8]/20 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">+ Add New Service</button>
                   </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
