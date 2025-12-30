import mongoose, { Schema } from "mongoose";
import { SaleDocument } from "./Sale.document";
import { SaleStatusTypes } from "../domain/Sale.entity";

const SaleSchema = new Schema<SaleDocument>(
  {
    clientId: { type: Schema.Types.ObjectId, required: true, ref: "client" },
    vendorId: { type: Schema.Types.String, required: true },
    saleArticles: [
      {
        articleId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
        articleName: { type: String, required: false },
        quantity: { type: Number, required: true, default: 1 },
        unitPrice: { type: Number, required: true },
        total: { type: Number, required: false },
      },
    ],
    status: {
      type: String,
      enum: SaleStatusTypes,
      default: SaleStatusTypes.PENDING,
      required: true,
    },
    deleted: { type: Boolean, required: false },
    notes: { type: String, required: false },
    deadline: { type: Number, required: false },
    createdAt: { type: Number, required: false, default: Date.now() },
    updatedAt: { type: Number, required: false, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

export const SaleModel =
  mongoose.models.sale ||
  mongoose.model<SaleDocument>("sale", SaleSchema, "sale");
