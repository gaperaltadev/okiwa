import { ResponseGetClients } from "@/app/api/client/route";
import axios, { AxiosResponse } from "axios";

const getClients = async (): Promise<AxiosResponse<ResponseGetClients>> => {
  return await axios.get<ResponseGetClients>(
    `${process.env.BASE_PATH}api/client`
  );
};

export default getClients;
