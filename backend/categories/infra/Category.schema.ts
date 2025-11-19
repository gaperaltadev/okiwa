import mongoose, { Schema } from "mongoose";
import { CategoryDocument } from "./Category.document";

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true },
    createdAt: { type: Number, required: false },
    updatedAt: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel =
  mongoose.models.category ||
  mongoose.model<CategoryDocument>("category", CategorySchema, "category");
