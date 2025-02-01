"use client"
import { useAuth } from "@/context/authContext/auth";
import PostJob from "../components/PostJob";
import Login from "../components/Login"; // Ensure this path is correct

export default function PostJobPage() {
  const { currentUser } = useAuth();

  return <>{currentUser ? <PostJob /> : <Login />}</>;
}
