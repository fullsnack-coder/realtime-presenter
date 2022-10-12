import { HTMLProps, PropsWithChildren } from 'react'
import { clsx } from 'clsx'
import styles from './Button.module.css'

type Props = {
  isLoading?: boolean
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
} & Omit<HTMLProps<HTMLButtonElement>, 'type'>

const Button: React.FC<PropsWithChildren<Props>> = ({ children, isLoading = false, variant = 'primary', type = 'button', ...rest }) => {
  const buttonStyles = clsx(styles.button, {
    [styles.primary]: variant === 'primary',
    [styles.secondary]: variant === 'secondary',
    [styles.isLoading]: isLoading
  })
  return (
    <button disabled={isLoading} type={type} className={buttonStyles} {...rest}>{children}</button>
  )
}

export default Button
