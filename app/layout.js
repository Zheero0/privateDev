import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext/auth";
import NavBar from "./components/Navbar"; // Correct for default exports
import { Footer } from "./components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chat.io",
  description: "Chat.io is a chat application built with Next.js and Firebase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NavBar />{" "}
          {/* NavBar included here to be available across all pages wrapped by RootLayout */}
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
