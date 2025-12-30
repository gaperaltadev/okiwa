import connectionToDatabase from "@/app/backend/database/mongoose";
import { ProductEntity } from "@/app/backend/products/domain/Product.entity";
import { ProductRepository } from "@/app/backend/products/infra/Product.repository";
import { ListParams, ListResponse } from "@/app/common/types";
import { ValidateRequestToken } from "@/app/common/useValidateRequestToken";

export type ListProductsResponse = ListResponse<ProductEntity>;

export type ListProductsRequestBody = ListParams;

export async function POST(request: Request) {
  try {
    const { isValid, userData } = await ValidateRequestToken(request);
    if (!isValid) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    if (!userData?.id) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    const requestBody: ListProductsRequestBody = await request.json();

    await connectionToDatabase();
    const repo = new ProductRepository();

    const listParams: ListParams = {
      ...requestBody,
      queryFilter: {
        ...requestBody.queryFilter,
        filters: [
          ...(requestBody?.queryFilter?.filters || []),
          { operator: "eq", field: "userId", value: userData?.id },
        ],
      },
      onlyAvailable: requestBody.onlyAvailable,
    };

    const products = await repo.find(listParams);
    const count = await repo.count(listParams);

    const totalPages = Math.ceil(count / (requestBody.limit || 10));

    const response: ListProductsResponse = {
      items: products,
      totalCount: count,
      totalPages: totalPages,
      currentPage: requestBody.page || 1,
    };

    return Response.json(response);
  } catch (err) {
    console.log("error on GET products", { err });
    return Response.json({
      message: "Something went wrong while GET Products",
    });
  }
}
