"use client";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase/client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useCallback } from "react";

const DashboardPage = () => {
  const { user } = useAuth();

  const handleSignOut = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <Box className="grid gap-6">
      <Stack justifyContent="space-between" direction="row">
        <Box className="flex flex-col">
          <Typography variant="h5">Dashboard</Typography>
          <Typography variant="caption" color="textSecondary">
            Nombre: {user?.displayName || "--"} | Email: {user?.email || "--"}
          </Typography>
        </Box>
        <Button size="small" variant="contained" onClick={handleSignOut}>
          Cerrar sesión
        </Button>
      </Stack>
    </Box>
  );
};

export default DashboardPage;
