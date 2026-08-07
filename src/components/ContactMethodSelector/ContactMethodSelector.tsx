import { useEffect, useId, useRef, useState } from 'react'
import { contactMethods } from '../../config/contact'
import { Button } from '../Button/Button'
import styles from './ContactMethodSelector.module.css'

interface ContactMethodSelectorProps {
  label: string
  variant?: 'primary' | 'secondary'
  align?: 'start' | 'end'
  className?: string
}

export function ContactMethodSelector({
  label,
  variant = 'primary',
  align = 'start',
  className,
}: ContactMethodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()
  const headingId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!isOpen) return

    firstLinkRef.current?.focus()

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function closeAndRestoreFocus() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const rootClasses = [styles.root, styles[align], className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClasses} ref={rootRef}>
      <Button
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((isCurrentlyOpen) => !isCurrentlyOpen)}
        ref={triggerRef}
        variant={variant}
      >
        {label}
      </Button>

      {isOpen && (
        <>
          <button
            aria-label="Закрыть выбор способа связи"
            className={styles.backdrop}
            onClick={closeAndRestoreFocus}
            type="button"
          />
          <div
            aria-labelledby={headingId}
            className={styles.panel}
            id={panelId}
            role="group"
          >
            <div className={styles.headingRow}>
              <p className={styles.heading} id={headingId}>
                Выберите способ связи
              </p>
              <button
                aria-label="Закрыть"
                className={styles.closeButton}
                onClick={closeAndRestoreFocus}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className={styles.links}>
              {contactMethods.map((method, index) => (
                <a
                  className={styles.contactLink}
                  href={method.href}
                  key={method.href}
                  onClick={() => setIsOpen(false)}
                  ref={index === 0 ? firstLinkRef : undefined}
                >
                  <span>{method.label}</span>
                  {'display' in method && (
                    <span className={styles.contactDetail}>
                      {method.display}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
