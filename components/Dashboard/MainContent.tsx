"use client";

import { createBoard } from "@/app/actions";
import RecentsTable from "@/components/Dashboard/RecentsTable";
import Filter from "@/components/Dashboard/Filter";
import CustomButton from "@/components/Templates/CustomButton";
import { BoardData } from "@/lib/models/Board";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import TableFilters from "./TableFilters";

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
      <TableFilters />

      <RecentsTable boards={boards} />
    </div>
  );
}

export default MainContent;