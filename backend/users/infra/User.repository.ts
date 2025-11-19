import { UserEntity, ToPersistUser } from "../domain/User.entity";
import { IUserRepository } from "../domain/User.repository.interface";
import { UserMapper } from "./User.mapper";
import { UserModel } from "./User.schema";

export class UserRepository implements IUserRepository {
  constructor() {}

  async create(user: ToPersistUser): Promise<UserEntity> {
    const createdUser = await UserModel.create(user);
    return createdUser;
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id).exec();
  }

  async find(): Promise<UserEntity[]> {
    return UserMapper.toDomainArray(await UserModel.find());
  }

  async getById(id: string): Promise<UserEntity | null> {
    return UserMapper.toDomain(await UserModel.findById(id).exec());
  }

  async update(id: string, data: UserEntity): Promise<UserEntity> {
    return UserMapper.toDomain(
      await UserModel.findByIdAndUpdate(id, data).exec()
    );
  }
}
