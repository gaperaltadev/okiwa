import { PipelineStage } from "mongoose";
import mongoose from "mongoose";
import {
  SaleEntity,
  PopulatedSaleEntity,
  ToPersistSale,
  SaleStatusTypes,
} from "../domain/Sale.entity";
import { ISaleRepository } from "../domain/Sale.repository.interface";
import { SaleMapper } from "./Sale.mapper";
import { SaleModel } from "./Sale.schema";
import { ListParams, QueryFilter } from "@/app/common/types";
import { ProductModel } from "../../products/infra/Product.schema";

export class SaleRepository implements ISaleRepository {
  constructor() {}

  async create(sale: ToPersistSale, vendorId: string): Promise<SaleEntity> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      for (const article of sale.saleArticles) {
        const product = await ProductModel.findById(article.articleId).session(
          session
        );

        if (!product) {
          throw new Error(`Product with ID ${article.articleId} not found`);
        }

        const availableStock = product.currentStock || 0;

        if (availableStock < article.quantity) {
          throw new Error(
            `Insufficient stock for ${product.name}. Available: ${availableStock}, Requested: ${article.quantity}`
          );
        }

        const newStock = availableStock - article.quantity;
        if (product.minStock && newStock < product.minStock) {
          console.warn(
            `Warning: ${product.name} stock will fall below minimum. New stock: ${newStock}, Min stock: ${product.minStock}`
          );
        }
      }

      const createdSale = await SaleModel.create([{ ...sale, vendorId }], {
        session,
      });

      if (sale.status !== SaleStatusTypes.CANCELLED) {
        for (const article of sale.saleArticles) {
          await ProductModel.findByIdAndUpdate(
            article.articleId,
            { $inc: { currentStock: -article.quantity } },
            { session, new: true }
          );
        }
      }

      await session.commitTransaction();
      return createdSale[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async delete(id: string, restoreStock: boolean): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const sale = await SaleModel.findById(id).session(session);

      if (!sale) {
        throw new Error(`Sale with ID ${id} not found`);
      }

      if (restoreStock) {
        for (const article of sale.saleArticles) {
          await ProductModel.findByIdAndUpdate(
            article.articleId,
            { $inc: { currentStock: article.quantity } },
            { session, new: true }
          );
        }
      }

      // 3. Delete the sale
      await SaleModel.findByIdAndDelete(id).session(session);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
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
      {
        $unwind: {
          path: "$saleArticles",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "product",
          localField: "saleArticles.articleId",
          foreignField: "_id",
          as: "articleDetails",
        },
      },
      {
        $addFields: {
          "saleArticles.articleName": {
            $arrayElemAt: ["$articleDetails.name", 0],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          vendorId: { $first: "$vendorId" },
          client: { $first: "$client" },
          saleArticles: { $push: "$saleArticles" },
          status: { $first: "$status" },
          notes: { $first: "$notes" },
          total: { $first: "$total" },
          deadline: { $first: "$deadline" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          deleted: { $first: "$deleted" },
        },
      },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit },
    ];
    const sales = await SaleModel.aggregate(pipeline).exec();
    console.log("i wanna see pipeline ", {
      pipeString: JSON.stringify(pipeline),
    });
    return SaleMapper.toDomainArray(sales);
  }

  async getById(id: string): Promise<SaleEntity | null> {
    return await SaleModel.findById(id).exec();
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
