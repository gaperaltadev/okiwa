import mongoose, { Schema } from "mongoose";
import { ProductDocument } from "./Product.document";

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
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
