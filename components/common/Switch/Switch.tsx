import { Switch as HeadlessUISwitch } from '@headlessui/react'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Switch.module.css'

export interface Props {
  onValueChange: (value: boolean) => void
  buttonOn?: (checked: boolean) => JSX.Element
  buttonOff?: (checked: boolean) => JSX.Element
  checked?: boolean
  defaultChecked?: boolean
  renderThumb?: (checked: boolean, suggestedThumbWith: number) => JSX.Element
}

const Switch: React.FC<Props> = ({
  onValueChange,
  buttonOn,
  buttonOff,
  checked = false,
  defaultChecked = false,
  renderThumb
}) => {
  const buttonOffWrapperRef = useRef<HTMLDivElement>(null)
  const buttonOnWrapperRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const [thumbWidth, setThumbWidth] = useState(0)

  useEffect(() => {
    if (defaultChecked) {
      setThumbWidth(buttonOnWrapperRef.current?.clientWidth ?? 0)
      thumbRef.current?.style.setProperty('--translation', `${buttonOffWrapperRef.current?.clientWidth ?? 0}px`)
    } else {
      setThumbWidth(buttonOffWrapperRef.current?.clientWidth ?? 0)
      thumbRef.current?.style.setProperty('--translation', '0px')
    }
  }, [defaultChecked])

  const handleChange = useCallback(
    (currentValue: boolean) => {
      if (currentValue) {
        setThumbWidth(buttonOnWrapperRef.current?.clientWidth ?? 0)
        thumbRef.current?.style.setProperty('--translation', `${(buttonOffWrapperRef.current?.clientWidth ?? 0)}px`)
      } else {
        setThumbWidth(buttonOffWrapperRef.current?.clientWidth ?? 0)
        thumbRef.current?.style.setProperty('--translation', '0px')
      }
      onValueChange(currentValue)
    },
    [onValueChange]
  )

  return (
    <HeadlessUISwitch
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={handleChange}
      style={{ width: 'fit-content' }}
    >
      {({ checked: isChecked }) => (
        <div className={clsx(styles.switchBox, { [styles.active]: isChecked })}>
          <div className={styles.switchButton} ref={buttonOffWrapperRef}>{buttonOff?.(isChecked)}</div>
          <div className={styles.switchButton} ref={buttonOnWrapperRef}>{buttonOn?.(isChecked)}</div>
          {renderThumb
            ? (
                renderThumb(isChecked, thumbWidth)
              )
            : (
            <div ref={thumbRef} className={styles.switchThumb} style={{ width: thumbWidth }} />
              )}
        </div>
      )}
    </HeadlessUISwitch>
  )
}

export default Switch
