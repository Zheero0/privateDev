"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext/auth";
import { logOut } from "@/firebase/auth";
import {
  FiMessageSquare,
  FiUser,
  FiBriefcase,
  FiSearch,
  FiPlusCircle,
  FiLogIn,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

export default function Sidebar() {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      // Removed the default Tailwind shadow class and added a custom inline style
      className={`fixed top-0 left-0 h-screen bg-blue-950 text-white flex flex-col transition-all duration-300 
       w-40 min-w-[3rem] min-h-full z-50`}
      style={{ boxShadow: "2px 0 8px rgba(0, 0, 0, 0.3)" }}
    >
      {/* Sidebar content */}

      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <Link href={"/"}>
            <h1 className="text-xl font-bold">Marketplace</h1>
          </Link>
        )}
        {/* <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 "
        >
          <FiMenu size={24} />
        </button> */}
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1  text-xs">
        <ul className="space-y-1">
          <SidebarItem
            href="/search"
            icon={<FiSearch />}
            label="Search"
            isOpen={isOpen}
          />
          <SidebarItem
            href="/chat"
            icon={<FiMessageSquare />}
            label="Chat"
            isOpen={isOpen}
          />
          <SidebarItem
            href="/post-job"
            icon={<FiPlusCircle />}
            label="Post Job"
            isOpen={isOpen}
          />
          <SidebarItem
            href="/directory"
            icon={<FiBriefcase />}
            label="Directory"
            isOpen={isOpen}
          />
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto p-4">
        {currentUser ? (
          <>
            <Link href="/profile">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={currentUser?.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                {isOpen && (
                  <span className="text-sm">
                    {currentUser.displayName || "User"}
                  </span>
                )}
              </div>
            </Link>
            <button
              onClick={logOut}
              className="w-full flex text-xs items-center font-semibold space-x-3 p-3 text-left rounded-lg transition  text-gray-400 hover:scale-105 hover:text-gray-200 duration-[0.5s] group"
            >
              <FiLogOut size={13} />
              {isOpen && <span>Sign Out</span>}
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="w-full flex items-center space-x-3 p-3 font-semibold text-left rounded-lg transition text-gray-400 hover:scale-105 hover:text-gray-200 duration-[0.5s] group"
          >
            <FiLogIn size={20} />
            {isOpen && <span>Login</span>}
          </Link>
        )}
      </div>
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ href, icon, label, isOpen }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center space-x-2 p-3 rounded-lg transition hover:scale-105 hover:text-gray-200 duration-[0.5s] group"
      >
        <span className="text-gray-400 text-xl group-hover:text-gray-200">
          {" "}
          {icon}
        </span>
        {isOpen && (
          <span className="text-sm font-semibold text-gray-400 group-hover:text-gray-200">
            {label}
          </span>
        )}
      </Link>
    </li>
  );
}
