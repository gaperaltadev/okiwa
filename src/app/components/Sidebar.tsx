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
import { Box } from "@mui/material";

export const Sidebar = () => {
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
        href: "/dashboard/products",
      },
      {
        label: "Ventas",
        icon: <TrendingUpOutlined fontSize="small" />,
        href: "/dashboard/sales",
      },
      {
        label: "Usuarios",
        icon: <GroupOutlined fontSize="small" />,
        href: "/admin/users",
      },
    ],
    []
  );

  return (
    <Box
      className={`${
        pathname === "/sign-in" ? "hidden" : "flex"
      } flex-col w-1/6 border-r`}
    >
      <Box className="flex flex-col gap-2 p-4">
        {paths.map((path, idx) => (
          <Link key={`${path.label}-${idx}`} href={path.href}>
            <Box
              className={`flex gap-2 items-center rounded-xl px-4 py-2 ${
                pathname === path.href ? "bg-black text-white" : ""
              }`}
            >
              {path.icon}
              <p className="font-bold text-lg">{path.label}</p>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};
