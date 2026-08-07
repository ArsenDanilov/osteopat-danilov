import styles from './App.module.css'

function App() {
  return (
    <main className={styles.shell}>
      <div className={`container ${styles.content}`}>
        <p className={styles.kicker}>Персональный сайт</p>
        <h1 className={styles.title}>Дмитрий Данилов</h1>
        <p className={styles.role}>Врач-остеопат</p>
        <p className={styles.note}>
          Техническая основа сайта готова к разработке.
        </p>
      </div>
    </main>
  )
}

export default App
