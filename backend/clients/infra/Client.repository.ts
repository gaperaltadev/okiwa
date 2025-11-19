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
