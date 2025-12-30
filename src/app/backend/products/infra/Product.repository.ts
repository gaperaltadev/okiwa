import { ListParams, QueryFilter } from "@/app/common/types";
import { ProductEntity, ToPersistProduct } from "../domain/Product.entity";
import { IProductRepository } from "../domain/Product.repository.interface";
import { ProductMapper } from "./Product.mapper";
import { ProductModel } from "./Product.schema";
import { PipelineStage } from "mongoose";

export class ProductRepository implements IProductRepository {
  constructor() {}

  async count(params: ListParams): Promise<number> {
    const { onlyAvailable } = params;
    const queryFilter = params.queryFilter || {};

    const matchFilters = this.buildFilters(queryFilter.filters);

    if (onlyAvailable) {
      matchFilters.currentStock = { $gt: 0 };
    }

    const pipeline: PipelineStage[] = [
      { $match: matchFilters },
      { $count: "total" },
    ];
    const [result] = await ProductModel.aggregate(pipeline).exec();
    return result?.total || 0;
  }

  async create(
    product: ToPersistProduct,
    userId: string
  ): Promise<ProductEntity> {
    const createdProduct = await ProductModel.create({ ...product, userId });
    return createdProduct;
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }

  async find(params: ListParams): Promise<ProductEntity[]> {
    const { page = 1, limit = 10, onlyAvailable } = params;
    const skip = (page - 1) * limit;

    const queryFilter = params.queryFilter || {};
    const sort = params.queryFilter.sort || { createdAt: -1 };

    const matchFilters = this.buildFilters(queryFilter.filters);

    // Add stock filter if onlyAvailable is true
    if (onlyAvailable) {
      matchFilters.currentStock = { $gt: 0 };
    }

    const pipeline: PipelineStage[] = [
      { $match: matchFilters },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit },
    ];

    return ProductMapper.toDomainArray(
      await ProductModel.aggregate(pipeline).exec()
    );
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

  private buildFilters(filters?: QueryFilter[]) {
    if (!filters) return {};

    const matchStage: { [key: string]: string | number | boolean | object } =
      {};
    for (const filter of filters) {
      switch (filter.operator) {
        case "eq":
          matchStage[filter.field] = filter.value;
          break;
        case "ne":
          matchStage[filter.field] = { $ne: filter.value };
          break;
        case "lt":
          matchStage[filter.field] = { $lt: filter.value };
          break;
        case "lte":
          matchStage[filter.field] = { $lte: filter.value };
          break;
        case "gt":
          matchStage[filter.field] = { $gt: filter.value };
          break;
        case "gte":
          matchStage[filter.field] = { $gte: filter.value };
          break;
        case "in":
          matchStage[filter.field] = { $in: filter.value };
          break;
        case "nin":
          matchStage[filter.field] = { $nin: filter.value };
          break;
        case "regex":
          matchStage[filter.field] = { $regex: filter.value, $options: "i" };
          break;
        default:
          break;
      }
    }

    return matchStage;
  }
}
