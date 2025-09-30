"use client";

import AuthModal from "@/components/Auth/Modal/AuthModal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/dashboard");
  //   }
  // }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 h-500">
      <h1 className="text-3xl font-bold underline">Hello</h1>
    </div>
  );
}
