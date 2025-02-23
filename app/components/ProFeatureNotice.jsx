"use client";

import Link from "next/link";
import { useAuth } from "@/context/authContext/auth";

export default function ProFeatureNotice({ children }) {
  const { isProUser } = useAuth();

  if (isProUser) {
    // Render the Pro-only feature or children if the user is a Pro member.
    return children || null;
  }

  // Display a notice for non-Pro users.
  return (
    <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-md text-center">
      <h3 className="text-xl font-bold text-gray-800">Pro Feature Required</h3>
      <p className="mt-2 text-gray-700">
        This feature requires a Pro membership. Upgrade now to access exclusive
        features.
      </p>
      <Link
        href="/pricing"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Upgrade to Pro
      </Link>
    </div>
  );
}
