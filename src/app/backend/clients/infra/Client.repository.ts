import { ClientEntity, ToPersistClient } from "../domain/Client.entity";
import { IClientRepository } from "../domain/Client.repository.interface";
import { ClientMapper } from "./Client.mapper";
import { ClientModel } from "./Client.schema";

export class ClientRepository implements IClientRepository {
  constructor() {}

  async create(client: ToPersistClient): Promise<ClientEntity> {
    const createdClient = await ClientModel.create(client);
    return createdClient;
  }

  async delete(id: string): Promise<void> {
    await ClientModel.findByIdAndDelete(id).exec();
  }

  async find(): Promise<ClientEntity[]> {
    return ClientMapper.toDomainArray(await ClientModel.find());
  }

  async getById(id: string): Promise<ClientEntity | null> {
    return ClientMapper.toDomain(await ClientModel.findById(id).exec());
  }

  async update(id: string, data: ClientEntity): Promise<ClientEntity> {
    return ClientMapper.toDomain(
      await ClientModel.findByIdAndUpdate(id, data).exec()
    );
  }
}
