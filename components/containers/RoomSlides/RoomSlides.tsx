import CloseIcon from '@assets/icons/close.svg'
import Slide from '@components/Slide'
import type { Slide as SlideInfo } from '@services/rooms'

import clsx from 'clsx'
import styles from './RoomSlides.module.css'

interface Props {
  currentSlideId: SlideInfo['id']
  slides: SlideInfo[]
  onTapSlide?: (slideId: SlideInfo['id']) => void
  onCloseSlide?: (slideId: SlideInfo['id']) => void
}

const RoomSlides: React.FC<Props> = ({
  slides,
  currentSlideId,
  onTapSlide,
  onCloseSlide
}) => {
  return (
    <div className={styles.slidesWrapper}>
      {slides.map((slide) => (
        <div
          className={clsx(styles.slideWrapper, {
            [styles.isActive]: currentSlideId === slide.id
          })}
          key={slide.id}
        >
          <button
            className={styles.closeButton}
            onClick={() => onCloseSlide?.(slide.id)}
          >
            <CloseIcon height={16} />
          </button>
          <div role="button" onClick={() => onTapSlide?.(slide.id)}>
            <Slide slideInfo={slide} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoomSlides
