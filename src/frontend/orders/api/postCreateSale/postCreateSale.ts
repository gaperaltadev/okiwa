import {
  PostCreateSaleRequestBody,
  PostCreateSaleResponse,
} from "@/app/api/sale/route";
import axios, { AxiosResponse } from "axios";

export const postCreateSale = async (
  payload: PostCreateSaleRequestBody
): Promise<AxiosResponse<PostCreateSaleResponse>> => {
  return await axios.post("http://localhost:3000/api/sale", payload);
};
