"use client";

import { auth } from "@/lib/firebase/client";
import { Button, TextField, Typography } from "@mui/material";
import { FirebaseError } from "firebase-admin";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

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

  const handleResetPassword = useCallback(async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success("Correo de recuperación enviado");
    } catch (error) {
      const { code } = error as FirebaseError;

      switch (code) {
        case "auth/invalid-credential":
          setError("Credenciales inválidas");
          break;
        case "auth/missing-email":
          setError("Por favor ingresa un email");
          break;
        case "auth/invalid-email":
          setError("Email inválido");
          break;
        case "auth/user-not-found":
          setError("Usuario no encontrado");
          break;
        default:
          setError("Error desconocido");
          break;
      }
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <div className="grid justify-center items-center h-full">
      <div className="bg-white p-6 rounded-2xl grid gap-4">
        <Typography variant="h5">Iniciar sesión</Typography>
        <div className="flex flex-col md:flex-row gap-4">
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
        </div>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <div className="flex flex-col md:flex-row gap-2">
          <Button
            color="inherit"
            variant="contained"
            loading={loading}
            onClick={handleSubmit}
          >
            Iniciar sesión
          </Button>
          <Button
            color="warning"
            variant="contained"
            loading={loading}
            onClick={handleResetPassword}
          >
            Recuperar contraseña
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
