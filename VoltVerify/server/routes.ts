import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCounterfeitReportSchema, insertProductSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Helper function to generate a blockchain hash
  function generateBlockchainHash(barcode: string): string {
    // This is a simplified version for demo purposes
    // In a real app, this would use actual blockchain technology
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 10);
    const hash = `0x${barcode.split('').map(c => c.charCodeAt(0).toString(16)).join('')}${timestamp.slice(-6)}${randomString}`;
    return hash;
  }

  // Add a new product (manufacturer functionality)
  app.post('/api/products', async (req: Request, res: Response) => {
    try {
      const validatedData = insertProductSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        const errorMessage = fromZodError(validatedData.error).message;
        return res.status(400).json({ 
          message: errorMessage,
          spell: "Confundus!" // Creates confusion
        });
      }
      
      // Generate a blockchain hash for this product
      const blockchainHash = generateBlockchainHash(validatedData.data.barcode);
      
      // Create a product with the validated data and blockchain hash
      const productData = {
        ...validatedData.data,
        blockchainHash
      };
      
      const product = await storage.createProduct(productData);
      
      return res.status(201).json({ 
        message: "Product added successfully",
        product,
        spell: "Securitas Authentica!" // Security spell
      });
    } catch (error) {
      return res.status(500).json({ 
        message: "Error creating product", 
        error: (error as Error).message,
        spell: "Reparo!" // Repairs things
      });
    }
  });

  // Verify product authenticity by barcode or serial number
  app.get('/api/verify/:barcode', async (req: Request, res: Response) => {
    const { barcode } = req.params;
    
    if (!barcode) {
      return res.status(400).json({ 
        message: "Barcode or serial number is required",
        spell: "Accio Barcode!" // Summons items
      });
    }
    
    try {
      console.log(`Verifying product with code: ${barcode}`);
      const product = await storage.getProductByBarcode(barcode);
      
      if (product) {
        console.log(`Product found! Product: ${JSON.stringify(product, null, 2)}`);
        return res.status(200).json({ 
          authentic: true, 
          product,
          message: "This product is authentic!",
          spell: "Veritaserum!" // Truth potion
        });
      } else {
        console.log(`No product found with barcode or serial number: ${barcode}`);
        return res.status(200).json({ 
          authentic: false,
          message: "This product is not authentic or registered!",
          spell: "Flagrante Falsum!" // Detects fakes
        });
      }
    } catch (error) {
      console.error(`Error verifying product: ${(error as Error).message}`);
      return res.status(500).json({ 
        message: "Error verifying product", 
        error: (error as Error).message,
        spell: "Impedimenta!" // Hindrance spell
      });
    }
  });
  
  // Submit a counterfeit report
  app.post('/api/reports', async (req: Request, res: Response) => {
    try {
      const validatedData = insertCounterfeitReportSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        const errorMessage = fromZodError(validatedData.error).message;
        return res.status(400).json({ 
          message: errorMessage,
          spell: "Confundus!" // Creates confusion
        });
      }
      
      const report = await storage.createCounterfeitReport(validatedData.data);
      return res.status(201).json({
        report,
        message: "Your report has been submitted",
        spell: "Protego Consumerum!" // Consumer protection
      });
    } catch (error) {
      return res.status(500).json({ 
        message: "Error submitting report", 
        error: (error as Error).message,
        spell: "Reparo!" // Repairs things
      });
    }
  });
  
  // Get all counterfeit reports
  app.get('/api/reports', async (req: Request, res: Response) => {
    try {
      const search = typeof req.query.search === 'string' ? req.query.search : '';
      const reports = await storage.searchCounterfeitReports(search);
      return res.status(200).json({
        reports,
        spell: "Accio Reports!" // Summons items
      });
    } catch (error) {
      return res.status(500).json({ 
        message: "Error retrieving reports", 
        error: (error as Error).message,
        spell: "Impedimenta!" // Hindrance spell
      });
    }
  });
  
  // Get a specific counterfeit report by ID
  app.get('/api/reports/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          message: "Invalid report ID",
          spell: "Confundus!" // Creates confusion
        });
      }
      
      const report = await storage.getCounterfeitReportById(id);
      
      if (!report) {
        return res.status(404).json({ 
          message: "Report not found",
          spell: "Evanesco!" // Vanishing spell
        });
      }
      
      return res.status(200).json({
        report,
        spell: "Revelio!" // Reveals hidden things
      });
    } catch (error) {
      return res.status(500).json({ 
        message: "Error retrieving report", 
        error: (error as Error).message,
        spell: "Impedimenta!" // Hindrance spell
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
