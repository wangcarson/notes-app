"use client";

import BoardTable from "@/components/Dashboard/BoardTable";
import Filter from "@/components/Dashboard/Filter";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import CustomButton from "@/components/Templates/CustomButton";
import { BoardData } from "@/lib/models/Board";
import { NextPage } from "next";

interface Props {
    boards: BoardData[]
}

const Dashboard: NextPage<Props> = ({ boards }) => {
  const sidebarWidth = 240;
  const headerHeight = 64;

  const handleCreate = async () => {
    // TODO: 
    // Generate unique ID
    // Send to API (create new endpoints for saving and creating)
    // Redirect to page
  }

  return (
    <div className="min-h-screen flex flex-row">
      <Sidebar width={sidebarWidth} />

      <div
        className="flex flex-col grow lg:ml-[var(--sidebar-padding)]"
        style={{ '--sidebar-padding': `${sidebarWidth}px` } as React.CSSProperties}
      >
        <Header left={sidebarWidth} height={headerHeight} />

        {/* Main content */}
        <div className="h-full p-6 flex flex-col gap-6" style={{ marginTop: headerHeight }}>

          <div className="w-full flex flex-row justify-between">
            <p className="text-2xl">Recent boards and documents</p>

            {/* Create board */}
            <CustomButton 
              colour="green" 
              className="pr-2 flex flex-row items-center rounded-sm"
              onClick={handleCreate}
            >
              <svg className="h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
              </svg>
              Create new
            </CustomButton>
          </div>

          {/* Filters */}
          <div className="w-full flex justify-between items-center gap-4">
            <div className="flex gap-8 text-gray-600 text-sm">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-nowrap">
                  Filter by 
                </div>
                <Filter>
                  All boards
                </Filter>
                <Filter>
                  Owned by anyone
                </Filter>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-nowrap">
                  Sort by 
                </div>
                <Filter>
                  Last opened
                </Filter>
              </div>
            </div>

            <div className="min-w-16">
              End
            </div>
          </div>

          <BoardTable boards={boards} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;