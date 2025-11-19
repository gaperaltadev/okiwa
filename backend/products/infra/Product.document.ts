import { Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  category?: string;
  createdAt?: number;
  updatedAt?: number;
}
