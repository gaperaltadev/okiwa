import { ProductEntity } from "../domain/Product.entity";
import { ProductDocument } from "./Product.document";

export class ProductMapper {
  static toDomain(raw: ProductDocument): ProductEntity {
    const data = typeof raw.toJSON === "function" ? raw.toJSON() : raw;

    return {
      id: raw._id!.toString(),
      name: data.name,
      sku: data.sku,
      minStock: data.minStock,
      currentStock: data.currentStock,
      category: data.category,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toPersistence(product: ProductEntity): ProductDocument {
    return {
      _id: product.id,
      name: product.name,
      category: product.category,
      sku: product.sku,
      minStock: product.minStock,
      currentStock: product.currentStock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    } as ProductDocument;
  }

  static toDomainArray(rawArray: ProductDocument[]): ProductEntity[] {
    return rawArray.map((item) => this.toDomain(item));
  }
}
