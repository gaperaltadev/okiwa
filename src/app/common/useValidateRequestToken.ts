import { adminAuth } from "@/lib/firebase/admin";

export async function ValidateRequestToken(
  request: Request
): Promise<{ isValid: boolean; userData?: { id: string; name?: string } }> {
  const authToken = request.headers.get("authorization");

  if (!authToken) {
    return { isValid: false };
  }

  try {
    const verifiedToken = await adminAuth.verifyIdToken(authToken.slice(7));

    return {
      isValid: true,
      userData: {
        id: verifiedToken.user_id,
        name: verifiedToken.name,
      },
    };
  } catch (err) {
    return { isValid: false };
  }
}
