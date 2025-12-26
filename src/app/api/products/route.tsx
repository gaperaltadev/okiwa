import connectionToDatabase from "../../backend/database/mongoose";
import { ProductEntity } from "../../backend/products/domain/Product.entity";
import { ProductRepository } from "../../backend/products/infra/Product.repository";
import { ValidateRequestToken } from "@/app/common/useValidateRequestToken";

export type PostCreateProductRequestBody = {
  name: string;
  category?: string;
};

export type PostCreateProductResponse = ProductEntity;

export async function POST(request: Request) {
  try {
    const { isValid, userData } = await ValidateRequestToken(request);
    if (!isValid) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    if (!userData?.id) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectionToDatabase();

    const body: PostCreateProductRequestBody = await request.json();

    const repo = new ProductRepository();
    const createdProduct: PostCreateProductResponse = await repo.create(
      body,
      userData?.id
    );

    return Response.json(createdProduct);
  } catch (err) {
    console.log("error on POST produtct", { err });
    return Response.json(
      {
        message: "Something went wrong while POST Product",
      },
      {
        status: 500,
      }
    );
  }
}

export type PutUpdateProductRequestBody = {
  id: string;
  name: string;
  category?: string;
  sku?: string;
  minStock?: number;
  currentStock?: number;
};

export type PutUpdateProductResponse = ProductEntity;

export async function PUT(request: Request) {
  try {
    const { isValid } = await ValidateRequestToken(request);
    if (!isValid) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectionToDatabase();

    const body: PutUpdateProductRequestBody = await request.json();

    const repo = new ProductRepository();
    const updatedProduct: PutUpdateProductResponse = await repo.update(
      body.id,
      body
    );

    return Response.json(updatedProduct);
  } catch (err) {
    console.log("error on PUT produtct", { err });
    return Response.json(
      {
        message: "Something went wrong while PUT Product",
      },
      {
        status: 500,
      }
    );
  }
}

export type DeleteProductRequestBody = {
  productId: string;
};

export async function DELETE(request: Request) {
  try {
    const { isValid } = await ValidateRequestToken(request);
    if (!isValid) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectionToDatabase();

    const body: DeleteProductRequestBody = await request.json();

    if (!body.productId) {
      return Response.json(
        { message: "Product ID is required for deletion" },
        { status: 400 }
      );
    }

    const repo = new ProductRepository();
    await repo.delete(body.productId);

    return new Response(null, { status: 204 });
  } catch (err) {
    console.log("error on DELETE produtct", { err });
    return Response.json(
      {
        message: "Something went wrong while DELETE Product",
      },
      {
        status: 500,
      }
    );
  }
}
