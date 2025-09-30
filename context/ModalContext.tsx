"use client";

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

export type ModalState = 'signin' | 'signup';

// https://www.reddit.com/r/nextjs/comments/13zy8xw/what_is_best_way_for_global_state_management_in/
interface ModalContextProps {
  modalState: ModalState;
  modalOpen: boolean;
  setModalState: Dispatch<SetStateAction<ModalState>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextProps>(undefined!);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>('signup');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ modalState, modalOpen, setModalState, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModalContext(): ModalContextProps {
  const context = useContext(ModalContext);
  if (typeof context === "undefined") {
    throw new Error(
      "useModalContext should be used within the ModalContext provider."
    );
  }
  return context;
}
