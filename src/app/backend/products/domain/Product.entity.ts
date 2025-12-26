export interface ProductEntity {
  id: string;
  name: string;
  sku?: string;
  minStock?: number;
  currentStock?: number;
  category?: string;
  createdAt?: number;
  updatedAt?: number;
}

export enum ProductCategory {
  SERVICE = "service",
  REFILL = "refill",
  KIT = "kit",
  GUAMPA = "guampa",
  BOMBILLA = "bombilla",
}

export type ToPersistProduct = Omit<ProductEntity, "id">;
