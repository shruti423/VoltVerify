import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, Database, PlusCircle, RefreshCw } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { InsertProduct } from "@shared/schema";

export default function Manufacturer() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSpell, setShowSpell] = useState(false);
  const [spellMessage, setSpellMessage] = useState("");
  
  const [product, setProduct] = useState<Partial<InsertProduct>>({
    name: "",
    barcode: "",
    manufacturer: "",
    serialNumber: "",
    manufactureDate: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Show spell animation
    setSpellMessage("Securitas Authentica!");
    setShowSpell(true);

    try {
      const response = await apiRequest("POST", "/api/products", product);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }
      
      const data = await response.json();
      
      setTimeout(() => {
        setIsLoading(false);
        setShowSpell(false);
        
        toast({
          title: "Product Added",
          description: "The product has been securely added to the blockchain.",
          variant: "default",
        });
        
        // Reset form
        setProduct({
          name: "",
          barcode: "",
          manufacturer: "",
          serialNumber: "",
          manufactureDate: new Date().toISOString().split("T")[0],
        });
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
      setIsLoading(false);
      setShowSpell(false);
      
      toast({
        title: "Error Adding Product",
        description: error instanceof Error ? error.message : "There was a problem adding the product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Spell Animation Overlay */}
      {showSpell && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">{spellMessage}</h2>
            <p className="text-primary/80 text-lg">Adding product to secure blockchain...</p>
          </div>
        </div>
      )}
    
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-full bg-primary/10">
          <Database className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Manufacturer Portal</h1>
          <p className="text-neutral-500">Add authentic products to the blockchain verification system</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Registration Form */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#0a192f] to-[#112240] text-white">
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Register New Product
            </CardTitle>
            <CardDescription className="text-gray-300">
              Add authentic products to be verified by users
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Smart Watch X1"
                    value={product.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barcode">
                    Barcode/Serial Number
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="barcode"
                    name="barcode" 
                    placeholder="e.g., A123456789"
                    value={product.barcode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    name="manufacturer"
                    placeholder="e.g., Tech Innovations Inc."
                    value={product.manufacturer}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manufactureDate">Manufacture Date</Label>
                  <Input
                    id="manufactureDate"
                    name="manufactureDate"
                    type="date"
                    value={product.manufactureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  name="serialNumber"
                  placeholder="e.g., SN-1234567890"
                  value={product.serialNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="bg-neutral-50 border-t">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Register Product on Blockchain
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Product Registration Info */}
        <div className="space-y-6">
          <Card className="bg-[#0a192f] text-white shadow-xl">
            <CardHeader>
              <CardTitle>Secure Blockchain Registration</CardTitle>
              <CardDescription className="text-gray-300">
                How product verification works
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-primary">Why Register Products?</h3>
                <p className="text-gray-300">
                  By registering your authentic products on our blockchain system, you're creating 
                  a secure, immutable record that consumers can verify instantly. This protects 
                  your brand integrity and builds consumer trust.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-primary">Security Features</h3>
                <ul className="text-gray-300 space-y-1 list-disc pl-5">
                  <li>Tamper-proof blockchain validation</li>
                  <li>Encrypted product data</li>
                  <li>Real-time counterfeit reporting</li>
                  <li>Manufacture-to-consumer tracking</li>
                </ul>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Trust in Every Scan</h3>
                <p className="text-gray-300 text-sm">
                  VoltVerify's blockchain authentication ensures consumers can trust the 
                  authenticity of your products with a simple scan.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Quick Registration Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">1</div>
                <p>Ensure barcodes are unique for each product model</p>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">2</div>
                <p>Include detailed product specifications for better verification</p>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">3</div>
                <p>Verify registered products by testing them on the scanner page</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}