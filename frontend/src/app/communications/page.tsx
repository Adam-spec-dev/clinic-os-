"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, Filter, CheckCheck, Clock, Send, ShieldCheck, Mail, PhoneCall, ArrowRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const MESSAGES = [
  { id: "m1", patient: "Ali Mansouri", type: "Booking Confirmation", content: "Your appointment with Dr. Belkacem is confirmed for tomorrow at 10:00 AM.", status: "DELIVERED", time: "10:42 AM" },
  { id: "m2", patient: "Sara Touati", type: "Follow-up", content: "Hi Sara, hope you are feeling better. Please remember to take your prescription as directed.", status: "READ", time: "09:15 AM" },
  { id: "m3", patient: "Karim Brahimi", type: "Reminder", content: "Reminder: You have a consultation at Cabinet El Amir in 2 hours.", status: "DELIVERED", time: "08:30 AM" },
  { id: "m4", patient: "Lina Amari", type: "Emergency Escalate", content: "Urgent: Doctor has been notified of your symptoms. Please go to the clinic immediately.", status: "READ", time: "Yesterday" },
];

export default function CommunicationsPage() {
  return (
    <div className="flex h-screen w-screen bg-[#5C1A1A] text-[#F5F0E8] overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-[6px] mb-2">Patient Communications</h1>
              <p className="text-sm opacity-40 uppercase tracking-widest font-semibold">Live AI Transparency Hub</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-4">
                <ShieldCheck size={16} className="text-green-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">End-to-End Encrypted</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            <div className="col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
              <input 
                type="text" 
                placeholder="Search patient or message content..."
                className="w-full bg-black/20 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]/30 transition-all"
              />
            </div>
            <button className="bg-white/5 border border-white/10 rounded-xl py-4 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              <Filter size={14} /> Filter by Type
            </button>
            <button className="bg-[#D4AF37] text-[#5C1A1A] rounded-xl py-4 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
              <Send size={14} /> Manual SMS Override
            </button>
          </div>

          {/* Messages Feed */}
          <div className="space-y-4">
            {MESSAGES.map((msg, i) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 flex items-center justify-between group hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center text-[#D4AF37] border border-white/5 group-hover:bg-[#D4AF37]/10 transition-all">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-sm font-black uppercase tracking-widest">{msg.patient}</h4>
                      <span className="text-[9px] opacity-30 font-bold uppercase tracking-widest px-2 py-0.5 border border-white/10 rounded-sm">{msg.type}</span>
                    </div>
                    <p className="text-xs opacity-60 font-medium leading-relaxed max-w-xl line-clamp-1">{msg.content}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 text-green-400">
                      <span className="text-[9px] font-black uppercase tracking-widest">{msg.status}</span>
                      {msg.status === "READ" ? <CheckCheck size={14} /> : <Clock size={12} />}
                    </div>
                    <span className="text-[10px] opacity-30 font-semibold">{msg.time}</span>
                  </div>
                  <button className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Channel Integration Footer */}
          <div className="mt-12 grid grid-cols-3 gap-6">
             <ChannelCard icon={MessageSquare} label="SMS Protocol" status="Active" count="1,242 Sent" />
             <ChannelCard icon={Mail} label="Email Engine" status="Standby" count="0 Sent" />
             <ChannelCard icon={PhoneCall} label="Voice Bridge" status="Active" count="428 Calls" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelCard({ icon: Icon, label, status, count }: any) {
  return (
    <div className="glass-panel p-6 bg-black/20 border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#D4AF37]">
          <Icon size={18} />
        </div>
        <div>
          <h5 className="text-[10px] font-black uppercase tracking-widest mb-1">{label}</h5>
          <p className="text-[9px] opacity-40 uppercase tracking-widest font-bold">{count}</p>
        </div>
      </div>
      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-sm ${
        status === "Active" ? "bg-green-500/10 text-green-400" : "bg-white/5 text-white/40"
      }`}>
        {status}
      </span>
    </div>
  );
}
