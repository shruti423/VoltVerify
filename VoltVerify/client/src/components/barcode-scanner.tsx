import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ScannerAnimation from "./scanner-animation";
import { useVerification } from "@/context/verification-context";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Scan, QrCode, ArrowRight, Shield, AlertTriangle } from "lucide-react";

export default function BarcodeScanner() {
  const [_, navigate] = useLocation();
  const [manualBarcode, setManualBarcode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const { toast } = useToast();
  const { setVerificationResult } = useVerification();
  
  // Simulate scanning progress
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isScanning) {
      intervalId = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            return 0;
          }
          return prev + 5;
        });
      }, 150);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isScanning]);
  
  const handleBackToHome = () => {
    navigate("/");
  };

  const verifyProduct = async (barcode: string) => {
    // Start scanning animation
    setIsScanning(true);
    
    try {
      // Make API request
      const response = await apiRequest("GET", `/api/verify/${barcode}`, undefined);
      const data = await response.json();
      
      // Store verification result in context
      setVerificationResult(data);
      
      // Small delay to complete animation
      setTimeout(() => {
        // Navigate to the appropriate result page
        if (data.authentic) {
          navigate("/authentic-result");
        } else {
          navigate("/counterfeit-result");
        }
      }, 800);
      
    } catch (error) {
      setIsScanning(false);
      toast({
        title: "Verification Failed",
        description: "There was a problem verifying the product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleManualVerification = () => {
    if (!manualBarcode.trim()) {
      toast({
        title: "Barcode Required",
        description: "Please enter a barcode number to verify.",
        variant: "destructive",
      });
      return;
    }
    
    verifyProduct(manualBarcode.trim());
  };

  const handleSimulateAuthentic = () => {
    verifyProduct("A123456789");
  };

  const handleSimulateCounterfeit = () => {
    verifyProduct("FAKE12345");
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
          <QrCode size={28} />
        </div>
        <h1 className="text-3xl font-bold text-neutral-800">Product Verification</h1>
        <p className="mt-3 text-neutral-600 max-w-3xl mx-auto">
          Position your product's barcode within the scanner area or enter the code manually for verification.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
        <div>
          <Card className="border-0 shadow-xl overflow-hidden bg-transparent">
            <CardContent className="p-0">
              <ScannerAnimation />
              {isScanning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20 backdrop-blur-sm">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <Scan className="h-10 w-10 text-primary animate-pulse" />
                  </div>
                  <div className="mt-4 w-44 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300 rounded-full" 
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <p className="text-white mt-2 font-medium">Verifying product...</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-[#0a192f] text-white p-4 justify-between">
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/10 gap-2"
                onClick={handleBackToHome}
              >
                <ChevronLeft size={16} /> Back
              </Button>
              <div className="space-x-2">
                <Button
                  variant="ghost"
                  className="border border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-400"
                  onClick={handleSimulateAuthentic}
                  disabled={isScanning}
                >
                  <Shield className="mr-2 h-4 w-4" /> Test Authentic
                </Button>
                <Button
                  variant="ghost"
                  className="border border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                  onClick={handleSimulateCounterfeit}
                  disabled={isScanning}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" /> Test Counterfeit
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-[#0a192f] to-[#112240] text-white">
              <CardTitle className="flex items-center gap-2">
                <QrCode size={18} />
                Manual Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="manual-barcode" className="block text-sm font-medium text-neutral-700">
                    Enter Barcode or Serial Number
                  </label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="manual-barcode"
                      placeholder="e.g., A123456789 or SN-987654321"
                      value={manualBarcode}
                      onChange={(e) => setManualBarcode(e.target.value)}
                      className="w-full"
                      disabled={isScanning}
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    Enter the product barcode (e.g., A123456789) or serial number (e.g., SN-987654321) 
                    exactly as found on your product or as registered by the manufacturer
                  </p>
                </div>
                
                <p className="text-sm text-neutral-600 bg-primary/5 p-3 rounded-md border border-primary/10">
                  <span className="font-medium">Tip:</span> For accurate results, make sure to include any prefix or suffix letters
                  in the product code.
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-neutral-50 flex">
              <Button
                className="w-full flex items-center gap-2"
                onClick={handleManualVerification}
                disabled={isScanning}
              >
                <Scan size={16} /> Verify Product
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-4 text-center text-sm text-neutral-500">
            Need help? <a href="#" className="text-primary hover:underline">View our verification guide</a>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0a192f] text-white p-4 rounded-lg max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="bg-primary/20 p-3 rounded-full">
            <Shield size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Report Counterfeits</h3>
            <p className="text-sm text-gray-300">
              Help protect other consumers by reporting counterfeit products. All reports are confidential.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white/10"
            onClick={() => navigate("/counterfeit-result")}
          >
            Report a Counterfeit
          </Button>
        </div>
      </div>
    </div>
  );
}
