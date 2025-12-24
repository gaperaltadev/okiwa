import { ClientEntity } from "../domain/Client.entity";
import { ClientDocument } from "./Client.document";

export class ClientMapper {
  static toDomain(raw: ClientDocument): ClientEntity {
    const data = typeof raw.toJSON === "function" ? raw.toJSON() : raw;

    return {
      id: raw._id!.toString(),
      name: data.name,
      document: data.document,
      phone: data.phone,
      email: data.email,
      address: data.address,
      createdBy: data.createdBy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toPersistence(client: ClientEntity): ClientDocument {
    return {
      _id: client.id,
      name: client.name,
      document: client.document,
      phone: client.phone,
      email: client.email,
      address: client.address,
      createdBy: client.createdBy,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    } as ClientDocument;
  }

  static toDomainArray(rawArray: ClientDocument[]): ClientEntity[] {
    return rawArray.map((item) => this.toDomain(item));
  }
}
