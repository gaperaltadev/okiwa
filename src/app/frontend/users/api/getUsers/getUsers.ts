import instance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { GetUsersResponse } from "@/app/api/user/route";

const getUsers = async (): Promise<AxiosResponse<GetUsersResponse>> => {
  return await instance.get<GetUsersResponse>("/api/user");
};

export default getUsers;
