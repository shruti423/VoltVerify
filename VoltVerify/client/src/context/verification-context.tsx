import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@shared/schema';

// Define the shape of our verification result
interface VerificationResult {
  authentic: boolean;
  product?: Product;
}

// Context type definition
interface VerificationContextType {
  verificationResult: VerificationResult | null;
  setVerificationResult: (result: VerificationResult | null) => void;
  resetVerification: () => void;
}

// Create context with default values
const VerificationContext = createContext<VerificationContextType>({
  verificationResult: null,
  setVerificationResult: () => {},
  resetVerification: () => {},
});

// Hook for easy context consumption
export const useVerification = () => useContext(VerificationContext);

// Provider component
interface VerificationProviderProps {
  children: ReactNode;
}

export const VerificationProvider = ({ children }: VerificationProviderProps) => {
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const resetVerification = () => {
    setVerificationResult(null);
  };

  return (
    <VerificationContext.Provider 
      value={{ 
        verificationResult, 
        setVerificationResult,
        resetVerification 
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};
