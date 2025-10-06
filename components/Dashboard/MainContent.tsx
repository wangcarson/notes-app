"use client";

import { addBoardCollaborator, createBoard, deleteBoard, getBoardsByUser } from "@/app/actions";
import RecentsTable from "@/components/Dashboard/RecentsTable";
import Filter from "@/components/Dashboard/Filter";
import CustomButton from "@/components/Templates/CustomButton";
import { BoardData } from "@/lib/models/Board";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import TableFilters from "./TableFilters";
import toast from "react-hot-toast";

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

  const handleAdd = async (
    board: BoardData, 
    user_id: string = '68e03356f3a48e0f086b51ef',
    user_name: string = 'Carson Wang',
  ) => {
      const success = await addBoardCollaborator(board._id, user_id, user_name);
      if (success) {
          toast.success("Added collaborator!");
      } else {
          toast.error("Failed to add collaborator");
      }
  }

  const handleDelete = async (board: BoardData) => {
      const success = await deleteBoard(board._id);
      if (success) {
          toast.success("Deleted board!");
          router.refresh();
      } else {
          toast.error("Failed to delete board");
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

      <RecentsTable boards={boards} handleAdd={handleAdd} handleDelete={handleDelete} />
    </div>
  );
}

export default MainContent;