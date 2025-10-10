import { addBoardCollaborator, deleteBoard } from '@/app/actions';
import { BoardData } from '@/lib/models/Board';
import { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
    board: BoardData,
    handleAdd: () => void,
    handleDelete: () => void,
}

const TableItem: NextPage<Props> = ({ board, handleAdd, handleDelete }) => {
    const router = useRouter();

    const { data: session } = useSession();
    const uid = session?.user.id;

    const formattedDate = (new Date(board.updatedAt)).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
    });

    const onClick = () => {
        router.push(`/board/${board._id}`);
    }

    return (
        <div className="bg-white hover:bg-gray-100 w-full h-16 flex flex-row gap-10 items-center rounded-lg px-4">

            {/* Title */}
            <div className="flex-5 flex items-center gap-4 cursor-pointer" onClick={onClick}>
                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 14H4m6.5 3L8 20m5.5-3 2.5 3M4.88889 17H19.1111c.4909 0 .8889-.4157.8889-.9286V4.92857C20 4.41574 19.602 4 19.1111 4H4.88889C4.39797 4 4 4.41574 4 4.92857V16.0714c0 .5129.39797.9286.88889.9286ZM13 14v-3h4v3h-4Z"/>
                </svg>

                <div className="flex flex-col">
                    <p className="text-md font-bold">
                        { board.title }
                    </p>
                    <p className='text-sm'>
                        Modified by { board.updatedAtUser?.name ?? board.author.name } on { formattedDate }
                    </p>
                </div>
            </div>

            <div className="flex-2 hidden xl:block text-sm">
                { board.onlineUsers }
            </div>
            <div className="flex-2 hidden 2xl:block text-sm"> 
                {/* Last opened */}
                { formattedDate } 
            </div>
            <div className="flex-2 hidden sm:block text-sm">
                { board.author.name }
            </div>

            <div className="flex-none h-4 flex items-center gap-2">
                {/* Favourite */}
                <div onClick={handleAdd} className="flex w-6 h-6 rounded-sm justify-center items-center hover:bg-gray-200 cursor-pointer">
                    { uid && board.likedBy.includes(uid) ? (
                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                        </svg>
                    ) : (
                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeWidth="1.5" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                        </svg>
                    )}
                </div>

                {/* Delete */}
                <div onClick={handleDelete} className="flex w-6 h-6 rounded-sm justify-center items-center hover:bg-gray-200 cursor-pointer">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default TableItem;