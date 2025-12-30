import { ValidateRequestToken } from "@/app/common/useValidateRequestToken";
import connectionToDatabase from "../../backend/database/mongoose";
import {
  SaleEntity,
  SaleStatusTypes,
} from "../../backend/sales/domain/Sale.entity";
import { SaleRepository } from "../../backend/sales/infra/Sale.repository";

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

    await connectionToDatabase();

    const body: PostCreateSaleRequestBody = await request.json();

    const repo = new SaleRepository();
    const createdSale: PostCreateSaleResponse = await repo.create(
      body,
      userData.id
    );

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

export type DeleteSaleRequestBody = {
  saleId: string;
  restoreStock?: boolean;
};

export async function DELETE(request: Request) {
  try {
    const { isValid } = await ValidateRequestToken(request);
    if (!isValid) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectionToDatabase();

    const body: DeleteSaleRequestBody = await request.json();

    if (!body.saleId) {
      return Response.json(
        { message: "Sale ID is required for deletion" },
        { status: 400 }
      );
    }

    const repo = new SaleRepository();
    await repo.delete(body.saleId, body.restoreStock ?? true);

    return new Response(null, { status: 204 });
  } catch (err) {
    console.log("error on DELETE sale", { err });
    return Response.json(
      {
        message: "Something went wrong while DELETE Sale",
      },
      {
        status: 500,
      }
    );
  }
}
