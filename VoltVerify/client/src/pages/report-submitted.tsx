import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle, Home, Shield, Zap, ArrowRight } from "lucide-react";
import SpellAnimation from "@/components/spell-animation";

export default function ReportSubmitted() {
  const [_, navigate] = useLocation();
  const [showSpell, setShowSpell] = useState(true);
  const reportId = `REP-${Math.floor(10000 + Math.random() * 90000)}`;
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  useEffect(() => {
    // Hide spell animation after 2 seconds
    const timer = setTimeout(() => {
      setShowSpell(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleBackToHome = () => {
    navigate("/");
  };
  
  const handleVerifyAnother = () => {
    navigate("/scanner");
  };
  
  return (
    <>
      {showSpell && (
        <SpellAnimation type="report" />
      )}
      
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="inline-block p-3 rounded-full bg-amber-100 mb-4">
            <Shield className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
            Report Submitted
          </h1>
        </div>
        
        <Card className="overflow-hidden shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-400 p-8">
            <div className="flex flex-col items-center text-white">
              <div className="h-20 w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                THANK YOU FOR YOUR REPORT
              </h2>
              <p className="mt-4 text-white/90 max-w-xl text-center text-lg">
                Your counterfeit report has been submitted successfully. Together we can combat counterfeit products.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                Spell: Protego Consumerum! - Consumer protection spell cast
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-amber-500" />
                  What Happens Next
                </h3>
                <div className="bg-neutral-50 rounded-lg p-6 shadow-inner space-y-4">
                  <div className="flex gap-3">
                    <div className="h-7 w-7 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center text-amber-700 font-medium">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">Report Review</p>
                      <p className="text-sm text-neutral-600">
                        Manufacturers will review your report and may contact you for additional information.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-7 w-7 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center text-amber-700 font-medium">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">Investigation</p>
                      <p className="text-sm text-neutral-600">
                        The manufacturer will investigate the counterfeit product and the seller you reported.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-7 w-7 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center text-amber-700 font-medium">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">Action Taken</p>
                      <p className="text-sm text-neutral-600">
                        Appropriate legal action may be taken against sellers of counterfeit products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-amber-500" />
                  Report Details
                </h3>
                <div className="bg-amber-50 rounded-lg p-6 border border-amber-100 shadow-inner">
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-amber-100 rounded-lg">
                      <div className="h-12 w-12 flex-shrink-0 rounded-full bg-amber-200 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-amber-700" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-amber-800">Report ID: {reportId}</h4>
                        <p className="text-sm text-amber-700">
                          Submitted on {reportDate}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-amber-800">
                      By reporting counterfeit products, you are helping to:
                    </p>
                    <ul className="space-y-2 text-amber-700 list-disc pl-5">
                      <li>Protect other consumers from potentially dangerous fake products</li>
                      <li>Support legitimate manufacturers and their authentic products</li>
                      <li>Combat illegal counterfeiting operations</li>
                      <li>Improve product safety standards across the industry</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-neutral-50 p-6 flex justify-center gap-4 border-t">
            <Button 
              variant="outline"
              onClick={handleBackToHome} 
              className="gap-2"
            >
              <Home size={16} /> Back to Home
            </Button>
            <Button 
              onClick={handleVerifyAnother} 
              className="gap-2"
            >
              Verify Another Product <ArrowRight size={16} />
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-center text-sm text-neutral-500 max-w-lg mx-auto">
          <p>
            Thank you for helping us fight counterfeit products. Your contribution helps make the marketplace safer for everyone.
          </p>
        </div>
      </div>
    </>
  );
}
