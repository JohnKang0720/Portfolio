import { motion } from 'framer-motion'
import { PROFILE } from '../data/content'
import Reveal from './Reveal'

const SOCIALS = [
  { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: 'GitHub', value: 'JohnKang0720', href: PROFILE.github },
  { label: 'LinkedIn', value: 'gyojin-kang', href: PROFILE.linkedin },
]

export default function Contact() {
  return (
    <footer id="contact" className="container-px mx-auto max-w-7xl scroll-mt-24 py-24 md:py-36">
      <Reveal>
        <span className="section-label">04 — Contact</span>
        <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tightest text-ink-100 sm:text-6xl md:text-7xl">
          Let's build something
          <br />
          <span className="text-ink-500">worth measuring.</span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-300">
          I'm open to Data Science and AI Engineering roles. If you're working on agentic
          systems, applied ML, or hard data problems, I'd love to talk.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="rounded-full bg-ink-100 px-7 py-3.5 font-mono text-sm text-ink-950 transition-transform hover:scale-[1.03]"
          >
            Get in touch ↗
          </a>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-ink-600 px-7 py-3.5 font-mono text-sm text-ink-100 transition-colors hover:border-ink-100"
          >
            Download Résumé
          </a>
        </div>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-8 border-t border-ink-800 pt-10 md:grid-cols-3">
        {SOCIALS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <motion.a
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              whileHover={{ x: 4 }}
              className="group flex flex-col"
            >
              <span className="section-label mb-2">{s.label}</span>
              <span className="flex items-center gap-2 text-lg text-ink-100">
                <span className="link-underline break-words">{s.value}</span>
                <span className="shrink-0 text-ink-500 transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </span>
            </motion.a>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink-800 pt-8 font-mono text-xs text-ink-500 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Gyo-Jin Kang</span>
        <span>Built with React, Three.js & Framer Motion · Vancouver, BC</span>
      </div>
    </footer>
  )
}
