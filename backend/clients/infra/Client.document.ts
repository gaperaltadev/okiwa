import { Document, Types } from "mongoose";

export interface ClientDocument extends Document {
  name: string;
  document?: string;
  phone?: string;
  email?: string;
  address?: string;
  createdBy?: Types.ObjectId;
  createdAt?: number;
  updatedAt?: number;
}
