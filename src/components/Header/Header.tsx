import { useEffect, useRef, useState } from 'react'
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
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    const mobileMedia = window.matchMedia('(max-width: 71.99rem)')
    let restoreScroll = () => undefined

    function syncScrollLock() {
      restoreScroll()
      restoreScroll = () => undefined

      if (!mobileMedia.matches) return

      const root = document.documentElement
      const body = document.body
      const previousRootOverflow = root.style.overflow
      const previousBodyOverflow = body.style.overflow
      const previousBodyPadding = body.style.paddingInlineEnd
      const previousBodyPosition = body.style.position
      const previousBodyTop = body.style.top
      const previousBodyInlineSize = body.style.inlineSize
      const scrollbarWidth = window.innerWidth - root.clientWidth
      const scrollPosition = window.scrollY
      const bodyPadding = Number.parseFloat(
        window.getComputedStyle(body).paddingInlineEnd,
      )

      root.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
      body.style.position = 'fixed'
      body.style.top = `-${scrollPosition}px`
      body.style.inlineSize = '100%'

      if (scrollbarWidth > 0) {
        body.style.paddingInlineEnd = `${bodyPadding + scrollbarWidth}px`
      }

      restoreScroll = () => {
        root.style.overflow = previousRootOverflow
        body.style.overflow = previousBodyOverflow
        body.style.paddingInlineEnd = previousBodyPadding
        body.style.position = previousBodyPosition
        body.style.top = previousBodyTop
        body.style.inlineSize = previousBodyInlineSize
        window.scrollTo(0, scrollPosition)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    syncScrollLock()
    mobileMedia.addEventListener('change', syncScrollLock)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      restoreScroll()
      mobileMedia.removeEventListener('change', syncScrollLock)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
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
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          ref={menuButtonRef}
          type="button"
        >
          <span aria-hidden="true" className={styles.menuIcon}>
            <span />
            <span />
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <nav
          aria-label="Мобильная навигация"
          className={styles.mobileNav}
          id="mobile-navigation"
        >
          <div className={`container ${styles.mobileNavInner}`}>
            <div className={styles.mobileLinks}>
              {navigationItems.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={() => {
                    setIsMenuOpen(false)
                    menuButtonRef.current?.focus()
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
