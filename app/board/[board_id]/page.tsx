import { NextPage } from 'next'

interface Props {
    params: { board_id: string }
}

const BoardPage: NextPage<Props> = ({ params }) => {
    const { board_id } = params;

    return <div>{board_id}</div>
}

export default BoardPage;