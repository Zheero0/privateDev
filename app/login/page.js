"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext/auth";
import Login from "../components/Login";
import { toast } from "sonner";

export default function LoginPage() {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push("/profile");
            toast.success("Login Successful!");
        }
    }, [currentUser, router]);

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center mr-[30rem]">
            <Login />
        </div>
    );
}
