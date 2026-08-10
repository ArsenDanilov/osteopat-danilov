import { useEffect, useId, useRef, useState } from 'react'
import { lockPageScroll } from '../../utils/scrollLock'
import styles from './DocumentLightbox.module.css'

export interface LightboxDocument {
  alt: string
  height: number
  image: string
  title: string
  width: number
}

interface DocumentLightboxProps {
  item: LightboxDocument | null
  onClose: () => void
}

export function DocumentLightbox({ item, onClose }: DocumentLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isClosing, setIsClosing] = useState(false)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog || !item || dialog.open) return

    const unlockScroll = lockPageScroll()
    dialog.showModal()

    return () => {
      if (dialog.open) {
        dialog.close()
      }

      unlockScroll()
    }
  }, [item])

  function beginClose() {
    if (!dialogRef.current?.open || isClosing) return

    setIsClosing(true)
  }

  return (
    <dialog
      aria-labelledby={item ? titleId : undefined}
      className={`${styles.dialog} ${isClosing ? styles.closing : ''}`}
      onCancel={(event) => {
        event.preventDefault()
        beginClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          beginClose()
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          beginClose()
        }
      }}
      onClose={() => {
        setIsClosing(false)
        onClose()
      }}
      onTransitionEnd={(event) => {
        if (
          event.target === event.currentTarget &&
          event.propertyName === 'opacity' &&
          isClosing
        ) {
          dialogRef.current?.close()
        }
      }}
      ref={dialogRef}
    >
      {item && (
        <div className={styles.content}>
          <div className={styles.toolbar}>
            <p className={styles.title} id={titleId}>
              {item.title}
            </p>
            <button
              autoFocus
              className={styles.closeButton}
              onClick={beginClose}
              type="button"
            >
              Закрыть
            </button>
          </div>

          <figure className={styles.figure}>
            <img
              alt={item.alt}
              className={styles.image}
              decoding="async"
              height={item.height}
              src={item.image}
              width={item.width}
            />
          </figure>
        </div>
      )}
    </dialog>
  )
}
