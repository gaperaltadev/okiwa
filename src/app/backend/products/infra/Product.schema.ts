import mongoose, { Schema } from "mongoose";
import { ProductDocument } from "./Product.document";

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    sku: { type: String, required: false },
    minStock: { type: Number, required: false },
    currentStock: { type: Number, required: false },
    category: { type: String, required: false },
    createdAt: { type: Number, required: false },
    updatedAt: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

export const ProductModel =
  mongoose.models.product ||
  mongoose.model<ProductDocument>("product", ProductSchema, "product");
