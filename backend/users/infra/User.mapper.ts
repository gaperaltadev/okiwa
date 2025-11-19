import { UserEntity } from "../domain/User.entity";
import { UserDocument } from "./User.document";

export class UserMapper {
  static toDomain(raw: UserDocument): UserEntity {
    const data = typeof raw.toJSON === "function" ? raw.toJSON() : raw;

    return {
      id: raw._id!.toString(),
      name: data.name,
      email: data.email,
      password: data.password,
    };
  }

  static toPersistence(user: UserEntity): UserDocument {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    } as UserDocument;
  }

  static toDomainArray(rawArray: UserDocument[]): UserEntity[] {
    return rawArray.map((item) => this.toDomain(item));
  }
}
