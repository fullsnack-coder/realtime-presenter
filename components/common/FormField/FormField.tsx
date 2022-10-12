import { ChangeEventHandler, CSSProperties, HTMLProps } from 'react'
import Switch, { Props as SwitchProps } from '../Switch'
import styles from './FormField.module.css'

interface Props {
  label: string | JSX.Element
  idInput?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  containerStyles?: CSSProperties
}

interface FieldTypes {
  Text: React.FC<Props & Omit<HTMLProps<HTMLInputElement>, 'onChange'>>
  Switch: React.FC<Omit<Props, 'onChange' | 'idInput'> & SwitchProps>
}

const TextField: FieldTypes['Text'] = ({ label, idInput, containerStyles, ...rest }) => {
  return (
    <div className={styles.fieldwrapper} style={containerStyles}>
      <label className={styles.label} htmlFor={idInput}>{label}</label>
      <input className={styles.input} id={idInput} {...rest} />
    </div>
  )
}

const SwitchField: FieldTypes['Switch'] = ({ label, containerStyles, ...rest }) => {
  return (
    <div className={styles.fieldwrapper} style={containerStyles}>
      <label className={styles.label}>{label}</label>
      <Switch {...rest} />
    </div>
  )
}

const FormField: FieldTypes = {
  Text: TextField,
  Switch: SwitchField
}

export default FormField
