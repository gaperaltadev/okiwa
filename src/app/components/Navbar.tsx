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
    <div
      className={`${
        pathname === "/sign-in" ? "hidden" : "flex"
      } w-screen gap-2 p-4 justify-center items-center`}
    >
      {paths.map((path, idx) => (
        <Link key={`${path.label}-${idx}`} href={path.href}>
          <div
            className={`grid gap-2 rounded-xl px-4 py-2 ${
              pathname === path.href ? "bg-black text-white" : ""
            }`}
          >
            {path.icon}
            <p className="font-bold text-lg">{path.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
