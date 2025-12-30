import instance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { DeleteSaleRequestBody } from "@/app/api/sales/route";

const deleteSale = async (
  saleId: string,
  restoreStock: boolean = true
): Promise<AxiosResponse<DeleteSaleRequestBody>> => {
  return await instance.delete<DeleteSaleRequestBody>("/api/sales", {
    data: { saleId, restoreStock },
  });
};

export default deleteSale;
