import practicePhoto from '../../assets/images/IMG_6271.jpg'
import styles from './About.module.css'

const facts = [
  { value: 'Более 30 лет', label: 'в медицине' },
  { value: 'С 2014 года', label: 'остеопатическая практика' },
  { value: 'Взрослые, дети', label: 'и новорождённые' },
] as const

export function About() {
  return (
    <section aria-labelledby="about-title" className={styles.about} id="about">
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <h2 className={styles.title} id="about-title">
            Обо мне
          </h2>
          <div className={styles.copy}>
            <p>
              Я врач-остеопат. В медицине работаю более 30 лет, а с 2014 года
              веду остеопатическую практику после окончания Института остеопатии
              Санкт-Петербурга при СПбГУ и СЗГМУ им. И. И. Мечникова.
            </p>
            <p>
              В работе использую подходы биодинамики, краниосакральной терапии и
              структуральной остеопатии. Продолжаю обучение и профессиональное
              развитие.
            </p>
            <p>
              Работаю со взрослыми, детьми и новорождёнными. Для меня важно
              сначала разобраться, что именно беспокоит человека и как
              проявляется его состояние, а затем подобрать подход к работе
              индивидуально.
            </p>
          </div>

          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div className={styles.fact} key={fact.value}>
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className={styles.photoFrame}>
          <img
            alt="Дмитрий Данилов во время остеопатического приёма"
            className={styles.photo}
            decoding="async"
            height="1280"
            loading="lazy"
            src={practicePhoto}
            width="960"
          />
        </figure>
      </div>
    </section>
  )
}
