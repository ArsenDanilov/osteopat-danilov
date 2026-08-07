import styles from './Process.module.css'

const steps = [
  {
    title: 'Разговор',
    text: 'Я уточняю, что вас беспокоит, когда появились жалобы, как они менялись со временем и какие обследования уже проводились.',
  },
  {
    title: 'Осмотр',
    text: 'Оцениваю положение тела, подвижность и напряжение тканей, обращаю внимание на особенности, которые могут быть связаны с жалобами.',
  },
  {
    title: 'Остеопатическая работа',
    text: 'Подбираю техники индивидуально и работаю с теми зонами, которые требуют внимания по результатам осмотра.',
  },
  {
    title: 'Завершение приёма',
    text: 'В конце рассказываю о своих наблюдениях, отвечаю на вопросы и при необходимости обсуждаю дальнейший план.',
  },
] as const

export function Process() {
  return (
    <section
      aria-labelledby="process-title"
      className={styles.process}
      id="process"
    >
      <div className="container">
        <h2 className={styles.title} id="process-title">
          Как проходит приём
        </h2>

        <ol className={styles.list}>
          {steps.map((step, index) => (
            <li className={styles.item} key={step.title}>
              <span aria-hidden="true" className={styles.index}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.itemTitle}>{step.title}</h3>
              <p className={styles.itemText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
