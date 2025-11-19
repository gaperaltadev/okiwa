import { UserEntity } from "./User.entity";

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;

  getById(id: string): Promise<UserEntity | null>;

  update(id: string, data: UserEntity): Promise<UserEntity>;

  find(): Promise<UserEntity[]>;

  delete(id: string): Promise<void>;
}
