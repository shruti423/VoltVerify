import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  Clock, 
  CreditCard, 
  Shield, 
  QrCode,
  Zap,
  Database,
  AlertTriangle,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const [_, navigate] = useLocation();
  
  const startVerification = () => {
    navigate("/scanner");
  };
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="py-8 sm:py-16 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-800 sm:text-5xl tracking-tight">
            Welcome to <span className="text-primary">VoltVerify</span>
          </h1>
          <p className="mt-6 text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Protect your investment with advanced blockchain verification technology. 
            Instantly authenticate electronic devices and identify counterfeit products.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              size="lg"
              onClick={startVerification}
              className="text-base px-8 py-6 shadow-lg flex items-center gap-2"
            >
              Start Verifying <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="text-base px-8 py-6"
            >
              View Reports
            </Button>
          </div>
        </div>
        
        {/* Visual Indicator */}
        <div className="mt-12 flex justify-center">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping"></div>
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary">
              <QrCode className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-8 bg-white rounded-xl shadow-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800">How It Works</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            Our blockchain verification process is quick, secure, and highly reliable.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 px-6">
            <div className="relative">
              <div className="sticky top-24">
                <div className="bg-[#0a192f] rounded-xl p-6 shadow-xl">
                  <div className="absolute -top-6 -right-6 bg-primary rounded-full p-3 shadow-lg">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Blockchain Technology" 
                    className="rounded-lg shadow-md mb-4 object-cover h-56 w-full"
                  />
                  <h3 className="text-xl font-bold text-white">Blockchain Security</h3>
                  <p className="mt-2 text-gray-300">
                    Every authentic product is registered on our secure blockchain with a unique hash 
                    that cannot be tampered with or duplicated.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                    <QrCode className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-800">Scan Product Barcode</h4>
                  <p className="mt-2 text-neutral-600">
                    Use our scanner to capture the barcode or serial number of your electronic device. 
                    You can also enter the code manually if preferred.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                    <Database className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-800">Blockchain Verification</h4>
                  <p className="mt-2 text-neutral-600">
                    Our system queries the manufacturer's blockchain records to verify the product's authenticity,
                    manufacturing data, and supply chain history.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-800">Instant Results</h4>
                  <p className="mt-2 text-neutral-600">
                    Within seconds, receive a comprehensive verification report confirming 
                    whether your product is authentic or potentially counterfeit.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-800">Report Counterfeits</h4>
                  <p className="mt-2 text-neutral-600">
                    If a counterfeit is detected, easily submit a detailed report that will be sent 
                    directly to manufacturers and consumer protection agencies.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Button
                  onClick={startVerification}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Start Verification <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800">Why Choose VoltVerify</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            Our blockchain-powered verification platform offers multiple advantages
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden transform transition-all hover:scale-105 duration-200">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-4">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Trusted Verification</h3>
              <p className="mt-4 text-neutral-600">
                Secure blockchain technology ensures trustworthy authentication results that cannot be falsified or manipulated.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transform transition-all hover:scale-105 duration-200">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-4">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Instant Results</h3>
              <p className="mt-4 text-neutral-600">
                Get verification results in seconds with a comprehensive report on product authenticity and manufacturing details.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transform transition-all hover:scale-105 duration-200">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-4">
                <CreditCard className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Fraud Protection</h3>
              <p className="mt-4 text-neutral-600">
                Identify counterfeit products before purchase and report them directly to manufacturers to combat fraud.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-[#0a192f] text-white rounded-xl p-8 md:p-12 shadow-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Verify Your Products?</h2>
          <p className="text-gray-300 mb-8">
            Don't risk purchasing counterfeit electronics. Verify the authenticity now with our blockchain technology.
          </p>
          <Button 
            size="lg" 
            className="w-full md:w-auto px-12 py-6 text-lg"
            onClick={startVerification}
          >
            Start Verification
          </Button>
        </div>
      </div>
    </div>
  );
}
