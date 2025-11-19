import { PipelineStage } from "mongoose";
import {
  SaleEntity,
  PopulatedSaleEntity,
  ToPersistSale,
} from "../domain/Sale.entity";
import { ISaleRepository } from "../domain/Sale.repository.interface";
import { SaleMapper } from "./Sale.mapper";
import { SaleModel } from "./Sale.schema";

export class SaleRepository implements ISaleRepository {
  constructor() {}

  async create(sale: ToPersistSale): Promise<SaleEntity> {
    const createdSale = await SaleModel.create(sale);
    return createdSale;
  }

  async delete(id: string): Promise<void> {
    await SaleModel.findByIdAndDelete(id).exec();
  }

  async find(): Promise<PopulatedSaleEntity[]> {
    // const { page = 1, limit = 10 } = pagination;
    // const skip = (page - 1) * limit;
    // const filters =
    //   queryFilter && queryFilter.filters ? { ...queryFilter.filters } : {};
    // const sortFilter =
    //   queryFilter && queryFilter.sort ? { ...queryFilter.sort } : {
    //     createdAt: 'desc'
    //   };

    // const transformedFilters = this.transformFilters(filters);
    // const transformedSort = this.transformSort(sortFilter);

    // const pipeline = [
    //   { $match: buildQuery(transformedFilters) },
    //   { $sort: {createdAt: 1} },
    //   { $skip: skip },
    //   { $limit: limit },
    // ];

    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: "client",
          localField: "clientId",
          foreignField: "_id",
          as: "client",
        },
      },
      { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
    ];

    return SaleMapper.toDomainArray(await SaleModel.aggregate(pipeline).exec());
  }

  async getById(id: string): Promise<SaleEntity | null> {
    return await SaleModel.findById(id).exec();
  }

  async update(id: string, data: SaleEntity): Promise<SaleEntity> {
    return await SaleModel.findByIdAndUpdate(id, data).exec();
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private transformFilters(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformFilters(item));
    } else if (obj !== null && typeof obj === "object") {
      const newObj: any = {};
      for (const key of Object.keys(obj)) {
        const newKey = key;
        let newValue = obj[key];

        newValue = this.transformFilters(obj[key]);

        newObj[newKey] = newValue;
      }
      return newObj;
    }
    return obj;
  }

  private transformSort(
    sort: Record<string, "asc" | "desc">
  ): Record<string, "asc" | "desc"> {
    const newSort: Record<string, "asc" | "desc"> = {};
    for (const key of Object.keys(sort)) {
      newSort[key] = sort[key];
    }
    return newSort;
  }
}
