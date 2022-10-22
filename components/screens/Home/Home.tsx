import { Dialog } from '@headlessui/react'
import { useCallback, useState } from 'react'
import JoinRoomForm from '../../containers/JoinRoomForm'
import NewRoomForm from '../../containers/NewRoomForm'
import styles from './Home.module.css'

const HomeScreen: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleJoinToRoom = useCallback((roomCode = '') => {
    alert(roomCode)
  }, [])

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>REALTIME PRESENTER</h1>
      <JoinRoomForm
        onSubmitJoinRoom={handleJoinToRoom}
        createRoomAction={() => setIsOpen(true)}
      />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.modalBackground} />
        <Dialog.Panel className={styles.modalPanel}>
          <NewRoomForm onSubmitNewRoom={(e) => alert(JSON.stringify(e))} />
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}

export default HomeScreen
