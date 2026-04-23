"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, User, ArrowRight, BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Billion-Dollar Mock Auth: Simulated login delay
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <div className="h-screen w-screen bg-[#5C1A1A] flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 blur-[150px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] glass-panel p-12 relative z-10 border-[#F5F0E8]/10"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#8C7323] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <BrainCircuit size={32} className="text-[#5C1A1A]" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-[8px] text-[#F5F0E8] mb-2">Clinic OS</h1>
          <p className="text-[10px] opacity-40 uppercase tracking-[4px] font-bold">Secure Intelligence Vault</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold ml-1">Enterprise Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={16} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@clinic.dz"
                className="w-full bg-black/20 border border-[#F5F0E8]/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold ml-1">Access Token</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={16} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/20 border border-[#F5F0E8]/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#8C7323] text-[#5C1A1A] py-5 rounded-xl font-black uppercase tracking-[4px] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
          >
            {loading ? "Verifying Credentials..." : <>Enter Vault <ArrowRight size={14} /></>}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-[#F5F0E8]/5 flex justify-between items-center opacity-30">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            <span className="text-[9px] uppercase tracking-widest font-bold">256-bit AES</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest font-bold">v1.42 Build</span>
        </div>
      </motion.div>
    </div>
  );
}
