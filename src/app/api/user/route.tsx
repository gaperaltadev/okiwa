import { ValidateRequestToken } from "@/app/common/useValidateRequestToken";
import { adminAuth } from "@/lib/firebase/admin";

export type FirebaseUser = {
  uid: string;
  email?: string;
  emailVerified: boolean;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  disabled: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
  providerData: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    providerId: string;
    phoneNumber: string;
  }[];
  passwordHash?: string;
  passwordSalt?: string;
};

export interface GetUsersResponse {
  users: FirebaseUser[];
}

export async function GET(request: Request) {
  try {
    const { isValid } = await ValidateRequestToken(request);
    if (!isValid) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    const users = await adminAuth.listUsers();
    return Response.json(users);
  } catch (error) {
    console.log("Error fetching user data:", error);
    return new Response("Error fetching user data", { status: 500 });
  }
}

export interface CreateUserRequestBody {
  email: string;
  password: string;
  username?: string;
}

export interface CreateUserResponse {
  user: FirebaseUser;
}

export async function POST(request: Request) {
  try {
    const { isValid } = await ValidateRequestToken(request);
    if (!isValid) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    const { email, password, username }: CreateUserRequestBody =
      await request.json();

    console.log("Creating user with: ", { email, password, username });

    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: username,
    });

    const response: CreateUserResponse = {
      user: userRecord,
    };

    return Response.json(response, { status: 201 });
  } catch (error) {
    console.log("Error creating user:", error);
    return new Response("Error creating user", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { isValid } = await ValidateRequestToken(request);
    if (!isValid) {
      return Response.json({ message: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    await adminAuth.deleteUser(body.uid);
    return new Response("Deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting user", { status: 500 });
  }
}
