import { ProductEntity } from "../domain/Product.entity";
import { ProductDocument } from "./Product.document";

export class ProductMapper {
  static toDomain(raw: ProductDocument): ProductEntity {
    const data = typeof raw.toJSON === "function" ? raw.toJSON() : raw;

    return {
      id: raw._id!.toString(),
      name: data.name,
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
    } as ProductDocument;
  }

  static toDomainArray(rawArray: ProductDocument[]): ProductEntity[] {
    return rawArray.map((item) => this.toDomain(item));
  }
}
