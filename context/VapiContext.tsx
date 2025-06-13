'use client';

import React, { createContext, useContext, useMemo } from 'react';
import Vapi from '@vapi-ai/web';

interface VapiContextType {
  vapi: Vapi;
}

const VapiContext = createContext<VapiContextType | null>(null);

export const VapiProvider = ({ children }: { children: React.ReactNode }) => {
  const vapi = useMemo(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY as string), []);

  return (
    <VapiContext.Provider value={{ vapi }}>
      {children}
    </VapiContext.Provider>
  );
};

export const useVapi = () => {
  const context = useContext(VapiContext);
  if (!context) {
    throw new Error('useVapi must be used within a VapiProvider');
  }
  return context.vapi;
};