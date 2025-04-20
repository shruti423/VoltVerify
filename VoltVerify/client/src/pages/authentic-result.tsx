import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle, Info, ArrowRight, Scan, Shield } from "lucide-react";
import { useVerification } from "@/context/verification-context";
import SpellAnimation from "@/components/spell-animation";

export default function AuthenticResult() {
  const [_, navigate] = useLocation();
  const { verificationResult } = useVerification();
  const [showSpell, setShowSpell] = useState(true);
  
  // If we don't have verification result, go back to home
  useEffect(() => {
    if (!verificationResult?.product) {
      navigate("/");
    }
    
    // Hide spell animation after 2 seconds
    const timer = setTimeout(() => {
      setShowSpell(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [verificationResult, navigate]);
  
  if (!verificationResult?.product) {
    return null;
  }
  
  const { product } = verificationResult;
  
  const handleVerifyAnother = () => {
    navigate("/scanner");
  };
  
  return (
    <>
      {showSpell && (
        <SpellAnimation type="authenticate" />
      )}
      
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="inline-block p-3 rounded-full bg-green-100 mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
            Verification Result
          </h1>
        </div>
        
        <Card className="overflow-hidden shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 p-8">
            <div className="flex flex-col items-center text-white">
              <div className="h-20 w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                PRODUCT IS AUTHENTIC
              </h2>
              <p className="mt-4 text-white/90 max-w-xl text-center text-lg">
                This product has been verified as authentic using our secure blockchain verification system.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                Spell: Veritaserum! - The truth has been revealed
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 flex items-center">
                  <Info className="mr-2 h-5 w-5 text-green-500" />
                  Product Information
                </h3>
                <div className="bg-neutral-50 rounded-lg p-6 shadow-inner">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-neutral-500">Product Name</p>
                      <p className="text-lg font-semibold text-neutral-900">{product.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Manufacturer</p>
                      <p className="text-lg font-semibold text-neutral-900">{product.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Serial Number</p>
                      <p className="text-lg font-semibold text-neutral-900">{product.serialNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Date Manufactured</p>
                      <p className="text-lg font-semibold text-neutral-900">{product.manufactureDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-500" />
                  Verification Details
                </h3>
                <div className="bg-green-50 rounded-lg p-6 border border-green-100 shadow-inner">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-green-700">Blockchain Hash</p>
                      <p className="text-md font-mono text-green-800 break-all">{product.blockchainHash}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Verification Time</p>
                      <p className="text-md font-medium text-green-800">{new Date().toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Verification Method</p>
                      <p className="text-md font-medium text-green-800">Blockchain Authentication</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center p-4 bg-green-100 rounded-lg">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-green-200 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-700" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-green-800">Trust Score</h4>
                      <p className="text-sm text-green-700">
                        This product has passed all verification checks.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-neutral-600 text-sm">
                    Your product is genuine. Enjoy premium quality and full warranty coverage.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-neutral-50 p-6 flex justify-center border-t">
            <Button 
              size="lg"
              onClick={handleVerifyAnother} 
              className="px-8 gap-2"
            >
              Verify Another Product <ArrowRight size={18} />
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-center text-sm text-neutral-500 max-w-lg mx-auto">
          <p>
            This verification result is backed by VoltVerify's secure blockchain technology.
            For any questions about this verification, please contact customer support.
          </p>
        </div>
      </div>
    </>
  );
}
