import ChevronLeft from '@assets/icons/chevron-left.svg'
import ChevronRight from '@assets/icons/chevron-right.svg'
import styles from './RoomController.module.css'

interface Props {
  onTapNextButton: () => void
  onTapPrevButton: () => void
  renderHeader?: () => JSX.Element
  renderFooter?: () => JSX.Element
}

const RoomController: React.FC<Props> = ({
  renderHeader,
  renderFooter,
  onTapNextButton,
  onTapPrevButton
}) => {
  return (
    <div className={styles.roomControllerContainer}>
      <header className={styles.roomControllerHeader}>
        {renderHeader?.()}
      </header>
      <div className={styles.controlsWrapper}>
        <button className={styles.controllerButton} onClick={onTapPrevButton}>
          <ChevronLeft height={48} />
        </button>
        <button className={styles.controllerButton} onClick={onTapNextButton}>
          <ChevronRight height={48} />
        </button>
      </div>
      <footer className={styles.roomControllerFooter}>
        {renderFooter?.()}
      </footer>
    </div>
  )
}

export default RoomController
