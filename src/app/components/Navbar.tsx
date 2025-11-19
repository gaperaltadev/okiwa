"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { LocalOffer, ShoppingBag } from "@mui/icons-material";
import useAuthStatus from "@/lib/firebase/hooks/useAuthStatus";
import { Box, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export const Navbar = () => {
  const pathname = usePathname();
  const authStatus = useAuthStatus();

  // console.log("Auth status in Navbar:", { authStatus });

  const paths = useMemo(
    () => [
      {
        label: "Productos",
        icon: <LocalOffer fontSize="small" />,
        href: "/dashboard/products",
      },
      {
        label: "Ventas",
        icon: <ShoppingBag fontSize="small" />,
        href: "/dashboard/sales",
      },
    ],
    []
  );

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  return (
    <Box className="flex justify-between p-4 bg-gradient-to-b from-gray-200 to-gray-50 text-white">
      <Box className="flex gap-2">
        {paths.map((path, idx) => (
          <Link key={`${path.label}-${idx}`} href={path.href}>
            <Box
              className={`flex gap-2 items-center border px-2 rounded ${
                pathname === path.href ? "text-black" : "text-gray-400"
              }`}
            >
              {path.icon}
              {path.label}
            </Box>
          </Link>
        ))}
      </Box>
      <Box>
        {authStatus.user ? (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleSignOut}
          >
            Cerrar sesión
          </Button>
        ) : (
          <span className="text-red-600 font-medium">Iniciar sesión</span>
        )}
      </Box>
    </Box>
  );
};
