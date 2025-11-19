import { Document } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  createdAt?: number;
  updatedAt?: number;
}
