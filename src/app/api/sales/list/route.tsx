import connectionToDatabase from "@/app/backend/database/mongoose";
import { SaleEntity } from "@/app/backend/sales/domain/Sale.entity";
import { SaleRepository } from "@/app/backend/sales/infra/Sale.repository";
import { ListParams, ListResponse } from "@/app/common/types";
import { ValidateRequestToken } from "@/app/common/useValidateRequestToken";

export type ListSalesResponse = ListResponse<SaleEntity>;

export type ListSalesRequestBody = ListParams;

export async function POST(request: Request) {
  try {
    const { isValid, userData } = await ValidateRequestToken(request);
    if (!isValid) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    if (!userData?.id) {
      return Response.json(
        { message: "No autorizado - User data missing" },
        { status: 401 }
      );
    }

    const requestBody: ListSalesRequestBody = await request.json();

    const listParams: ListParams = {
      ...requestBody,
      queryFilter: {
        ...requestBody.queryFilter,
        filters: [
          ...(requestBody?.queryFilter?.filters || []),
          { operator: "eq", field: "vendorId", value: userData?.id },
        ],
      },
    };

    await connectionToDatabase();

    const repo = new SaleRepository();
    const sales = await repo.find(listParams);
    const count = await repo.count(listParams);

    const totalPages = Math.ceil(count / (requestBody.limit || 10));

    const response: ListSalesResponse = {
      items: sales,
      totalCount: count,
      totalPages: totalPages,
      currentPage: requestBody.page || 1,
    };

    return Response.json(response, { status: 200 });
  } catch (err) {
    console.log("fokin error ", { err });
    return Response.json({
      message: "Something went wrong while GET Sales",
    });
  }
}
