"use client";
import { usePathname } from "next/navigation";
import { ProfileAvatar } from "./ProfileAvatar";
import Breadcrumb from "./Breadcrumb";

const TopBar = () => {
  const pathname = usePathname();

  return (
    <div
      className={`${
        pathname === "/sign-in" ? "hidden" : "flex"
      } justify-between items-center p-4 border-b`}
    >
      <Breadcrumb />
      <ProfileAvatar />
    </div>
  );
};

export default TopBar;
