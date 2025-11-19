export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type ToPersistUser = Omit<UserEntity, "id">;
