import { ListParams } from "@/app/common/types";
import { SaleEntity, PopulatedSaleEntity, ToPersistSale } from "./Sale.entity";

export interface ISaleRepository {
  create(sale: ToPersistSale, vendorId: string): Promise<SaleEntity>;

  getById(id: string): Promise<SaleEntity | null>;

  find(params: ListParams): Promise<PopulatedSaleEntity[]>;

  count(params: ListParams): Promise<number>;

  delete(id: string, restoreStock: boolean): Promise<void>;
}
