"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, onIdTokenChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/utils/axios";
import { CircularProgress } from "@mui/material";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext({
  user: null,
  loading: true,
} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      const token = await firebaseUser?.getIdToken();
      setAuthToken(token || null);
      setUser(firebaseUser);
      setLoading(false);
    });

    const unsubscribeToken = onIdTokenChanged(auth, async (firebaseUser) => {
      const token = await firebaseUser?.getIdToken();
      setAuthToken(token || null);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, [router]);

  if (loading)
    return (
      <div className="h-screen grid justify-center items-center">
        <CircularProgress size={"80px"} />
      </div>
    );
  if (!loading && !user) {
    if (
      typeof window !== "undefined" &&
      window.location.pathname !== "/sign-in"
    ) {
      window.location.replace("/sign-in");
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
