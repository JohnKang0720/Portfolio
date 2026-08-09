import Nav from './components/Nav'
import Hero from './components/Hero'
import SkillsStrip from './components/SkillsStrip'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950">
      <div className="noise-overlay" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <SkillsStrip />
        <Experience />
        <Projects />
        <Blog />
        <Contact />
      </main>
    </div>
  )
}
