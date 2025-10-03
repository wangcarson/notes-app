"use client";

import { signIn } from 'next-auth/react';
import { useEffect } from "react";
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useModalContext } from '@/context/ModalContext';
import { useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const AuthModal:React.FC = () => {
  const { modalState, modalOpen, setModalState, setModalOpen } = useModalContext();

  const handleClose = () => setModalOpen(false);
  const handleState = (state: 'signin' | 'signup') => setModalState(state);

  const handleGoogle = async () => {
    await signIn("google", { redirect: false });
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "provider_mismatch") {
      setModalOpen(true);
      toast.error("Error: Email used with another provider");
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <Toaster />

      {/* Main modal */}
      {/* https://tailwindflex.com/@r-thapa/login-popup-modal */}
      { modalOpen && ( 
        <div id="login-popup" tabIndex={-1} className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                <div className="relative bg-white rounded-lg shadow">
                    {/* Close button */}
                    <button type="button" onClick={handleClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close">
                        <svg aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20">
                          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                    </button>

                    { modalState == 'signin' ? (
                      <SignIn handleClose={handleClose} handleState={handleState} handleGoogle={handleGoogle}/>
                    ) : (
                      <SignUp handleClose={handleClose} handleState={handleState} handleGoogle={handleGoogle}/>
                    ) }
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
export default AuthModal;