import { NextPage } from 'next'

interface Props {}

const FallbackPage: NextPage<Props> = ({}) => {
  return <div>Unauthorized.</div>
}

export default FallbackPage;