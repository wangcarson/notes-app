import { NextPage } from 'next'
import BoardItem, { BoardData } from './BoardItem';

interface Props {
    boards: BoardData[]
}

const BoardTable: NextPage<Props> = ({ boards }) => {
    return (
        <div className="bg-purple-100 flex flex-col gap-2">
            {/* Table header */}
            <div className="w-full flex flex-row gap-10 mb-2">
                <div className="flex-5 bg-orange-100">Name</div>
                <div className="flex-2 bg-orange-100 hidden sm:block">Online users</div>
                <div className="flex-2 bg-orange-100 hidden 2xl:block">Last opened</div>
                <div className="flex-2 bg-orange-100 hidden xl:block">Owner</div>
                <div className="flex-none w-20 h-4"></div>
            </div>

            {/* Boards */}
            { boards.map((board: BoardData) => (
                <BoardItem key={board.id} board={board} />     
            ))}
        </div>
    );
}

export default BoardTable;