"use client";

import { auth } from "@/lib/firebase/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { FirebaseError } from "firebase-admin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string>();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      const { code } = error as FirebaseError;

      if (code === "auth/invalid-credential") {
        setError("Credenciales inválidas");
      }

      if (code === "auth/invalid-email") {
        setError("Email inválido");
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  return (
    <Box className="grid justify-center items-center gap-6">
      <Typography variant="h4">Iniciar sesión</Typography>
      <Box className="flex gap-4">
        <TextField
          value={email}
          type="text"
          error={!!error}
          label="Correo"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          value={password}
          type="password"
          error={!!error}
          label="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Box className="flex gap-2">
        <Button loading={loading} onClick={handleSubmit}>
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  );
};

export default SignInPage;
