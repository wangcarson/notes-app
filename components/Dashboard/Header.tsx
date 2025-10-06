"use client";

import { NextPage } from 'next'
import { signOut } from 'next-auth/react';

interface Props {
    left: number,
    height: number,
}

const Header: NextPage<Props> = ({ left, height }) => {
  const onLogOutClick = () => {
    signOut({ callbackUrl: "/home" });
  };
  
  return (
    <div 
        className="fixed top-0 right-0 flex bg-yellow-100 flex-row justify-between items-center px-6 py-3 border-b-1 gap-12 left-0 lg:left-[var(--left)]"
        style={{ height: height, '--left': `${left}px` } as React.CSSProperties}
    >
        <div className="flex gap-4">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>  
            <div className="h-full flex items-center min-w-26">
                Our Title Here
            </div>
        </div>

        <form className="hidden md:flex items-center max-w-120 w-full">   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                </div>
                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search documents..." />
            </div>
        </form>

        <div className="flex flex-row gap-4">
            <div>Invite</div>
            <div>Notifications</div>
            <div onClick={onLogOutClick}>Account</div>
        </div>
    </div>
  )
}

export default Header