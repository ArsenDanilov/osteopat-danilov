import { ContactMethodSelector } from '../../components/ContactMethodSelector/ContactMethodSelector'
import styles from './Requests.module.css'

const requests = [
  { title: 'Боль и дискомфорт в спине и шее' },
  { title: 'Боль и ограничение подвижности в суставах' },
  { title: 'Головные боли и головокружения' },
  { title: 'Мышечное напряжение и перегрузки' },
  { title: 'Последствия перенесённых травм' },
  {
    title: 'Другие функциональные жалобы',
    note: 'в том числе хроническая тазовая боль и ощущение асимметрии таза',
  },
] as const

export function Requests() {
  return (
    <section aria-labelledby="requests-title" className={styles.requests}>
      <div className="container">
        <h2 className={styles.title} id="requests-title">
          С какими запросами обращаются
        </h2>

        <ul className={styles.list}>
          {requests.map((request, index) => (
            <li className={styles.item} key={request.title}>
              <span aria-hidden="true" className={styles.index}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className={styles.itemTitle}>{request.title}</p>
                {'note' in request && (
                  <p className={styles.itemNote}>{request.note}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.prompt}>
          <div>
            <h3 className={styles.promptTitle}>
              Не уверены, подходит ли ваш случай?
            </h3>
            <p className={styles.promptText}>
              Можно задать мне вопрос удобным способом.
            </p>
          </div>
          <ContactMethodSelector
            className={styles.promptAction}
            label="Задать вопрос"
            variant="secondary"
          />
        </div>
      </div>
    </section>
  )
}
