import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, X, AlertCircle, Info, ArrowRight, Shield, ScanLine } from "lucide-react";
import { insertCounterfeitReportSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import SpellAnimation from "@/components/spell-animation";

// Extend the schema with validation rules
const formSchema = insertCounterfeitReportSchema.extend({
  productId: z.string().min(1, "Product ID is required"),
  sellerName: z.string().min(1, "Seller name is required"),
  purchaseLocation: z.string().min(1, "Purchase location is required"),
  additionalDetails: z.string().optional(),
});

export default function CounterfeitResult() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [showSpell, setShowSpell] = useState(true);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      sellerName: "",
      purchaseLocation: "",
      additionalDetails: "",
    },
  });
  
  useEffect(() => {
    // Hide spell animation after 2 seconds
    const timer = setTimeout(() => {
      setShowSpell(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Show reporting spell animation
      setShowSpell(true);
      
      await apiRequest("POST", "/api/reports", data);
      
      // Wait for the spell animation to finish
      setTimeout(() => {
        navigate("/report-submitted");
      }, 1500);
    } catch (error) {
      setShowSpell(false);
      toast({
        title: "Error",
        description: "There was a problem submitting your report. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleVerifyAnother = () => {
    navigate("/scanner");
  };
  
  return (
    <>
      {showSpell && (
        <SpellAnimation type="counterfeit" />
      )}
      
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="inline-block p-3 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
            Verification Result
          </h1>
        </div>
        
        <Card className="overflow-hidden shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 p-8">
            <div className="flex flex-col items-center text-white">
              <div className="h-20 w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <X className="h-10 w-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                PRODUCT IS NOT AUTHENTIC
              </h2>
              <p className="mt-4 text-white/90 max-w-xl text-center text-lg">
                This product could not be verified as authentic. It may be counterfeit or not registered in our blockchain system.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                Spell: Flagrante Falsum! - Counterfeit detected
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                  Counterfeit Alert
                </h3>
                <div className="bg-red-50 rounded-lg p-6 border border-red-100 shadow-inner">
                  <div className="space-y-4">
                    <p className="text-red-800">
                      The scanned product could not be verified in our blockchain database. This may indicate:
                    </p>
                    <ul className="space-y-2 text-red-700 list-disc pl-5">
                      <li>The product is counterfeit</li>
                      <li>The barcode or serial number has been tampered with</li>
                      <li>The product is from an unauthorized seller</li>
                      <li>The product has not been registered by the manufacturer</li>
                    </ul>
                    
                    <div className="mt-4 p-4 bg-red-100 rounded-lg border border-red-200">
                      <p className="text-sm text-red-800 font-medium">
                        Purchasing counterfeit products poses risks including:
                      </p>
                      <ul className="text-sm text-red-700 list-disc pl-5 mt-2">
                        <li>Safety hazards and potential electrical failures</li>
                        <li>Poor performance and reduced product lifespan</li>
                        <li>No manufacturer warranty or support</li>
                        <li>Possible data security risks</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button 
                    variant="outline"
                    onClick={handleVerifyAnother}
                    className="gap-2"
                  >
                    <ScanLine size={16} /> Verify Another Product
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-800 flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-red-500" />
                  Report Counterfeit Product
                </h3>
                <Card className="shadow-sm border border-neutral-200">
                  <CardContent className="p-5">
                    <p className="text-sm text-neutral-600 mb-4">
                      Help protect consumers by reporting this counterfeit product. Your information will be shared with manufacturers and authorities.
                    </p>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="productId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product ID/Serial Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter product ID or serial number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sellerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Seller Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter seller name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="purchaseLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Purchase Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Where did you purchase this product?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="additionalDetails"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Details</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Any other details about the product or seller" 
                                  className="resize-none" 
                                  rows={3}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full gap-2">
                          <Shield size={16} /> Submit Report
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center text-sm text-neutral-500 max-w-lg mx-auto">
          <p>
            VoltVerify helps you identify authentic products through secure blockchain verification.
            Learn more about how to protect yourself from counterfeit products on our website.
          </p>
        </div>
      </div>
    </>
  );
}
