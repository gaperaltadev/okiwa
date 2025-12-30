import { SaleEntity, PopulatedSaleEntity } from "../domain/Sale.entity";
import {
  SaleDocument,
  AggregatedSale,
  AggregatedArticle,
} from "./Sale.document";

export class SaleMapper {
  static toDomain(raw: AggregatedSale): PopulatedSaleEntity {
    console.log("mapping sale ", { rawString: JSON.stringify(raw) });
    return {
      id: raw._id?.toString() || "",
      vendorId: raw.vendorId,
      saleArticles: (raw.saleArticles || []).map(
        (article: AggregatedArticle) => ({
          article: {
            id: article.articleId?.toString() || "",
            name: article.articleName || "",
          },
          quantity: article.quantity,
          unitPrice: article.unitPrice || 0,
          total: article.total || 0,
        })
      ),
      client: {
        id: raw.client?._id?.toString() || "",
        name: raw.client?.name || "",
        email: raw.client?.email,
        phone: raw.client?.phone,
        address: raw.client?.address,
      },
      status: raw.status,
      deadline: raw.deadline,
      notes: raw.notes,
      total: raw.total || 0,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
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

  static toDomainArray(rawArray: AggregatedSale[]): PopulatedSaleEntity[] {
    return rawArray.map((item) => this.toDomain(item));
  }
}
