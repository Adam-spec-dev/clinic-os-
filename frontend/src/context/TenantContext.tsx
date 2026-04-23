"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// ==============================================================================
// MONOPOLY OS - TENANT & INDUSTRY PROVIDER
// The Billion-Dollar Foundation: Handles Auth, Multi-Tenancy, and Industry Swapping.
// ==============================================================================

type UserRole = "ADMIN" | "OPERATOR" | "CLIENT";
type IndustryType = "MEDICAL" | "LEGAL" | "REAL_ESTATE" | "LUXURY_SPA";

interface TenantContextType {
  tenantId: string | null;
  industry: IndustryType;
  role: UserRole;
  setTenant: (id: string, industry: IndustryType) => void;
  isAuthenticated: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [industry, setIndustry] = useState<IndustryType>("MEDICAL");
  const [role, setRole] = useState<UserRole>("ADMIN");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Auto-resolve tenant from URL in production
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/clinic/")) {
      const id = path.split("/clinic/")[1];
      setTenantId(id);
      setIsAuthenticated(true);
    }
  }, []);

  const setTenant = (id: string, newIndustry: IndustryType) => {
    setTenantId(id);
    setIndustry(newIndustry);
    setIsAuthenticated(true);
  };

  return (
    <TenantContext.Provider value={{ tenantId, industry, role, setTenant, isAuthenticated }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) throw new Error("useTenant must be used within a TenantProvider");
  return context;
};
