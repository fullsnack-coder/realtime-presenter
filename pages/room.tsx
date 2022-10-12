import { NextPage } from 'next'
import useRoom from '../hooks/useRoom'
const RoomPage: NextPage = () => {
  const { data } = useRoom({ roomCode: 'random', roomPassword: 'password' })

  if (!data) return null

  return (
    <div>
      Room code <span>RANDOM CODE</span>
      <h1>SLIDES</h1>
      <div>{data.slides.map(({ id, slideURI }) => (
        <img key={id} src={slideURI} alt={id} />
      ))}</div>
    </div>
  )
}

export default RoomPage
