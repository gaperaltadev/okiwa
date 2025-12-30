import {
  ListProductsRequestBody,
  ListProductsResponse,
} from "@/app/api/products/list/route";
import instance from "@/utils/axios";
import { AxiosResponse } from "axios";

const postAvailableProductsList = async (
  payload: Omit<ListProductsRequestBody, "onlyAvailable">
): Promise<AxiosResponse<ListProductsResponse>> => {
  return await instance.post<ListProductsResponse>("/api/products/list", {
    ...payload,
    onlyAvailable: true,
  });
};

export default postAvailableProductsList;
