import React, { useEffect, useState } from "react";
import { Sparkles, Wand2, Shield, AlertTriangle, CheckCircle, Scan } from "lucide-react";

interface SpellAnimationProps {
  type: "verify" | "authenticate" | "counterfeit" | "report" | "register";
  onComplete?: () => void;
  duration?: number;
}

const spellData = {
  verify: {
    text: "Revelio Authenticum!",
    description: "Revealing the truth...",
    icon: Scan,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20"
  },
  authenticate: {
    text: "Veritaserum!",
    description: "Confirming authenticity...",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/20"
  },
  counterfeit: {
    text: "Flagrante Falsum!",
    description: "Detecting counterfeit product...",
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-500/20"
  },
  report: {
    text: "Protego Consumerum!",
    description: "Submitting report...",
    icon: Shield,
    color: "text-amber-500",
    bgColor: "bg-amber-500/20"
  },
  register: {
    text: "Securitas Authentica!",
    description: "Registering product on blockchain...",
    icon: Wand2,
    color: "text-primary",
    bgColor: "bg-primary/20"
  }
};

export default function SpellAnimation({ 
  type, 
  onComplete,
  duration = 2000
}: SpellAnimationProps) {
  const [visible, setVisible] = useState(true);
  const spell = spellData[type];
  const Icon = spell.icon;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [onComplete, duration]);
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto">
        <div className={`w-24 h-24 rounded-full ${spell.bgColor} mx-auto flex items-center justify-center mb-6 animate-pulse relative`}>
          <div className="absolute">
            <Sparkles className={`h-16 w-16 ${spell.color} animate-spin`} style={{ animationDuration: '8s' }} />
          </div>
          <Icon className={`h-10 w-10 ${spell.color} relative z-10`} />
        </div>
        <h2 className="text-4xl font-bold text-white mb-3">{spell.text}</h2>
        <p className={`${spell.color} text-lg`}>{spell.description}</p>
        
        {/* Magic particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className={`absolute ${spell.color} rounded-full animate-float-particle`}
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}