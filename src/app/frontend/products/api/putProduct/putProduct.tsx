import {
  PutUpdateProductRequestBody,
  PutUpdateProductResponse,
} from "@/app/api/products/route";
import instance from "@/utils/axios";
import { AxiosResponse } from "axios";

const putProduct = async (
  payload: PutUpdateProductRequestBody
): Promise<AxiosResponse<PutUpdateProductResponse>> => {
  return await instance.put<PutUpdateProductResponse>("/api/products", {
    ...payload,
  });
};

export default putProduct;
