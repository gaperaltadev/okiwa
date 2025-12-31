"use client";

import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import { Navbar } from "./Navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign-in";

  if (isAuthPage) {
    return <main className="h-screen">{children}</main>;
  }

  return (
    <main className="grid grid-rows-[auto_1fr_auto] h-screen">
      <TopBar />
      <div className="p-4 max-w-screen overflow-y-auto">{children}</div>
      <Navbar />
    </main>
  );
};
