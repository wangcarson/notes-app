"use client";

import { createBoard } from "@/app/actions";
import BoardTable from "@/components/Dashboard/BoardTable";
import Filter from "@/components/Dashboard/Filter";
import CustomButton from "@/components/Templates/CustomButton";
import { BoardData } from "@/lib/models/Board";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

interface Props {
    top: number,
    boards: BoardData[],
}

const MainContent: NextPage<Props> = ({ top, boards }) => {
  const router = useRouter();

  const handleCreate = async () => {
      const board = await createBoard();

      if (board) {
          router.push(`/board/${board._id}`);
      }
  }

  return (
    <div className="h-full p-6 flex flex-col gap-6" style={{ marginTop: top }}>

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
  );
}

export default MainContent;