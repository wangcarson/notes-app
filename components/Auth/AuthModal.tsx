"use client";

import { signIn } from 'next-auth/react';
import React from 'react';

const AuthModal:React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-center h-full w-full">
      {/* Modal toggle */}
      {/* https://flowbite.com/docs/components/modal/#form-element */}
      <button onClick={() => setOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
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

                    <div className="p-5">
                        <div className="text-center mt-5">
                            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                                Login to your account
                            </p>
                            <p className="mt-2 text-sm leading-4 text-slate-600">
                                You must be logged in to perform this action.
                            </p>
                        </div>

                        {/* OAuth buttons */}
                        <div className="mt-7 flex flex-col gap-2">
                          <button 
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                            <img src="logo_github.png" alt="GitHub" className="h-[18px] w-[18px]"></img>
                            Continue with GitHub
                          </button>

                          <button onClick={() => signIn('google')}
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                            <img src="logo_google.png" alt="Google" className="h-[18px] w-[18px] "></img>
                            Continue with Google
                          </button>

                          <button 
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                            <img src="logo_linkedin.png" alt="Google" className="h-[18px] w-[18px] "></img>
                            Continue with LinkedIn
                          </button>
                        </div>

                        <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                            <div className="h-px w-full bg-slate-200"></div>
                            OR
                            <div className="h-px w-full bg-slate-200"></div>
                        </div>


                        <form className="w-full">
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input name="email" type="email" autoComplete="email" required={true}
                                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                placeholder="Email Address"></input>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input name="password" type="password" autoComplete="current-password" required={true}
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                placeholder="Password"></input>
                            <p className="mb-3 mt-2 text-sm text-gray-500">
                                <a href="/forgot-password" className="text-blue-800 hover:text-blue-600">Reset your password?</a>
                            </p>
                            <button type="submit"
                                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                                Continue
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-slate-600">
                            Don't have an account?
                            <a href="/signup" className="font-medium text-[#4285f4]">Sign up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
export default AuthModal;