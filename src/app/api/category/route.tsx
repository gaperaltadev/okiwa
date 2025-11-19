import { CategoryEntity } from "../../../../backend/categories/domain/Category.entity";
import { CategoryRepository } from "../../../../backend/categories/infra/Category.repository";
import connectionToDatabase from "../../../../backend/database/mongoose";

export async function GET(request: Request) {
  console.log("GET request made ", { request });

  try {
    await connectionToDatabase();
    const repo = new CategoryRepository();
    const categorys = await repo.find({});
    console.log("categorys ", { categorys });
    return Response.json(categorys);
  } catch (err) {
    console.log("fokin error ", { err });
    return Response.json({
      message: "Something went wrong while GET Categorys",
    });
  }
}

export type PostCreateCategoryRequestBody = {
  id?: string;
  slug?: string;
  name: string;
  createdAt?: number;
  updatedAt?: number;
};

export type PostCreateCategoryResponse = CategoryEntity;

export async function POST(request: Request) {
  console.log("POST request made ", { request });

  try {
    await connectionToDatabase();

    const body: PostCreateCategoryRequestBody = await request.json();

    const repo = new CategoryRepository();
    const createdCategory: PostCreateCategoryResponse = await repo.create(body);

    return Response.json(createdCategory);
  } catch (err) {
    console.log("GET categorys error ", { err });
    return Response.json(
      {
        message: "Something went wrong while POST Category",
      },
      {
        status: 500,
      }
    );
  }
}
