import { 
  products, 
  counterfeitReports, 
  type Product, 
  type InsertProduct, 
  type CounterfeitReport, 
  type InsertCounterfeitReport 
} from "@shared/schema";
import { nanoid } from "nanoid";
import crypto from "crypto";

export interface IStorage {
  // Product operations
  getProductByBarcode(barcode: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct & { blockchainHash: string }): Promise<Product>;
  
  // Counterfeit report operations
  getCounterfeitReports(): Promise<CounterfeitReport[]>;
  getCounterfeitReportById(id: number): Promise<CounterfeitReport | undefined>;
  createCounterfeitReport(report: InsertCounterfeitReport): Promise<CounterfeitReport>;
  searchCounterfeitReports(query: string): Promise<CounterfeitReport[]>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private counterfeitReports: Map<number, CounterfeitReport>;
  private productIdCounter: number;
  private reportIdCounter: number;

  constructor() {
    this.products = new Map();
    this.counterfeitReports = new Map();
    this.productIdCounter = 1;
    this.reportIdCounter = 1;
    
    // Initialize with some sample products for testing
    this.initializeProducts();
  }

  private initializeProducts() {
    // Add a few example products
    const sampleProducts: Array<InsertProduct & { blockchainHash: string }> = [
      {
        barcode: "123456789012",
        name: "Premium Wireless Earbuds",
        manufacturer: "TechSound Inc.",
        serialNumber: "TS-EAR-20220584",
        manufactureDate: "Jan 15, 2023",
        blockchainHash: this.generateBlockchainHash("123456789012"),
      },
      {
        barcode: "A987654321",
        name: "4K Smart TV",
        manufacturer: "VistaDisplay",
        serialNumber: "VD-TV-8K-2023",
        manufactureDate: "Feb 10, 2023",
        blockchainHash: this.generateBlockchainHash("A987654321"),
      },
      {
        barcode: "A123456789",
        name: "Noise-Canceling Headphones",
        manufacturer: "AudioMax",
        serialNumber: "AM-NCH-202301",
        manufactureDate: "Mar 5, 2023",
        blockchainHash: this.generateBlockchainHash("A123456789"),
      }
    ];

    sampleProducts.forEach(product => this.createProduct(product));
  }

  private generateBlockchainHash(barcode: string): string {
    // For demo purposes, we create a deterministic hash
    return "0x" + crypto.createHash('sha256').update(barcode).digest('hex').substring(0, 40);
  }

  // Product methods
  async getProductByBarcode(barcode: string): Promise<Product | undefined> {
    // Use Array.from to avoid TypeScript iterator issues
    const products = Array.from(this.products.values());
    
    console.log(`Searching for product with code: ${barcode}`);
    console.log(`Total products in storage: ${products.length}`);
    
    // Log all products for debugging
    products.forEach((product, index) => {
      console.log(`Product ${index+1}:`, JSON.stringify(product));
    });
    
    // First try exact match on barcode
    let product = products.find(p => p.barcode === barcode);
    if (product) {
      console.log(`Found product by barcode match: ${barcode}`);
      return product;
    }
    
    // Then try exact match on serialNumber
    product = products.find(p => p.serialNumber === barcode);
    if (product) {
      console.log(`Found product by serial number match: ${barcode}`);
      return product;
    }
    
    // If no exact match, try case-insensitive match as fallback
    product = products.find(p => 
      p.barcode.toLowerCase() === barcode.toLowerCase() || 
      p.serialNumber.toLowerCase() === barcode.toLowerCase()
    );
    
    if (product) {
      console.log(`Found product by case-insensitive match: ${barcode}`);
      return product;
    }
    
    console.log(`No product found with barcode or serial number: ${barcode}`);
    return undefined;
  }

  async createProduct(product: InsertProduct & { blockchainHash: string }): Promise<Product> {
    const id = this.productIdCounter++;
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  // Counterfeit report methods
  async getCounterfeitReports(): Promise<CounterfeitReport[]> {
    return Array.from(this.counterfeitReports.values())
      .sort((a, b) => {
        const dateA = a.reportDate ? new Date(a.reportDate).getTime() : 0;
        const dateB = b.reportDate ? new Date(b.reportDate).getTime() : 0;
        return dateB - dateA;
      });
  }

  async getCounterfeitReportById(id: number): Promise<CounterfeitReport | undefined> {
    return this.counterfeitReports.get(id);
  }

  async createCounterfeitReport(report: InsertCounterfeitReport): Promise<CounterfeitReport> {
    const id = this.reportIdCounter++;
    const reportId = `REP-${nanoid(5)}`;
    const reportDate = new Date().toISOString();
    const status = "Under Investigation";
    
    const newReport: CounterfeitReport = { 
      ...report, 
      id, 
      reportId, 
      reportDate, 
      status 
    };
    
    this.counterfeitReports.set(id, newReport);
    return newReport;
  }

  async searchCounterfeitReports(query: string): Promise<CounterfeitReport[]> {
    if (!query) {
      return this.getCounterfeitReports();
    }
    
    const lowercaseQuery = query.toLowerCase();
    
    return Array.from(this.counterfeitReports.values())
      .filter(report => 
        report.productId.toLowerCase().includes(lowercaseQuery) ||
        report.sellerName.toLowerCase().includes(lowercaseQuery) ||
        report.purchaseLocation.toLowerCase().includes(lowercaseQuery) ||
        (report.additionalDetails && report.additionalDetails.toLowerCase().includes(lowercaseQuery))
      )
      .sort((a, b) => {
        const dateA = a.reportDate ? new Date(a.reportDate).getTime() : 0;
        const dateB = b.reportDate ? new Date(b.reportDate).getTime() : 0;
        return dateB - dateA;
      });
  }
}

export const storage = new MemStorage();
