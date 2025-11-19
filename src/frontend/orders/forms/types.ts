import { OrderStatusTypes } from "../../../../backend/sales/domain/Sale.entity";

export type OrderFormType = {
  client: {
    id: string;
    name: string;
  };
  articles: ArticleFormType[];
  status: OrderStatusTypes;
  notes?: string;
  deadline?: string;
};

export type ArticleFormType = {
  article: {
    id: string;
    name: string;
  };
  quantity: number;
  unitPrice: number;
  total?: number;
};
