import portrait from '../../assets/images/dmitry-portrait-temp.jpg'
import { ContactMethodSelector } from '../../components/ContactMethodSelector/ContactMethodSelector'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero} id="top">
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Врач-остеопат в Москве</p>
          <h1 className={styles.title} id="hero-title">
            Дмитрий Данилов
          </h1>
          <p className={styles.experience}>
            <span>Более 30 лет в медицине.</span>
            <span>Остеопатическая практика с 2016 года.</span>
          </p>
          <p className={styles.description}>
            Работаю со взрослыми, детьми и новорождёнными. На приёме учитываю
            жалобы, историю их появления, результаты обследований и общее
            состояние пациента.
          </p>
          <div className={styles.actions}>
            <ContactMethodSelector label="Записаться на приём" />
            <ContactMethodSelector label="Задать вопрос" variant="secondary" />
          </div>
          <p className={styles.details}>м. Таганская · 10 000 ₽ · 45 минут</p>
        </div>

        <figure className={styles.portraitFrame}>
          <img
            alt="Дмитрий Данилов, врач-остеопат"
            className={styles.portrait}
            height="500"
            src={portrait}
            width="500"
          />
        </figure>
      </div>
    </section>
  )
}
