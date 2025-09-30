"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  
  return (
    <>
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
