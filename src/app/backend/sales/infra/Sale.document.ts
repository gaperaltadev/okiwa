import { Document, Types } from "mongoose";
import { SaleStatusTypes } from "../domain/Sale.entity";

export interface ArticleDocument extends Document {
  articleId: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface SaleDocument extends Document {
  clientId: Types.ObjectId;
  saleArticles: ArticleDocument[];
  status: SaleStatusTypes;
  deleted?: boolean;
  notes?: string;
  total?: number;
  deadline?: number;
  createdAt: number;
  updatedAt: number;
}

export interface PopulatedSaleDocument extends Document {
  client: {
    _id: Types.ObjectId;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  saleArticles: ArticleDocument[];
  status: SaleStatusTypes;
  deleted?: boolean;
  notes?: string;
  total?: number;
  deadline?: number;
  createdAt: number;
  updatedAt: number;
}
