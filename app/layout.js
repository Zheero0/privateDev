import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext/auth";
import NavBar from "./components/Navbar"; // Correct for default exports
import { Footer } from "./components/Footer";
import Sidebar from "./components/Sidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Marketplace",
  description: "Marketplace is a job markeplace application built with Next.js and Firebase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {/* 🚀 FIXED: Sidebar + Main Content in a Flexbox Layout */}
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-44">
              <main className="flex-1 bg-white">{children}</main>
              {/* <Footer /> */}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}