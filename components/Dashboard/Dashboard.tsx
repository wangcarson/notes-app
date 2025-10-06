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
  console.log(boards);

  return (
    <div className="bg-red-100 min-h-screen flex flex-row">
      <Sidebar width={sidebarWidth} />

      <div
        className="flex flex-col grow lg:ml-[var(--sidebar-padding)]"
        style={{ '--sidebar-padding': `${sidebarWidth}px` } as React.CSSProperties}
      >
        <Header left={sidebarWidth} height={headerHeight} />

        {/* Main content */}
        <div className="h-full p-6 bg-green-100 flex flex-col gap-6" style={{ marginTop: headerHeight }}>

          <div className="bg-purple-100 w-full flex flex-row justify-between">
            <p className="text-2xl">Recent boards and documents</p>

            {/* Create board */}
            <CustomButton colour="customgreen" className="pr-2 flex flex-row items-center rounded-sm">
              <svg className="h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
              </svg>
              Create new
            </CustomButton>
          </div>

          {/* Filters */}
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

          <BoardTable boards={boards} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;