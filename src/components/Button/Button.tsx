import { forwardRef, type ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, type = 'button', variant = 'primary', ...props },
    ref,
  ) {
    const classes = [styles.button, styles[variant], className]
      .filter(Boolean)
      .join(' ')

    return <button ref={ref} className={classes} type={type} {...props} />
  },
)
