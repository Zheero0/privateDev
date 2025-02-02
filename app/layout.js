import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "@/context/authContext/auth";

import NavBar from "./components/Navbar"; // Correct for default exports
import { Footer } from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"], // Adjust based on needs
});


export const metadata = {
  title: "Marketplace",
  description: "Marketplace is a job markeplace application built with Next.js and Firebase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {/* 🚀 FIXED: Sidebar + Main Content in a Flexbox Layout */}
          <div className="flex min-h-screen">
            
            <Sidebar />
            <div className="flex-1 flex flex-col  ml-[9.5rem]">
              <main className="flex-1 bg-white pl-5 pt-5">{children}</main>
              {/* <Footer /> */}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}