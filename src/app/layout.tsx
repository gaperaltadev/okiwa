import { Metadata } from "next";
import { Nunito } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppLayout } from "./components/AppLayout";

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
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
