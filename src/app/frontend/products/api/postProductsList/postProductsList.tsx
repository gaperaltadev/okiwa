import {
  ListProductsRequestBody,
  ListProductsResponse,
} from "@/app/api/products/list/route";
import instance from "@/utils/axios";
import { AxiosResponse } from "axios";

const postProductsList = async (
  payload: ListProductsRequestBody
): Promise<AxiosResponse<ListProductsResponse>> => {
  return await instance.post<ListProductsResponse>(
    "/api/products/list",
    payload
  );
};

export default postProductsList;
