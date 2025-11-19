import { SaleEntity, PopulatedSaleEntity, ToPersistSale } from "./Sale.entity";

export interface ISaleRepository {
  create(sale: ToPersistSale): Promise<SaleEntity>;

  getById(id: string): Promise<SaleEntity | null>;

  update(id: string, data: SaleEntity): Promise<SaleEntity>;

  find(): Promise<PopulatedSaleEntity[]>;

  delete(id: string): Promise<void>;
}
