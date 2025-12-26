import mongoose, { Schema } from "mongoose";
import { ClientDocument } from "./Client.document";

const ClientSchema = new Schema<ClientDocument>(
  {
    document: { type: String, required: false },
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
    createdAt: { type: Number, required: false },
    updatedAt: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

export const ClientModel =
  mongoose.models.client ||
  mongoose.model<ClientDocument>("client", ClientSchema, "client");
