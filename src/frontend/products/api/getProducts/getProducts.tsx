import { GetProductsResponse } from "@/app/api/product/route";
import axios, { AxiosResponse } from "axios";

const getProducts = async (): Promise<AxiosResponse<GetProductsResponse>> => {
  return await axios.get<GetProductsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/product`
  );
};

export default getProducts;
