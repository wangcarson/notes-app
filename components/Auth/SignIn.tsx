"use client";

import { signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import OAuthButton from './OAuthButton';
import FormField from './AuthField';
import { useRouter, useSearchParams } from 'next/navigation';

type SignInProps = {
  handleClose: () => void,
  handleState: (state: 'signin' | 'signup') => void,
  handleGoogle: () => void,
};

const SignIn:React.FC<SignInProps> = ({ handleClose, handleState, handleGoogle }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    setError("");
    e.preventDefault();
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/dashboard');
    }
  }

  return (
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
        <OAuthButton onClick={() => {}}>
          <img src="logo_github.png" alt="github" className="h-[18px] w-[18px]"></img>
          Continue with GitHub
        </OAuthButton>
        <OAuthButton onClick={handleGoogle}>
          <img src="logo_google.png" alt="google" className="h-[18px] w-[18px]"></img>
          Continue with Google
        </OAuthButton>
      </div>

      {/* Separator */}
      <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
        <div className="h-px w-full bg-slate-200"></div>
        OR
        <div className="h-px w-full bg-slate-200"></div>
      </div>

      <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
        {/* Email */}
        <FormField name="email" type="email" value={email} onChangeValue={setEmail} placeholder="Email Address" />
        
        {/* Password */}
        <FormField name="password" type="password" value={password} onChangeValue={setPassword} placeholder="Password" />
        
        {/* Error message */}
        { error && <p className="text-sm text-red-600">{error}</p> }

        {/* Reset password */}
        <p className="text-sm text-gray-500">
          <a href="/forgot-password" className="text-blue-800 hover:text-blue-600">Forgot your password?</a>
        </p>

        {/* Submit button */}
        <button type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 mt-2
          text-sm font-medium text-white outline-none disabled:bg-gray-400
          hover:ring-1 hover:ring-black hover:ring-offset-1 hover:cursor-pointer">
          Continue
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600">
        Don't have an account? 
        <a onClick={() => handleState('signup')} className="font-medium text-[#4285f4] ml-1 hover:cursor-pointer">Sign up</a>
      </div>
    </div>
  )
}
export default SignIn;