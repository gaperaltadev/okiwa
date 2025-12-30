import instance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { DeleteProductRequestBody } from "@/app/api/products/route";

const deleteProduct = async (
  productId: string
): Promise<AxiosResponse<DeleteProductRequestBody>> => {
  return await instance.delete<DeleteProductRequestBody>("/api/products", {
    data: { productId },
  });
};

export default deleteProduct;
