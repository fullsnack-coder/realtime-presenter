import Button from '@components/common/Button'
import FormField from '@components/common/FormField'
import { useCallback, useState } from 'react'
import styles from './JoinRoomForm.module.css'

interface Props {
  onSubmitJoinRoom: (roomCode: string) => void
  createRoomAction: () => void
}

const JoinRoomForm: React.FC<Props> = ({
  onSubmitJoinRoom,
  createRoomAction
}) => {
  const [roomCode, setRoomCode] = useState('')

  const handleJoinToRoom = useCallback(() => {
    onSubmitJoinRoom(roomCode)
  }, [onSubmitJoinRoom, roomCode])

  return (
    <form className={styles.formbox}>
      <FormField.Text
        label="Room Code"
        type="text"
        placeholder="Type your room code here..."
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <div className={styles.optionsWrapper}>
        <Button onClick={handleJoinToRoom}>GO TO ROOM</Button>
        <div style={{ height: 6 }} />
        <Button variant="secondary" onClick={createRoomAction}>
          Create One
        </Button>
      </div>
    </form>
  )
}

export default JoinRoomForm
