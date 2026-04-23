"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, DollarSign, Users, BrainCircuit, CheckCircle2, AlertTriangle, ShieldAlert, RefreshCw } from 'lucide-react';

import { useTenant } from "@/context/TenantContext";

export default function DashboardHUD() {
  const { industry, tenantId } = useTenant();
  const [revenue, setRevenue] = useState(426000);
  const [bookings, setBookings] = useState(142);
  const [hoursSaved, setHoursSaved] = useState(58.4);

  const getIndustryContent = () => {
    switch (industry) {
      case "LEGAL":
        return { 
          title: "Legal Intelligence", 
          tenantLabel: `ATTORNEY CASELOAD: ${tenantId?.toUpperCase() || "GLOBAL"}`,
          kpi1: "Active Cases", 
          kpi2: "Billable Revenue", 
          kpi3: "Court Hours Reclaimed" 
        };
      case "REAL_ESTATE":
        return { 
          title: "Asset Intelligence", 
          tenantLabel: `BROKERAGE FEED: ${tenantId?.toUpperCase() || "GLOBAL"}`,
          kpi1: "Active Listings", 
          kpi2: "Sales Volume", 
          kpi3: "Negotiation Hours" 
        };
      default:
        return { 
          title: "Medical Intelligence", 
          tenantLabel: `CLINIC HUD: ${tenantId?.toUpperCase() || "GLOBAL"}`,
          kpi1: "Consultations", 
          kpi2: "Generated Revenue", 
          kpi3: "Staff Hours Reclaimed" 
        };
    }
  };

  const content = getIndustryContent();

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setRevenue(prev => prev + 3000);
        setBookings(prev => prev + 1);
        setHoursSaved(prev => parseFloat((prev + 0.25).toFixed(1)));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-10 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#F5F0E8] flex items-center gap-3">
            {content.tenantLabel}
          </h1>
          <p className="text-sm opacity-50 mt-1">{content.title} &middot; Operating since April 2026</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-green-500/10 text-green-400 border border-green-500/30 px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(76,175,80,0.2)]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            AI ENGINE: ONLINE
          </div>
          <button className="bg-gradient-to-r from-[#D4AF37] to-[#8C7323] text-[#5C1A1A] px-6 py-2.5 rounded-lg text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            Global Analytics
          </button>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-4 gap-6 mb-10 relative z-10">
        <MetricCard icon={Users} title={content.kpi1} value={bookings} trend="+12.5% this week" variants={item} />
        <MetricCard icon={DollarSign} title={content.kpi2} value={`${revenue.toLocaleString('en-US')} DZD`} trend="ROI Target: 8.4x" variants={item} />
        <MetricCard icon={Clock} title={content.kpi3} value={`${hoursSaved} hrs`} trend="Efficiency: +42%" variants={item} />
        <MetricCard icon={Activity} title="User Satisfaction" value="4.9 / 5" trend="98.2% Positive Sentiment" variants={item} />
      </motion.div>


      {/* Lower Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="grid grid-cols-3 gap-6 flex-1 min-h-0 relative z-10">
        <div className="col-span-2 glass-panel p-8 flex flex-col h-full bg-black/20">
          <div className="flex items-center justify-between mb-6 border-b border-[#F5F0E8]/10 pb-4">
            <h2 className="text-xs uppercase tracking-widest text-[#F5F0E8]/70 flex items-center gap-2">
              <BrainCircuit size={14} /> Live Intelligence Feed
            </h2>
            <div className="text-[9px] opacity-40 tracking-widest uppercase flex items-center gap-1">
              <RefreshCw size={10} className="animate-spin" /> Live Sync
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide pr-2 space-y-4">
            <FeedItem 
              icon={CheckCircle2} iconColor="text-green-400"
              action={<span><strong>Patient Inbound:</strong> M. Slimane calling for RDV.</span>}
              tag="Booking Success" tagColor="text-green-400 bg-green-400/10 border border-green-400/20" time="2 mins ago" 
            />
            <FeedItem 
              icon={AlertTriangle} iconColor="text-yellow-400"
              action={<span><strong>Triage Analysis:</strong> Patient reported acute back pain.</span>}
              tag="Triage High" tagColor="text-yellow-400 bg-yellow-400/10 border border-yellow-400/20" time="15 mins ago" 
            />
          </div>
          
          {/* Elite System Health Monitor */}
          <div className="mt-6 pt-6 border-t border-[#F5F0E8]/10 flex items-center justify-between">
            <div className="flex gap-8">
              <HealthStat label="Groq Brain" status="99.9%" />
              <HealthStat label="Vapi Voice" status="99.7%" />
              <HealthStat label="n8n Engine" status="100%" />
            </div>
            <div className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded border border-[#D4AF37]/20">
              System Load: 4%
            </div>
          </div>
        </div>


        <div className="col-span-1 glass-panel p-8 flex flex-col h-full bg-black/20">
          <h2 className="text-xs uppercase tracking-widest mb-6 border-b border-[#F5F0E8]/10 pb-4 text-[#F5F0E8]/70 flex items-center gap-2">
            <Activity size={14} /> Mémoire Centrale
          </h2>
          
          <div className="bg-gradient-to-br from-[#5C1A1A]/40 to-black/60 border border-[#D4AF37]/30 rounded-xl p-6 mb-6 flex-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-2xl rounded-full transition-transform group-hover:scale-150 duration-700" />
            <h4 className="text-[10px] text-[#D4AF37] tracking-widest mb-4 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Patient Profile: #882
            </h4>
            <div className="text-[11px] leading-relaxed opacity-90 space-y-3 relative z-10">
              <p><strong className="text-white opacity-50 uppercase tracking-wider text-[9px] block mb-1">Name</strong> Fatima Zohra</p>
              <p><strong className="text-white opacity-50 uppercase tracking-wider text-[9px] block mb-1">Context</strong> Patient called 3 times in 2025. History of hypertension.</p>
              <p><strong className="text-white opacity-50 uppercase tracking-wider text-[9px] block mb-1">AI Observation</strong> Patient prefers morning appointments and speaks primarily in Arabic (Darja).</p>
            </div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-white/5">
            <div className="text-[9px] opacity-50 mb-3 tracking-widest uppercase">System Capabilities</div>
            <ul className="text-[11px] space-y-2 opacity-70">
              <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#D4AF37]" /> Cross-visit patient recognition</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#D4AF37]" /> Dynamic language switching</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#D4AF37]" /> Automated no-show prevention</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function HealthStat({ label, status }: any) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[8px] opacity-40 uppercase font-black tracking-widest">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(76,175,80,0.5)]"></div>
        <span className="text-[10px] font-bold tracking-wider">{status}</span>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon: Icon, variants }: any) {
  return (
    <motion.div variants={variants} className="glass-panel p-6 card-hover bg-black/20 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[10px] opacity-60 uppercase tracking-widest">{title}</h3>
        <div className="w-8 h-8 rounded bg-[#F5F0E8]/5 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
          <Icon size={16} className="text-[#D4AF37]" />
        </div>
      </div>
      <div className="text-3xl font-black mb-2 text-[#F5F0E8]">{value}</div>
      <div className="text-[10px] text-green-400 font-semibold tracking-wide">{trend}</div>
    </motion.div>
  );
}

function FeedItem({ action, tag, tagColor, time, icon: Icon, iconColor }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="p-5 bg-black/30 border border-[#F5F0E8]/5 rounded-lg flex justify-between items-start gap-4 hover:border-[#D4AF37]/30 transition-colors group">
      <div className="mt-0.5 shrink-0">
        <Icon size={16} className={`${iconColor}`} />
      </div>
      <div className="text-[12px] flex-1 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">{action}</div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className={`text-[9px] px-2.5 py-1 rounded-sm uppercase font-bold tracking-widest ${tagColor}`}>
          {tag}
        </span>
        <span className="text-[10px] opacity-30">{time}</span>
      </div>
    </motion.div>
  );
}
