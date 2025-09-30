"use client";

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthModal:React.FC = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<'signin' | 'signup'>('signin');

  const handleClose = () => setOpen(false);
  const handleState = (state: 'signin' | 'signup') => setState(state);

  return (
    <div className="flex items-center justify-center h-full w-full">
      {/* Modal toggle */}
      {/* https://flowbite.com/docs/components/modal/#form-element */}
      <button onClick={() => setOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Sign In
      </button>
      <button onClick={() => signOut()} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Sign Out
      </button>

      {/* Main modal */}
      {/* https://tailwindflex.com/@r-thapa/login-popup-modal */}
      {open && ( 
        <div id="login-popup" tabIndex={-1} className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                <div className="relative bg-white rounded-lg shadow">
                    {/* Close button */}
                    <button type="button" onClick={() => setOpen(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close">
                        <svg aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20">
                          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                    </button>

                    { state == 'signin' ? (
                      <SignIn handleClose={handleClose} handleState={handleState}/>
                    ) : (
                      <SignUp handleClose={handleClose} handleState={handleState}/>
                    ) }
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
export default AuthModal;