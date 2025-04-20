import React from "react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, Shield, ArrowRight, Database } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#eef2ff] text-neutral-800">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Logo />
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/scanner" className="inline-block">
                <Button variant="outline" className="flex gap-2 items-center">
                  <Shield size={16} />
                  Verify Product
                </Button>
              </Link>
              <Link href="/dashboard" className="inline-block">
                <Button className="flex gap-2 items-center">
                  <ArrowRight size={16} />
                  Dashboard
                </Button>
              </Link>
              <Link href="/manufacturer" className="inline-block">
                <Button variant="secondary" className="flex gap-2 items-center">
                  <Database size={16} />
                  Manufacturer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a192f] text-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Logo & Description */}
            <div>
              <Logo />
              <p className="mt-4 text-sm text-gray-300">
                Ensuring authentic electronic products through secure blockchain verification. 
                Protect yourself from counterfeit products with our cutting-edge technology.
              </p>
            </div>
            
            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/scanner" className="text-gray-300 hover:text-primary transition-colors">
                    Verify Products
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-300 hover:text-primary transition-colors">
                    Reports Dashboard
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Column 3: Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">Jagran Lakecity University, Bhopal</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">8839100606</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">contact@voltverify.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-center text-sm text-gray-300">&copy; {currentYear} VoltVerify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
