import { ResponseGetClients } from "@/app/api/client/route";
import axios, { AxiosResponse } from "axios";

const getClients = async (): Promise<AxiosResponse<ResponseGetClients>> => {
  return await axios.get<ResponseGetClients>(
    "http://localhost:3000/api/client"
  );
};

export default getClients;
