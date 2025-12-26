"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  GroupOutlined,
  HomeOutlined,
  LocalOfferOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";

export const Navbar = () => {
  const router = useRouter();
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
      className={`${pathname === "/sign-in" ? "hidden" : "flex"} w-screen p-4`}
    >
      <div className="md:hidden w-full">
        <Autocomplete
          fullWidth
          options={paths}
          getOptionLabel={(option) => option.label}
          onChange={(_, newValue) => router.push(newValue?.href || "/")}
          value={paths.find((path) => path.href === pathname) || null}
          renderInput={(params) => <TextField {...params} label="Navegar" />}
        />
      </div>
      <div className="grid-cols-4 gap-2 hidden sm:grid">
        {paths.map((path, idx) => (
          <Link key={`${path.label}-${idx}`} href={path.href}>
            <div
              className={`grid gap-2 rounded-xl px-4 py-2 ${
                pathname === path.href ? "bg-black text-white" : "border"
              }`}
            >
              {path.icon}
              <p className="font-bold text-lg">{path.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
