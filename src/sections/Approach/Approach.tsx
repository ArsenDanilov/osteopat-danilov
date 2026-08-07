import styles from './Approach.module.css'

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className={styles.approach}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.headingGroup}>
          <p className={styles.eyebrow}>Подход</p>
          <h2 className={styles.title} id="approach-title">
            Внимание не только к месту, где появилась боль
          </h2>
        </div>

        <div className={styles.copy}>
          <p>
            Я оцениваю состояние в целом: учитываю жалобы, историю их появления,
            результаты обследований, особенности подвижности и напряжения
            тканей.
          </p>
          <p>
            Место, где ощущается боль или дискомфорт, не всегда существует
            изолированно от других участков тела. Поэтому во время осмотра я
            обращаю внимание и на связанные с ним ограничения подвижности и
            напряжение.
          </p>
          <p>
            Моя задача — составить целостное представление о ситуации и
            подобрать остеопатическую работу индивидуально, с учётом состояния и
            особенностей конкретного человека.
          </p>
        </div>
      </div>
    </section>
  )
}
