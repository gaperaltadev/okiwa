import { adminAuth } from "@/lib/firebase/admin";

export async function ValidateRequestToken(request: Request) {
  const authToken = request.headers.get("authorization");

  if (!authToken) {
    return false;
  }

  try {
    await adminAuth.verifyIdToken(authToken.slice(7));
    return true;
  } catch (err) {
    return false;
  }
}
