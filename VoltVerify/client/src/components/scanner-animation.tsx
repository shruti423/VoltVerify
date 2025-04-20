import React from "react";
import { cn } from "@/lib/utils";
import { QrCode, Scan, Zap } from "lucide-react";

interface ScannerAnimationProps {
  className?: string;
}

export default function ScannerAnimation({ className }: ScannerAnimationProps) {
  return (
    <div className={cn("aspect-square relative rounded-lg bg-gradient-to-b from-[#0a192f] to-[#112240] shadow-2xl", className)}>
      {/* Corner Indicators */}
      <div className="absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-primary"></div>
      <div className="absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-primary"></div>
      <div className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-primary"></div>
      <div className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-primary"></div>
      
      {/* Scan Line */}
      <div className="absolute h-[3px] w-full bg-primary inset-x-0 animate-[scan_2s_ease-in-out_infinite] z-10">
        <div className="absolute inset-0 blur-sm bg-primary/70"></div>
        <div className="absolute -top-1 -bottom-1 inset-x-0 bg-gradient-to-b from-primary/20 to-transparent"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Pulsing Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
          <QrCode className="h-24 w-24 text-white/40 relative z-10" />
          
          {/* Floating Elements */}
          <div className="absolute -top-8 -right-8 animate-float-slow">
            <div className="bg-primary/90 p-2 rounded-full shadow-lg">
              <Scan className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div className="absolute -bottom-10 -left-6 animate-float">
            <div className="bg-primary/90 p-2 rounded-full shadow-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Indicators */}
      <div className="absolute top-4 right-4 flex space-x-1">
        <div className="h-2 w-2 rounded-full bg-primary animate-ping"></div>
        <div className="h-2 w-2 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="h-2 w-2 rounded-full bg-primary animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 10%; opacity: 1; }
          50% { top: 90%; opacity: 0.5; }
          100% { top: 10%; opacity: 1; }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
      ` }} />
    </div>
  );
}
