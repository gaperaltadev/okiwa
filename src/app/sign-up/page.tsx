import { auth } from "@/lib/firebase/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        sendEmailVerification(auth.currentUser);
      }
      router.push("/");
    } catch (error) {
      console.error("Error al registrarse:", error);
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  return (
    <Box className="grid gap-6">
      <Typography variant="h4">Registrarse</Typography>
      <Box className="grid gap-4">
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          label="Correo"
        ></TextField>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Contraseña"
        ></TextField>
      </Box>
      <Button loading={loading} onClick={handleSubmit}>
        Registrarse
      </Button>
    </Box>
  );
};

export default SignUpPage;
