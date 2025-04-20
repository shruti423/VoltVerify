import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Products table for storing authentic products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  barcode: text("barcode").notNull().unique(),
  name: text("name").notNull(),
  manufacturer: text("manufacturer").notNull(),
  serialNumber: text("serial_number").notNull(),
  manufactureDate: text("manufacture_date").notNull(),
  blockchainHash: text("blockchain_hash").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  blockchainHash: true,
});

// Counterfeit reports table for storing reports of fake products
export const counterfeitReports = pgTable("counterfeit_reports", {
  id: serial("id").primaryKey(),
  reportId: text("report_id").notNull().unique(),
  productId: text("product_id").notNull(),
  sellerName: text("seller_name").notNull(),
  purchaseLocation: text("purchase_location").notNull(),
  additionalDetails: text("additional_details"),
  status: text("status").default("Under Investigation"),
  reportDate: timestamp("report_date").defaultNow(),
});

export const insertCounterfeitReportSchema = createInsertSchema(counterfeitReports).omit({
  id: true,
  reportId: true,
  reportDate: true,
  status: true,
});

// Export types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type CounterfeitReport = typeof counterfeitReports.$inferSelect;
export type InsertCounterfeitReport = z.infer<typeof insertCounterfeitReportSchema>;
