"use client";

import CustomButton from "@/components/Templates/CustomButton";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const onLogOutClick = () => {
    signOut({ callbackUrl: "/home" });
  };
  
  return (
    <>
      <CustomButton type="primary" onClick={onLogOutClick}>Log out</CustomButton>
      <div className="flex">
        Hello World!
      </div>
      { session ? (
        <div>
          <p>Signed in as: {session.user?.name}</p>
          <p>Email: {session.user?.email}</p>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
        </div>
      )}
    </>
  );
}
