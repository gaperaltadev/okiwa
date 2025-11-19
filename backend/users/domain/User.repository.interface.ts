import { PageFilter, QueryFilter } from "../../utils/types";
import { UserEntity } from "./User.entity";

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;

  getById(id: string): Promise<UserEntity | null>;

  update(id: string, data: UserEntity): Promise<UserEntity>;

  find(
    pagination: PageFilter,
    queryFilter?: QueryFilter
  ): Promise<UserEntity[]>;

  delete(id: string): Promise<void>;
}
