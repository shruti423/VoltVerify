import React from "react";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  // Map size to dimensions
  const sizeMap = {
    sm: "h-7 w-7 text-lg",
    md: "h-9 w-9 text-xl",
    lg: "h-14 w-14 text-2xl"
  };

  const textSizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl"
  };

  return (
    <div className="flex items-center gap-2">
      <div 
        className={cn(
          "relative flex items-center justify-center rounded-full bg-primary/90 text-white p-1 shadow-md",
          sizeMap[size],
          className
        )}
      >
        <div className="relative">
          <Zap className="h-full w-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-1/2 w-1/2 bg-white/10 blur-sm rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={cn("font-extrabold tracking-tight text-neutral-800", textSizeMap[size])}>
          <span>Volt</span>
          <span className="text-primary">Verify</span>
        </span>
        <span className="text-xs text-neutral-500 -mt-1 hidden sm:block">Blockchain Authentication</span>
      </div>
    </div>
  );
}

export default Logo;
