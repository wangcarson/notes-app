"use client";

import AuthModal from "@/components/Auth/AuthModal";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
  const { data: session, status } = useSession();
  
  return (
    <>
      <div className="flex">
        Hello World!
      </div>
      <AuthModal />
      { session ? (
        <div>
          <p>Signed in as: {session.user?.email}</p>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
        </div>
      )}
    </>
  );
}
