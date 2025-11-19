import { CategoryEntity } from "../domain/Category.entity";
import { ICategoryRepository } from "../domain/Category.repository.interface";
import { CategoryModel } from "./Category.schema";

export class CategoryRepository implements ICategoryRepository {
  constructor() {}

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    const createdCategory = await CategoryModel.create(category);
    return createdCategory;
  }

  async delete(id: string): Promise<void> {
    await CategoryModel.findByIdAndDelete(id).exec();
  }

  async find(): Promise<CategoryEntity[]> {
    return await CategoryModel.find();
  }

  async getById(id: string): Promise<CategoryEntity | null> {
    return await CategoryModel.findById(id).exec();
  }

  async update(id: string, data: CategoryEntity): Promise<CategoryEntity> {
    return await CategoryModel.findByIdAndUpdate(id, data).exec();
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
