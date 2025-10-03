"use client";

import CustomButton from "@/components/Templates/CustomButton";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  const onLogOutClick = () => {
    signOut({ callbackUrl: "/home" });
  };
  
  return (
    <div className="bg-red-100 w-full min-h-screen flex flex-row">
      {/* Sidebar */}
      <div className="hidden lg:flex fixed top-0 left-0 h-screen flex-col bg-blue-100 min-w-60 border-r-1">
        Sidebar
      </div>

      <div className="flex flex-col flex-1">

        {/* Header */}
        <div className="flex bg-yellow-100 h-16 flex-row justify-between items-center px-6 py-3 border-b-1">
          <div className="h-full flex items-center min-w-26">
            Title
          </div>

{/* Search bar */}
<form className="flex items-center max-w-120 w-full">   
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

        <div className="h-full p-6 bg-green-100 flex flex-col gap-6">

          <div className="bg-purple-100 w-full rounded-sm h-40 flex flex-row">
            New document
          </div>

          <div className="bg-purple-100 w-full flex flex-row justify-between">
            <p className="text-2xl">Recent boards and documents</p>

            <CustomButton colour="customgreen" className="pr-2 flex flex-row items-center rounded-sm">
              <svg className="h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
              </svg>
              Create new
            </CustomButton>
          </div>

          <div className="bg-purple-100 w-full flex flex-row justify-between items-center">
            <div className="inline-flex gap-8">
              <div className="inline-flex text-sm text-gray-600 items-center gap-2">
                Filter by 
                <button className="bg-white border-1 border-gray-300 font-sm rounded-sm text-sm px-3 py-1.5 text-center inline-flex justify-between items-center w-40 text-nowrap" type="button">
                  All boards 
                  <svg className="w-2 h-2 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
                <button className="bg-white border-1 border-gray-300 font-sm rounded-sm text-sm px-3 py-1.5 text-center inline-flex justify-between items-center w-40 text-nowrap" type="button">
                  Owned by anyone
                  <svg className="w-2 h-2 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
              </div>

              <div className="inline-flex text-sm text-gray-600 items-center gap-2">
                Sort by 
                <button className="bg-white border-1 border-gray-300 font-sm rounded-sm text-sm px-3 py-1.5 text-center inline-flex justify-between items-center w-40 text-nowrap" type="button">
                  Last opened 
                  <svg className="w-2 h-2 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-purple-100 w-full rounded-sm h-1000 flex flex-row">
            New document
          </div>
        </div>
      </div>
    </div>
  );
}
