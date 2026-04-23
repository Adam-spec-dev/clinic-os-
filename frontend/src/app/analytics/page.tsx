"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, Users, DollarSign, ArrowUpRight, BarChart3, PieChart, Target } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function AnalyticsPage() {
  const stats = [
    { label: "Monthly Revenue", value: "840,000 DA", change: "+12.5%", up: true, icon: DollarSign },
    { label: "New Patients", value: "142", change: "+18%", up: true, icon: Users },
    { label: "AI Efficiency", value: "98.2%", change: "+2.1%", up: true, icon: Activity },
    { label: "Ad ROI", value: "4.2x", change: "-0.4x", up: false, icon: Target },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#5C1A1A] text-[#F5F0E8] overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-[6px] mb-2">Predictive Analytics</h1>
              <p className="text-sm opacity-40 uppercase tracking-widest font-semibold">Business Intelligence & Financial Forecasting</p>
            </div>
            <div className="flex gap-4">
               <button className="px-6 py-2 rounded-full border border-[#F5F0E8]/20 text-[10px] font-bold uppercase tracking-widest hover:bg-[#F5F0E8]/5 transition-all">Export Report</button>
               <button className="px-6 py-2 rounded-full bg-[#D4AF37] text-[#5C1A1A] text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">Live Insight</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-6 flex flex-col gap-4 relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start z-10">
                    <div className="p-3 bg-[#F5F0E8]/5 rounded-xl border border-[#F5F0E8]/10 group-hover:border-[#D4AF37]/30 transition-all">
                      <Icon size={18} className="text-[#D4AF37]" />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      stat.up ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="z-10">
                    <p className="text-2xl font-black tracking-tight">{stat.value}</p>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold mt-1">{stat.label}</p>
                  </div>
                  <TrendingUp className="absolute -right-4 -bottom-4 opacity-[0.02] text-[#F5F0E8] group-hover:opacity-[0.05] transition-opacity" size={120} />
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-8">
             <div className="glass-panel p-10 space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="text-sm font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                      <BarChart3 size={14} /> Revenue Forecast
                   </h3>
                   <span className="text-[9px] font-bold uppercase px-2 py-1 bg-green-500/10 text-green-400 rounded">Projected Growth</span>
                </div>
                <div className="h-[200px] flex items-end gap-2">
                   {[40, 60, 45, 70, 90, 85, 100].map((h, i) => (
                     <div key={i} className="flex-1 bg-gradient-to-t from-[#D4AF37]/40 to-[#D4AF37] rounded-t-lg transition-all hover:brightness-125" style={{ height: `${h}%` }} />
                   ))}
                </div>
                <div className="flex justify-between text-[9px] opacity-20 font-black uppercase tracking-widest">
                   <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
                </div>
             </div>

             <div className="glass-panel p-10 space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="text-sm font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                      <PieChart size={14} /> Treatment Mix
                   </h3>
                </div>
                <div className="space-y-4">
                   {[
                     { name: "Consultations", p: 45, color: "#D4AF37" },
                     { name: "Surgical", p: 30, color: "#F5F0E8" },
                     { name: "Cosmetic", p: 25, color: "#8C7323" },
                   ].map(item => (
                     <div key={item.name} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                           <span>{item.name}</span>
                           <span style={{ color: item.color }}>{item.p}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#F5F0E8]/5 rounded-full overflow-hidden">
                           <div className="h-full rounded-full" style={{ width: `${item.p}%`, backgroundColor: item.color }} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
