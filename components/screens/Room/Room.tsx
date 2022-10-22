import ChevronLeft from '@assets/icons/chevron-left.svg'
import Button from '@components/common/Button'
import RoomController from '@components/containers/RoomController'
import RoomPresenter from '@components/containers/RoomPresenter'
import RoomSlides from '@components/containers/RoomSlides'
import { Dialog } from '@headlessui/react'
import useRoom from '@hooks/useRoom'
import type { RoomInfo } from '@services/rooms'
import { useCallback, useEffect, useState } from 'react'
import styles from './Room.module.css'

interface Props {
  roomCode: string
}

type RoomMode = 'presentation' | 'controller' | 'default'

interface RoomState {
  currentSlideId?: string
  roomMode: RoomMode
  roomInfo?: RoomInfo
}

const RoomScreen: React.FC<Props> = ({ roomCode }) => {
  const { data, isError, isLoading } = useRoom({ roomCode })
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0)
  const [roomState, setRoomState] = useState<RoomState>({
    roomMode: 'default'
  })

  const nextSlide = useCallback(() => {
    setCurrentSlideIdx((prevIdx) => {
      if (roomState?.roomInfo?.slides[prevIdx + 1]) {
        return prevIdx + 1
      }
      return prevIdx
    })
  }, [roomState])

  const prevSlide = useCallback(() => {
    setCurrentSlideIdx((prevIdx) => {
      if (roomState.roomInfo?.slides[prevIdx - 1]) return prevIdx - 1
      return prevIdx
    })
  }, [roomState])

  useEffect(() => {
    if (data) {
      const {
        slides: [initialSlide]
      } = data
      if (initialSlide) {
        setRoomState((prevState) => ({
          ...prevState,
          currentSlideId: initialSlide.id,
          roomInfo: data
        }))
        setCurrentSlideIdx(0)
      }
    }
  }, [data])

  useEffect(() => {
    setRoomState((prevState) => ({
      ...prevState,
      currentSlideId: prevState.roomInfo?.slides[currentSlideIdx].id
    }))
  }, [currentSlideIdx])

  if (isLoading || isError) return null

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.subheading}>Room code</h1>
        <span className={styles.roomCode}>{roomCode}</span>
      </header>
      <main className={styles.mainwrapper}>
        <h1 className={styles.heading}>Slides</h1>
        <RoomSlides
          currentSlideId={roomState.currentSlideId ?? ''}
          slides={roomState.roomInfo?.slides ?? []}
          onTapSlide={(id) => {
            const slideIdx = roomState.roomInfo?.slides.findIndex(
              (slide) => slide.id === id
            )
            if (slideIdx !== undefined) setCurrentSlideIdx(slideIdx)
          }}
        />
        <h2 className={styles.subheading}>
          Current Slide {roomState.currentSlideId}
        </h2>
        <div className={styles.buttonsContainer}>
          <Button
            onClick={() =>
              setRoomState((prevState) => ({
                ...prevState,
                roomMode: 'presentation'
              }))
            }
          >
            Presentation Mode
          </Button>
          <div style={{ height: 6 }} />
          <Button
            onClick={() =>
              setRoomState((prevState) => ({
                ...prevState,
                roomMode: 'controller'
              }))
            }
            variant="secondary"
          >
            Controller Mode
          </Button>
        </div>
      </main>
      <Dialog
        open={roomState.roomMode === 'presentation'}
        onClose={() =>
          setRoomState((prevState) => ({
            ...prevState,
            roomMode: 'default'
          }))
        }
      >
        <div className={styles.modalBackground}></div>
        <Dialog.Panel className={styles.modalContent}>
          {roomState.roomInfo ? (
            <RoomPresenter
              renderHeader={() => (
                <button
                  className={styles.backButtonPresenter}
                  onClick={() =>
                    setRoomState((prevState) => ({
                      ...prevState,
                      roomMode: 'default'
                    }))
                  }
                >
                  <ChevronLeft height={12} />
                  back
                </button>
              )}
              currentSlideId={roomState.currentSlideId ?? ''}
              slides={roomState.roomInfo?.slides}
            />
          ) : null}
        </Dialog.Panel>
      </Dialog>
      <Dialog
        open={roomState.roomMode === 'controller'}
        onClose={() =>
          setRoomState((prevState) => ({
            ...prevState,
            roomMode: 'default'
          }))
        }
      >
        <div className={styles.modalBackground}></div>
        <Dialog.Panel className={styles.modalContent}>
          <RoomController
            onTapNextButton={nextSlide}
            onTapPrevButton={prevSlide}
            renderHeader={() => (
              <button
                className={styles.backButtonController}
                onClick={() =>
                  setRoomState((prevState) => ({
                    ...prevState,
                    roomMode: 'default'
                  }))
                }
              >
                <ChevronLeft height={12} />
                back
              </button>
            )}
            renderFooter={() => (
              <span className={styles.controllerFooter}>
                {currentSlideIdx + 1}/{roomState.roomInfo?.slides.length || ''}
              </span>
            )}
          />
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
export default RoomScreen
