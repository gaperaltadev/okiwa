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
}
