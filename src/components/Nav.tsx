import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROFILE } from '../data/content'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const ids = ['work', 'projects', 'blog', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ink-800/80 bg-ink-950/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between md:h-20">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2 font-mono text-sm tracking-widest text-ink-100"
          aria-label="Back to top"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-ink-600 text-xs font-bold transition-colors group-hover:border-ink-100">
            JK
          </span>
          <span className="hidden sm:inline">GYO-JIN KANG</span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`relative font-mono text-sm tracking-wide transition-colors ${
                active === l.id ? 'text-ink-100' : 'text-ink-300 hover:text-ink-100'
              }`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                />
              )}
            </button>
          ))}
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-ink-600 px-4 py-1.5 font-mono text-sm text-ink-100 transition-all hover:border-ink-100 hover:bg-ink-100 hover:text-ink-950"
          >
            Résumé ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-6 bg-ink-100 transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span className={`h-px w-6 bg-ink-100 transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-px w-6 bg-ink-100 transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-ink-800 bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-px flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="py-3 text-left font-mono text-lg text-ink-200"
                >
                  {l.label}
                </button>
              ))}
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-full border border-ink-600 py-3 text-center font-mono text-ink-100"
              >
                Download Résumé ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
