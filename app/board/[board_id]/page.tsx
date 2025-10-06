import BoardCanvas from '@/components/Board/Canvas';
import { BoardData } from '@/lib/models/Board';
import { NextPage } from 'next'
import { NextRequest } from 'next/server';

interface Props {
    params: { board_id: string }
}

const BoardPage: NextPage<Props> = async ({ params }) => {
    const { board_id } = params;

    const endpoint = await import('@/app/api/boards/import/[board_id]/route');
    const res = await endpoint.GET({} as unknown as NextRequest, { params: { board_id }});

    if (res.ok) {
        const board: BoardData = await res.json();
        return (
            <BoardCanvas board={board} />
        );

    } else {
        return (
            <div>Invalid page.</div>
        );
    }

}

export default BoardPage;