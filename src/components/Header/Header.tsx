import { useEffect, useRef, useState } from 'react'
import { lockPageScroll } from '../../utils/scrollLock'
import { ContactMethodSelector } from '../ContactMethodSelector/ContactMethodSelector'
import styles from './Header.module.css'

const navigationItems = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Как проходит приём', href: '#process' },
  { label: 'Образование', href: '#education' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
] as const

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuMounted, setIsMenuMounted] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuMounted) return

    const mobileMedia = window.matchMedia('(max-width: 71.99rem)')
    let unlockScroll: () => void = () => undefined

    function syncScrollLock() {
      unlockScroll()
      unlockScroll = () => undefined

      if (!mobileMedia.matches) return

      unlockScroll = lockPageScroll()
    }

    syncScrollLock()
    mobileMedia.addEventListener('change', syncScrollLock)

    return () => {
      unlockScroll()
      mobileMedia.removeEventListener('change', syncScrollLock)
    }
  }, [isMenuMounted])

  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  function openMenu() {
    setIsMenuMounted(true)
    setIsMenuOpen(true)
  }

  function closeMenu(options?: { restoreFocus?: boolean }) {
    setIsMenuOpen(false)

    if (options?.restoreFocus !== false) {
      menuButtonRef.current?.focus()
    }
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a
          className={styles.brand}
          href="#top"
          aria-label="Дмитрий Данилов — к началу страницы"
        >
          <span className={styles.brandName}>Дмитрий Данилов</span>
          <span className={styles.brandDescriptor}>Врач-остеопат</span>
        </a>

        <nav aria-label="Основная навигация" className={styles.desktopNav}>
          {navigationItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <ContactMethodSelector
          align="end"
          className={styles.desktopAction}
          label="Записаться на приём"
        />

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          className={styles.menuButton}
          onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
          ref={menuButtonRef}
          type="button"
        >
          <span aria-hidden="true" className={styles.menuIcon}>
            <span />
            <span />
          </span>
        </button>
      </div>

      {isMenuMounted && (
        <nav
          aria-label="Мобильная навигация"
          aria-hidden={!isMenuOpen}
          className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}
          id="mobile-navigation"
          inert={!isMenuOpen}
          onTransitionEnd={(event) => {
            if (
              event.target === event.currentTarget &&
              event.propertyName === 'opacity' &&
              !isMenuOpen
            ) {
              setIsMenuMounted(false)
            }
          }}
        >
          <div className={`container ${styles.mobileNavInner}`}>
            <div className={styles.mobileLinks}>
              {navigationItems.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={() => {
                    closeMenu({
                      restoreFocus: false,
                    })
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <ContactMethodSelector
              className={styles.mobileAction}
              label="Записаться на приём"
            />
          </div>
        </nav>
      )}
    </header>
  )
}
