import { contactDetails } from '../../config/contact'
import styles from './Visit.module.css'

const practicalFacts = [
  {
    label: 'Стоимость',
    value: '10 000 ₽',
  },
  {
    label: 'Продолжительность',
    value: 'около 45 минут',
  },
  {
    label: 'Адрес',
    value: 'Москва, ул. Верхняя Радищевская, 16с2',
    note: '7 минут пешком от м. Таганская, кольцевая линия',
  },
] as const

const contactMethods = [
  contactDetails.phone,
  contactDetails.telegram,
  contactDetails.whatsapp,
] as const

export function Visit() {
  return (
    <section aria-labelledby="visit-title" className={styles.visit} id="visit">
      <div className={`container ${styles.layout}`}>
        <h2 className={styles.title} id="visit-title">
          Приём
        </h2>

        <div className={styles.content}>
          <dl className={styles.facts}>
            {practicalFacts.map((fact) => (
              <div className={styles.fact} key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>
                  <span className={styles.factValue}>{fact.value}</span>
                  {'note' in fact && (
                    <span className={styles.factNote}>{fact.note}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.contacts}>
            <p className={styles.contactsLabel}>Связаться и записаться</p>
            <div className={styles.contactLinks}>
              {contactMethods.map((method) => (
                <a
                  className={styles.contactLink}
                  href={method.href}
                  key={method.href}
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
        </div>
      </div>
    </section>
  )
}
