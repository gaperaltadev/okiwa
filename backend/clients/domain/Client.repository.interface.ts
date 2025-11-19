import { ClientEntity } from "./Client.entity";

export interface IClientRepository {
  create(client: ClientEntity): Promise<ClientEntity>;

  getById(id: string): Promise<ClientEntity | null>;

  update(id: string, data: ClientEntity): Promise<ClientEntity>;

  find(): Promise<ClientEntity[]>;

  delete(id: string): Promise<void>;
}
