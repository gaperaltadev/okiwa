import {
  PostCreateProductRequestBody,
  PostCreateProductResponse,
} from "@/app/api/products/route";
import instance from "@/utils/axios";
import { AxiosResponse } from "axios";

const postProduct = async (
  payload: PostCreateProductRequestBody
): Promise<AxiosResponse<PostCreateProductResponse>> => {
  return await instance.post<PostCreateProductResponse>("/api/product", {
    ...payload,
  });
};

export default postProduct;
