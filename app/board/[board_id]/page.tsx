import { getBoardById } from '@/app/actions';
import CanvasPage from '@/components/Board/CanvasPage';
import FallbackPage from '@/components/Board/FallbackPage';
import { NextPage } from 'next'

interface Props {
    params: { board_id: string }
}

const BoardPage: NextPage<Props> = async ({ params }) => {
    const { board_id } = await params;
    const board = await getBoardById(board_id);
    
    // Choose page based on result
    return board
        ? <CanvasPage board={board} />
        : <FallbackPage />;
}

export default BoardPage;