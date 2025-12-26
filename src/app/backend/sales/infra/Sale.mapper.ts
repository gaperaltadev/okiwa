import { SaleEntity, PopulatedSaleEntity } from "../domain/Sale.entity";
import { PopulatedSaleDocument, SaleDocument } from "./Sale.document";

export class SaleMapper {
  static toDomain(raw: PopulatedSaleDocument): PopulatedSaleEntity {
    const data = typeof raw.toJSON === "function" ? raw.toJSON() : raw;

    return {
      id: raw._id!.toString(),
      vendorId: data.vendorId,
      saleArticles: data.saleArticles,
      client: {
        id: data.client._id,
        name: data.client.name,
        email: data.client.email,
        phone: data.client.phone,
        address: data.client.address,
      },
      status: data.status,
      deadline: data.deadline,
      notes: data.notes,
      total: data.total,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toPersistence(sale: SaleEntity): SaleDocument {
    return {
      _id: sale.id,
      vendorId: sale.vendorId,
      // articles: sale.articles,
      // clientId: sale.clientId,
      status: sale.status,
      deadline: sale.deadline,
      notes: sale.notes,
      total: sale.total,
    } as SaleDocument;
  }

  static toDomainArray(
    rawArray: PopulatedSaleDocument[]
  ): PopulatedSaleEntity[] {
    return rawArray.map((item) => this.toDomain(item));
  }
}
