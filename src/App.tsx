import { Header } from './components/Header/Header'
import { About } from './sections/About/About'
import { Hero } from './sections/Hero/Hero'
import { Requests } from './sections/Requests/Requests'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Requests />
        <About />
      </main>
    </>
  )
}

export default App
