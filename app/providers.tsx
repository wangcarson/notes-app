"use client";

import { ModalProvider } from "@/context/ModalContext";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </SessionProvider>
  );
}
