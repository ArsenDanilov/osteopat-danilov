import { contactDetails } from '../../config/contact'
import styles from './Footer.module.css'

const footerContactMethods = [
  { label: 'Телефон', href: contactDetails.phone.href },
  contactDetails.telegram,
  contactDetails.whatsapp,
] as const

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a
          aria-label="Дмитрий Данилов — к началу страницы"
          className={styles.brand}
          href="#top"
        >
          <span className={styles.brandName}>Дмитрий Данилов</span>
          <span className={styles.brandDescriptor}>Врач-остеопат</span>
        </a>

        <div className={styles.links}>
          {footerContactMethods.map((method) => (
            <a href={method.href} key={method.href}>
              {method.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
