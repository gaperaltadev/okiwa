"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../client";

const useAuthStatus = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    function checkStatus() {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
    }

    checkStatus();
  }, []);

  return { user };
};

export default useAuthStatus;
