export enum SaleStatusTypes {
  PENDING = "PENDING",
  DELIVERED = "DELIVERED",
  PAID = "PAID",
  HALF_PAID = "HALF_PAID",
  CANCELLED = "CANCELLED",
}

export type ArticleType = {
  id: string;
  name: string;
};

export interface SaleEntity {
  id?: string;
  client: {
    id: string;
    name: string;
  };
  saleArticles: {
    article: ArticleType;
    quantity: number;
    unitPrice: number;
    total?: number;
  }[];
  total?: number;
  status: SaleStatusTypes;
  notes?: string;
  deadline?: number;
  createdAt?: number;
  updatedAt?: number;
}

export type PopulatedSaleEntity = Omit<SaleEntity, "clientId"> & {
  client: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
};

export type ToPersistSale = {
  clientId: string;
  saleArticles: {
    articleId: string;
    quantity: number;
    unitPrice: number;
    total?: number;
  }[];
  total?: number;
  status: SaleStatusTypes;
  notes?: string;
  deadline?: number;
};
