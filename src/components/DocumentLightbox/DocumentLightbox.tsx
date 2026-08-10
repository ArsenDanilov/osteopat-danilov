import { useEffect, useId, useRef } from 'react'
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
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog || !item || dialog.open) return

    const root = document.documentElement
    const previousOverflow = root.style.overflow

    dialog.showModal()
    root.style.overflow = 'hidden'

    return () => {
      root.style.overflow = previousOverflow

      if (dialog.open) {
        dialog.close()
      }
    }
  }, [item])

  return (
    <dialog
      aria-labelledby={item ? titleId : undefined}
      className={styles.dialog}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
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
              onClick={() => dialogRef.current?.close()}
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
