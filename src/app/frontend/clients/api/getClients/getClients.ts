import { ResponseGetClients } from "@/app/api/client/route";
import instance from "@/utils/axios";
import { AxiosResponse } from "axios";

const getClients = async (): Promise<AxiosResponse<ResponseGetClients>> => {
  return await instance.get<ResponseGetClients>(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/client`
  );
};

export default getClients;
