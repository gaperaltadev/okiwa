import { ProductEntity } from "./Product.entity";

export interface IProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;

  getById(id: string): Promise<ProductEntity | null>;

  update(id: string, data: ProductEntity): Promise<ProductEntity>;

  find(): Promise<ProductEntity[]>;

  delete(id: string): Promise<void>;
}
