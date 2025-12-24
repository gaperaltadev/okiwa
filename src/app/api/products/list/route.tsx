import connectionToDatabase from "@/app/backend/database/mongoose";
import { ProductEntity } from "@/app/backend/products/domain/Product.entity";
import { ProductRepository } from "@/app/backend/products/infra/Product.repository";
import { ListParams, ListResponse } from "@/app/common/types";
import { ValidateRequestToken } from "@/app/common/useValidateRequestToken";

export type ListProductsResponse = ListResponse<ProductEntity>;

export type ListProductsRequestBody = ListParams;

export async function POST(request: Request) {
  try {
    const isValid = await ValidateRequestToken(request);
    if (!isValid) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    const requestBody: ListProductsRequestBody = await request.json();

    await connectionToDatabase();
    const repo = new ProductRepository();
    const products = await repo.find(requestBody);
    const count = await repo.count(requestBody);

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
