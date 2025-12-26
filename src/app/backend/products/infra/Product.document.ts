import { Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  sku?: string;
  minStock?: number;
  currentStock?: number;
  category?: string;
  createdAt?: number;
  updatedAt?: number;
}
