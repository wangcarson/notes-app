"use client";

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import OAuthButton from './OAuthButton';
import FormField from './FormField';
import User from "@/lib/models/User";
import { connectDB } from '@/lib/db';

type SignUpProps = {
  handleClose: () => void,
  handleState: (state: 'signin' | 'signup') => void,
};

const SignUp:React.FC<SignUpProps> = ({ handleClose, handleState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    setError("");
    e.preventDefault();
    
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    console.log("Checking...");
    const res = await fetch(`/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      console.log("User created:", data);
      
      // Login
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        handleClose();
      }

    } else {
      setError(data.error || "Something went wrong");
    }
  }

  return (
    <div className="p-5">
      <div className="text-center mt-5">
        <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
          Create a new account
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
        <OAuthButton onClick={() => signIn('google')}>
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

      <form onSubmit={handleCreate} className="w-full flex flex-col gap-2">
        {/* Email */}
        <FormField name="email" type="email" value={email} 
          onChangeValue={setEmail} placeholder="Email Address" />
        
        {/* Password */}
        <FormField name="password" type="password" value={password} 
          onChangeValue={setPassword} placeholder="Password" />
        
        {/* Confirm password */}
        <FormField name="password-confirm" type="password" value={passwordConfirm} 
          onChangeValue={setPasswordConfirm} placeholder="Confirm Password" />

        {/* Error message */}
        { error && <p className="text-sm text-red-600">{error}</p> }

        {/* Reset password */}
        <p className="mb-2 text-sm text-gray-500">
          <a href="/forgot-password" className="text-blue-800 hover:text-blue-600">Reset your password?</a>
        </p>

        {/* Submit button */}
        <button type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 
          text-sm font-medium text-white outline-none disabled:bg-gray-400
          hover:ring-1 hover:ring-black hover:ring-offset-1 hover:cursor-pointer">
          Continue
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600">
        Already have an account? 
        <a onClick={() => handleState('signin')} className="font-medium text-[#4285f4] ml-1 hover:cursor-pointer">Sign in</a>
      </div>
    </div>
  )
}
export default SignUp;