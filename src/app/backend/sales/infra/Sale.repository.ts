import { PipelineStage } from "mongoose";
import {
  SaleEntity,
  PopulatedSaleEntity,
  ToPersistSale,
} from "../domain/Sale.entity";
import { ISaleRepository } from "../domain/Sale.repository.interface";
import { SaleMapper } from "./Sale.mapper";
import { SaleModel } from "./Sale.schema";
import { ListParams, QueryFilter } from "@/app/common/types";

export class SaleRepository implements ISaleRepository {
  constructor() {}

  async create(sale: ToPersistSale, vendorId: string): Promise<SaleEntity> {
    const createdSale = await SaleModel.create({ ...sale, vendorId });
    return createdSale;
  }

  async delete(id: string): Promise<void> {
    await SaleModel.findByIdAndDelete(id).exec();
  }

  async count(params: ListParams): Promise<number> {
    const queryFilter = params.queryFilter || {};

    const pipeline: PipelineStage[] = [
      { $match: this.buildFilters(queryFilter.filters) },
      { $count: "total" },
    ];
    const [result] = await SaleModel.aggregate(pipeline).exec();
    return result?.total || 0;
  }

  async find(params: ListParams): Promise<PopulatedSaleEntity[]> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const queryFilter = params.queryFilter || {};
    const sort = params.queryFilter.sort || { createdAt: -1 };

    const pipeline: PipelineStage[] = [
      { $match: this.buildFilters(queryFilter.filters) },
      {
        $lookup: {
          from: "client",
          localField: "clientId",
          foreignField: "_id",
          as: "client",
        },
      },
      { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit },
    ];

    return SaleMapper.toDomainArray(await SaleModel.aggregate(pipeline).exec());
  }

  async getById(id: string): Promise<SaleEntity | null> {
    return await SaleModel.findById(id).exec();
  }

  async update(id: string, data: SaleEntity): Promise<SaleEntity> {
    return await SaleModel.findByIdAndUpdate(id, data).exec();
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
