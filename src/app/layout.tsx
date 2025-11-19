import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Okiwa",
  description: "Sistema de gestión",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <AuthProvider>
        <body className={`${montserrat.className} antialiased h-[100vh]`}>
          <Toaster />
          <main className="h-full">
            <Navbar />
            <div className="p-6">{children}</div>
          </main>
        </body>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;
