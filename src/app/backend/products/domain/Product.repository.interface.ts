import { ListParams } from "@/app/common/types";
import { ProductEntity } from "./Product.entity";

export interface IProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;

  getById(id: string): Promise<ProductEntity | null>;

  update(id: string, data: ProductEntity): Promise<ProductEntity>;

  find(params: ListParams): Promise<ProductEntity[]>;

  count(params: ListParams): Promise<number>;

  delete(id: string): Promise<void>;
}
