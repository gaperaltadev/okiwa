import connectionToDatabase from "../../../../backend/database/mongoose";
import { ClientEntity } from "../../../../backend/clients/domain/Client.entity";
import { ClientRepository } from "../../../../backend/clients/infra/Client.repository";

export type ResponseGetClients = ClientEntity[];

export async function GET() {
  try {
    await connectionToDatabase();
    const repo = new ClientRepository();
    const clients = await repo.find();

    const response: ResponseGetClients = [...clients];
    return Response.json(response);
  } catch (err) {
    console.log("error getting clients ", { err });
    return Response.json({
      message: "Something went wrong while GET Clients",
    });
  }
}

export type PostCreateClientRequestBody = {
  id?: string;
  document?: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  createdAt?: number;
  updatedAt?: number;
};

export type PostCreateClientResponse = ClientEntity;

export async function POST(request: Request) {
  try {
    await connectionToDatabase();

    const body: PostCreateClientRequestBody = await request.json();

    const repo = new ClientRepository();
    const createdClient: PostCreateClientResponse = await repo.create(body);

    return Response.json(createdClient, { status: 201 });
  } catch (err) {
    console.log("error creating client ", { err });
    return Response.json(
      {
        message: "Something went wrong while POST Client",
      },
      {
        status: 500,
      }
    );
  }
}
