"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CookiesContextProps {
  cookies: string | null;
  setCookies: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create context with the correct type or undefined
const CookiesContext = createContext<CookiesContextProps | undefined>(undefined);

export const CookiesProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookies] = useState<string | null>(null);

  return (
    <CookiesContext.Provider value={{ cookies, setCookies }}>
      {children}
    </CookiesContext.Provider>
  );
};

// Custom hook to access cookies context
export const useCookies = () => {
  const context = useContext(CookiesContext);
  if (!context) {
    throw new Error("useCookies must be used within a CookiesProvider");
  }
  return context;
};

