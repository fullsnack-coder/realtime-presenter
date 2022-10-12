import clsx from 'clsx'
import { SyntheticEvent, useCallback, useState } from 'react'
import Button from '../../common/Button'
import FormField from '../../common/FormField'
import styles from './NewRoomForm.module.css'

interface NewRoomFormValues {
  roomName: string
  roomPassword?: string
  roomPrivacy?: RoomPrivacy
}

type RoomPrivacy = 'private' | 'public'

interface Props {
  onSubmitNewRoom: (values: NewRoomFormValues) => void
  isSubmitting?: boolean
  defaultRoomPrivacy?: RoomPrivacy
}

const NewRoomForm: React.FC<Props> = ({
  onSubmitNewRoom,
  isSubmitting = false,
  defaultRoomPrivacy = 'public'
}) => {
  const [roomName, setRoomName] = useState('')
  const [roomPassword, setRoomPassword] = useState('')
  const [roomPrivacy, setRoomPrivacy] =
    useState<RoomPrivacy>(defaultRoomPrivacy)

  const isPrivate = roomPrivacy === 'private'

  const handleCreateNewRoom = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      const values: NewRoomFormValues = { roomName, roomPrivacy }
      if (isPrivate) values.roomPassword = roomPassword
      onSubmitNewRoom(values)
    },
    [onSubmitNewRoom, roomName, isPrivate, roomPassword, roomPrivacy]
  )

  return (
    <form className={styles.formbox} onSubmit={handleCreateNewRoom}>
      <h1 className={styles.formheading}>Create New Presentation Room</h1>
      <FormField.Text
        type="text"
        label="Room Name"
        value={roomName}
        placeholder="Type the room name here..."
        onChange={(e) => setRoomName(e.target.value)}
      />
      <div style={{ margin: '12px 0' }}>
        <FormField.Switch
          label="Room Privacy"
          checked={isPrivate}
          buttonOff={() => (
            <span
              className={clsx(styles.switchText, {
                [styles.textActive]: !isPrivate
              })}
            >
              PUBLIC ROOM
            </span>
          )}
          buttonOn={() => (
            <span
              className={clsx(styles.switchText, {
                [styles.textActive]: isPrivate
              })}
            >
              PRIVATE
            </span>
          )}
          onValueChange={(value: Boolean) =>
            setRoomPrivacy(value ? 'private' : 'public')
          }
        />
      </div>
      {isPrivate
        ? (
        <FormField.Text
          label="Room Password"
          value={roomPassword}
          type="password"
          placeholder="Type the room password here..."
          onChange={(e) => setRoomPassword(e.target.value)}
          containerStyles={{ marginBottom: 12 }}
        />
          )
        : null}
      <Button isLoading={isSubmitting} type="submit">
        Create ROOM
      </Button>
    </form>
  )
}

export default NewRoomForm
