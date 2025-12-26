import {
  PostCreateSaleRequestBody,
  PostCreateSaleResponse,
} from "@/app/api/sales/route";
import instance from "@/utils/axios";
import { AxiosResponse } from "axios";

export const postCreateSale = async (
  payload: PostCreateSaleRequestBody
): Promise<AxiosResponse<PostCreateSaleResponse>> => {
  return await instance.post(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/sales`,
    payload
  );
};
