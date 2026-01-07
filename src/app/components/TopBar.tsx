"use client";
import { ProfileAvatar } from "./ProfileAvatar";
import Breadcrumb from "./Breadcrumb";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b w-screen">
      <Breadcrumb />
      <ProfileAvatar />
    </div>
  );
};

export default TopBar;
