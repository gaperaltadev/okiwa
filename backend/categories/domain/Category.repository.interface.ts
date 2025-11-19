import { CategoryEntity } from "./Category.entity";

export interface ICategoryRepository {
  create(category: CategoryEntity): Promise<CategoryEntity>;

  getById(id: string): Promise<CategoryEntity | null>;

  update(id: string, data: CategoryEntity): Promise<CategoryEntity>;

  find(): Promise<CategoryEntity[]>;

  delete(id: string): Promise<void>;
}
