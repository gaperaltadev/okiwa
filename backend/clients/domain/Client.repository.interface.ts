import { PageFilter, QueryFilter } from "../../utils/types";
import { ClientEntity } from "./Client.entity";

export interface IClientRepository {
  create(client: ClientEntity): Promise<ClientEntity>;

  getById(id: string): Promise<ClientEntity | null>;

  update(id: string, data: ClientEntity): Promise<ClientEntity>;

  find(
    pagination: PageFilter,
    queryFilter?: QueryFilter
  ): Promise<ClientEntity[]>;

  delete(id: string): Promise<void>;
}
