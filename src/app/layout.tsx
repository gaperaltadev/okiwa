import { Metadata } from "next";
import { Nunito } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TopBar from "./components/TopBar";
import { Navbar } from "./components/Navbar";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "Okiwa",
  description: "Sistema de gestión",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={`${nunito.className} antialiased`}>
        <Toaster />
        <AuthProvider>
          <main className="grid grid-rows-[auto_1fr_auto] h-screen">
            <TopBar />
            <div className="p-4 max-w-screen overflow-y-auto">{children}</div>
            <Navbar />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
