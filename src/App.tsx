import { Header } from './components/Header/Header'
import { About } from './sections/About/About'
import { Approach } from './sections/Approach/Approach'
import { Hero } from './sections/Hero/Hero'
import { Process } from './sections/Process/Process'
import { Requests } from './sections/Requests/Requests'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Requests />
        <About />
        <Process />
        <Approach />
      </main>
    </>
  )
}

export default App
