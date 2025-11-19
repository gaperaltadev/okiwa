import connectionToDatabase from "../../../../backend/database/mongoose";
import {
  SaleEntity,
  SaleStatusTypes,
} from "../../../../backend/sales/domain/Sale.entity";
import { SaleRepository } from "../../../../backend/sales/infra/Sale.repository";

export async function GET(request: Request) {
  console.log("GET request made ", { request });

  try {
    await connectionToDatabase();
    const repo = new SaleRepository();
    const sales = await repo.find();
    return Response.json(sales);
  } catch (err) {
    console.log("fokin error ", { err });
    return Response.json({
      message: "Something went wrong while GET Sales",
    });
  }
}

export type PostCreateSaleRequestBody = {
  clientId: string;
  saleArticles: {
    articleId: string;
    quantity: number;
    unitPrice: number;
    total?: number;
  }[];
  status: SaleStatusTypes;
  total?: number;
  notes?: string;
  deadline?: number;
};

export type PostCreateSaleResponse = SaleEntity;

export async function POST(request: Request) {
  try {
    await connectionToDatabase();

    const body: PostCreateSaleRequestBody = await request.json();

    const repo = new SaleRepository();
    const createdSale: PostCreateSaleResponse = await repo.create(body);

    return Response.json(createdSale);
  } catch (err) {
    console.log("GET sales error ", { err });
    return Response.json(
      {
        message: "Something went wrong while POST Sale",
      },
      {
        status: 500,
      }
    );
  }
}
