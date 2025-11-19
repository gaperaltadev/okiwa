export interface ClientEntity {
  id: string;
  name: string;
  document?: string;
  phone?: string;
  email?: string;
  address?: string;
  createdBy?: string;
  createdAt?: number;
  updatedAt?: number;
}

export type ToPersistClient = Omit<ClientEntity, "id">;
