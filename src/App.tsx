import { Header } from './components/Header/Header'
import { About } from './sections/About/About'
import { Approach } from './sections/Approach/Approach'
import { Education } from './sections/Education/Education'
import { Hero } from './sections/Hero/Hero'
import { Process } from './sections/Process/Process'
import { Requests } from './sections/Requests/Requests'
import { Reviews } from './sections/Reviews/Reviews'

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
        <Education />
        <Reviews />
      </main>
    </>
  )
}

export default App
