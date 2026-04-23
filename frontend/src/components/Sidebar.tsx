"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BrainCircuit, CalendarClock, Settings, Activity } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Intelligence HUD", path: "/", icon: LayoutDashboard },
    { name: "Patient Memory", path: "/memory", icon: BrainCircuit },
    { name: "Calendar Sync", path: "/calendar", icon: CalendarClock },
    { name: "Analytics", path: "/analytics", icon: Activity },
    { name: "System Config", path: "/config", icon: Settings },
  ];

  return (
    <div className="w-[280px] bg-black/20 border-r border-[#F5F0E8]/10 p-8 flex flex-col gap-8 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C7323] flex items-center justify-center">
          <BrainCircuit size={18} className="text-[#5C1A1A]" />
        </div>
        <div className="font-black tracking-[4px] text-lg uppercase text-[#F5F0E8]">
          Clinic OS
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#F5F0E8]/10 to-transparent border-l-2 border-[#D4AF37] text-[#F5F0E8]"
                  : "text-[#F5F0E8]/50 hover:text-[#F5F0E8] hover:bg-[#F5F0E8]/5 border-l-2 border-transparent"
              }`}
            >
              <Icon size={16} className={isActive ? "text-[#D4AF37]" : ""} />
              <span className="text-[11px] uppercase tracking-widest font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-[#F5F0E8]/10">
        <div className="text-[9px] opacity-40 tracking-widest mb-3 uppercase">Engine Status</div>
        <div className="flex items-center gap-3 bg-[#F5F0E8]/5 p-3 rounded-lg border border-[#F5F0E8]/10">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <div className="text-[10px] font-bold text-[#F5F0E8] tracking-wider uppercase">Active: n8n v1.42</div>
        </div>
      </div>
    </div>
  );
}
