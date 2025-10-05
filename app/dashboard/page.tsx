"use client";

import Filter from "@/components/Dashboard/Filter";
import Header from "@/components/Dashboard/Header";
import CustomButton from "@/components/Templates/CustomButton";

export default function Dashboard() {

  const sidebarWidth = 60;
  const headerHeight = 16;
  
  return (
    <div className="bg-red-100 min-h-screen flex flex-row">
      {/* Sidebar */}
      <div className={`fixed h-full hidden w-${sidebarWidth} lg:flex flex-col bg-blue-100 border-r-1`}>
        Sidebar
      </div>

      <div className={`flex flex-col flex-1 ml-${sidebarWidth}`}>

        <Header height={headerHeight} />

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

          <div className="bg-purple-100 w-full flex flex-row justify-between items-center gap-4">
            <div className="inline-flex gap-8">
              <div className="inline-flex text-sm text-gray-600 items-center gap-2 flex-wrap">
                Filter by 
                <Filter>
                  All boards
                </Filter>
                <Filter>
                  Owned by anyone
                </Filter>
              </div>

              <div className="inline-flex text-sm text-gray-600 items-center gap-2">
                <div className="text-nowrap">
                  Sort by 
                </div>
                <Filter>
                  Last opened
                </Filter>
              </div>
            </div>

            <div className="min-w-16 bg-white">
              End
            </div>
          </div>

          <div className="bg-purple-100 w-full rounded-sm flex flex-row flex-wrap overflow-hidden gap-10 h-1000">
            <div className="flex-5 bg-orange-100">Name</div>
            <div className="flex-2 bg-orange-100 hidden sm:block">Online users</div>
            <div className="flex-2 bg-orange-100 hidden 2xl:block">Last opened</div>
            <div className="flex-2 bg-orange-100 hidden xl:block">Owner</div>
            <div className="flex-none bg-orange-100">More details</div>
          </div>
        </div>
      </div>
    </div>
  );
}
