import { ProductEntity, ToPersistProduct } from "../domain/Product.entity";
import { IProductRepository } from "../domain/Product.repository.interface";
import { ProductMapper } from "./Product.mapper";
import { ProductModel } from "./Product.schema";

export class ProductRepository implements IProductRepository {
  constructor() {}

  async create(product: ToPersistProduct): Promise<ProductEntity> {
    const createdProduct = await ProductModel.create(product);
    return createdProduct;
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }

  async find(): Promise<ProductEntity[]> {
    return ProductMapper.toDomainArray(await ProductModel.find());
  }

  async getById(id: string): Promise<ProductEntity | null> {
    return ProductMapper.toDomain(await ProductModel.findById(id).exec());
  }

  async update(id: string, data: ProductEntity): Promise<ProductEntity> {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        ProductMapper.toPersistence(data)
      );

      return ProductMapper.toDomain(updatedProduct);
    } catch (err) {
      console.log("Error updating product", { err });
      throw err;
    }
  }
}
