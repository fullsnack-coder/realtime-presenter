import { Slide } from '@services/rooms'
import styles from './RoomPresenter.module.css'

interface Props {
  currentSlideId: string
  slides: Slide[]
  renderHeader?: (index: number, total: number) => JSX.Element
  renderFooter?: (index: number, total: number) => JSX.Element
}

const RoomPresenter: React.FC<Props> = ({
  currentSlideId,
  slides,
  renderHeader,
  renderFooter
}) => {
  const currentIdx = slides.findIndex(({ id }) => id === currentSlideId)
  const [{ slideURI: slideImageUrl }] = slides.filter(
    ({ id }) => id === currentSlideId
  )

  return (
    <div className={styles.container}>
      <header className={styles.presenterHeader}>
        {renderHeader?.(currentIdx, slides.length)}
      </header>
      <img className={styles.image} src={slideImageUrl} alt="slide-image" />
      <footer className={styles.presenterFooter}>
        {renderFooter?.(currentIdx, slides.length)}
      </footer>
    </div>
  )
}

export default RoomPresenter
