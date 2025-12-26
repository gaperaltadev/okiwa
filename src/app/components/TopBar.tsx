"use client";
import { usePathname } from "next/navigation";
import { ProfileAvatar } from "./ProfileAvatar";

const TopBar = () => {
  const pathname = usePathname();

  return (
    <div
      className={`${
        pathname === "/sign-in" ? "hidden" : "flex"
      } justify-between items-center p-4 border-b`}
    >
      <span className="text-2xl font-bold">Administración</span>
      <ProfileAvatar />
    </div>
  );
};

export default TopBar;
