"use client";
import { auth } from "@/lib/firebase/client";
import { LogoutOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

const TopBar = () => {
  const pathname = usePathname();

  const handleLogOut = useCallback(() => {
    signOut(auth);
  }, []);

  return (
    <div
      className={`${
        pathname === "/sign-in" ? "hidden" : "flex"
      } justify-between items-center p-4 border-b`}
    >
      <span className="text-2xl font-bold">Administración</span>
      <Button
        color="inherit"
        size="small"
        startIcon={<LogoutOutlined />}
        onClick={handleLogOut}
      >
        Cerrar sesión
      </Button>
    </div>
  );
};

export default TopBar;
