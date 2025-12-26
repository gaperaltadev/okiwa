"use client";

import { useAuth } from "@/context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      <span className="text-4xl font-extralight text-gray-600">
        {user?.displayName || "--"}
      </span>
      <span className="font-bold text-gray-500">{user?.email || "--"}</span>
    </div>
  );
};

export default DashboardPage;
