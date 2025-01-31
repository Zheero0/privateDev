"use client"
import React from 'react';
import Login from '../components/Login';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/authContext/auth";



export default function loginPage (){
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push('/anotherpage');
        }
    }, [currentUser]);

    return (
        <div>
            <Login/>
        </div>
    )
}