import type { Slide as SlideInfo } from '@services/rooms'
import styles from './Slide.module.css'

interface Props {
  slideInfo: SlideInfo
}

const Slide: React.FC<Props> = ({ slideInfo }) => {
  const { id, slideURI } = slideInfo
  return (
    <article className={styles.slidewrapper}>
      <div className={styles.overlay} />
      <img src={slideURI} alt={`slide-${id}`} />
    </article>
  )
}

export default Slide
