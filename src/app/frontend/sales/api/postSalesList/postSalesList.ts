import {
  ListSalesRequestBody,
  ListSalesResponse,
} from "@/app/api/sales/list/route";
import instance from "@/utils/axios";
import { AxiosResponse } from "axios";

export const postSalesList = async (
  payload: ListSalesRequestBody
): Promise<AxiosResponse<ListSalesResponse>> => {
  return await instance.post("/api/sales/list", payload);
};
