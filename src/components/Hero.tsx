import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { PROFILE } from '../data/content'

// Lazy-load the WebGL hero so three.js ships as a separate chunk and the
// page paints before the 3D engine is parsed.
const ParticleText = lazy(() => import('../three/ParticleText'))

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Ambient background: faint grid + radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1c1c1c 1px, transparent 1px), linear-gradient(to bottom, #1c1c1c 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #262626 0%, transparent 70%)' }}
      />

      {/* Status line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="section-label z-10 mb-4 flex items-center gap-3"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink-100 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ink-100" />
        </span>
        {PROFILE.role} · {PROFILE.location}
      </motion.p>

      {/* Particle name */}
      <div className="relative z-10 h-[34vh] max-h-[360px] min-h-[190px] w-full max-w-6xl sm:h-[40vh]">
        <Suspense
          fallback={
            <div className="flex h-full flex-col items-center justify-center">
              {PROFILE.particleLines.map((l) => (
                <span
                  key={l}
                  className="text-5xl font-bold leading-none tracking-tightest text-ink-700 sm:text-7xl md:text-8xl"
                >
                  {l}
                </span>
              ))}
            </div>
          }
        >
          <ParticleText lines={PROFILE.particleLines} />
        </Suspense>
        {/* Accessible heading for SEO / screen readers */}
        <h1 className="sr-only">{PROFILE.name} — {PROFILE.role}</h1>
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="z-10 mt-6 max-w-2xl px-6 text-center text-base leading-relaxed text-ink-200 sm:text-lg"
      >
        {PROFILE.tagline}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        className="z-10 mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          onClick={() =>
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="rounded-full bg-ink-100 px-6 py-3 font-mono text-sm text-ink-950 transition-transform hover:scale-[1.03]"
        >
          View Projects
        </button>
        <a
          href={PROFILE.resume}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-ink-600 px-6 py-3 font-mono text-sm text-ink-100 transition-colors hover:border-ink-100"
        >
          Download Résumé ↗
        </a>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-ink-600 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-ink-300"
          />
        </div>
      </motion.div>
    </section>
  )
}
