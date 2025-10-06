import { NextPage } from 'next'
import BoardItem from './BoardItem';
import { BoardData } from '@/lib/models/Board';

interface Props {
    boards: BoardData[]
}

const BoardTable: NextPage<Props> = ({ boards }) => {
    if (boards.length) {
        return (
            <div className="flex flex-col gap-2">
                {/* Table header */}
                <div className="w-full flex flex-row gap-10 ml-2 mb-2">
                    <div className="flex-5">Name</div>
                    <div className="flex-2 hidden xl:block">Online users</div>
                    <div className="flex-2 hidden 2xl:block">Last opened</div>
                    <div className="flex-2 hidden sm:block">Owner</div>
                    <div className="flex-none w-20 h-4"></div>
                </div>

                {/* Boards */}
                { boards.map(board => (
                    <BoardItem key={board._id} board={board} />     
                ))}
            </div>
        );
    } else {
        return (
            <div>No boards found...</div>
        );
    }
}

export default BoardTable;