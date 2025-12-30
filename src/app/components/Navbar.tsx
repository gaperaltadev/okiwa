"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  GroupOutlined,
  HomeOutlined,
  LocalOfferOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

export const Navbar = () => {
  const pathname = usePathname();

  const paths = useMemo(
    () => [
      {
        label: "Inicio",
        icon: <HomeOutlined fontSize="small" />,
        href: "/",
      },
      {
        label: "Productos",
        icon: <LocalOfferOutlined fontSize="small" />,
        href: "/products",
      },
      {
        label: "Ventas",
        icon: <TrendingUpOutlined fontSize="small" />,
        href: "/sales",
      },
      {
        label: "Usuarios",
        icon: <GroupOutlined fontSize="small" />,
        href: "/users",
      },
    ],
    []
  );

  return (
    <nav
      className={`${
        pathname === "/sign-in" ? "hidden" : "flex"
      } fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50 md:static md:border-0 md:bg-transparent`}
    >
      <div className="flex justify-around items-center w-full px-2 py-3 md:grid md:grid-cols-4 md:gap-4 md:px-4 gap-2">
        {paths.map((path, idx) => (
          <Link
            key={`${path.label}-${idx}`}
            href={path.href}
            className="flex-1 md:flex-none"
          >
            <div
              className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2 transition-all duration-200 hover:scale-105 md:gap-2 md:p-3 ${
                pathname === path.href
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
              }`}
            >
              <span className={pathname === path.href ? "scale-110" : ""}>
                {path.icon}
              </span>
              <Typography
                variant="caption"
                className={`text-xs font-medium md:text-sm ${
                  pathname === path.href ? "text-white" : "text-gray-700"
                }`}
              >
                {path.label}
              </Typography>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};
