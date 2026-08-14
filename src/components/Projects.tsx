import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PROJECTS, type Project } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-ink-700 px-2.5 py-1 font-mono text-[11px] text-ink-300">
      {children}
    </span>
  )
}

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal delay={(i % 2) * 0.08}>
      <motion.article
        onClick={() => setOpen((o) => !o)}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40 p-7 transition-colors duration-300 hover:border-ink-600 hover:bg-ink-850"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Watermark index */}
        <span className="pointer-events-none absolute -right-3 -top-6 select-none font-mono text-[6rem] font-bold leading-none text-ink-800/60 transition-colors group-hover:text-ink-700/60">
          {project.index}
        </span>

        <div className="relative z-10 flex items-center gap-3">
          <span className="section-label">{project.domain}</span>
        </div>

        <h3 className="relative z-10 mt-4 text-2xl font-semibold tracking-tight text-ink-100">
          {project.title}
        </h3>
        <p className="relative z-10 mt-1 text-sm text-ink-400">{project.subtitle}</p>

        <p className="relative z-10 mt-4 text-sm leading-relaxed text-ink-300">
          {project.summary}
        </p>

        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 overflow-hidden"
            >
              <div className="mt-6 border-t border-ink-800 pt-5">
                <h4 className="section-label mb-3">Key contributions</h4>
                <ul className="space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-ink-200">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
                      {h}
                    </li>
                  ))}
                </ul>
                <h4 className="section-label mb-2 mt-5">Why it matters</h4>
                <p className="text-sm italic leading-relaxed text-ink-300">{project.why}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 mt-6 flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-xs text-ink-500">
            <span className="font-mono">{project.year}</span>
            {project.org && <span className="text-ink-600">·</span>}
            {project.org && <span>{project.org}</span>}
          </div>
          <div className="flex items-center gap-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="link-underline font-mono text-xs text-accent"
              >
                ▶ Live Demo
              </a>
            )}
            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="link-underline font-mono text-xs text-ink-300"
              >
                {project.link.label} ↗
              </a>
            )}
            <span className="font-mono text-xs text-ink-400">
              {open ? '– Less' : '+ Details'}
            </span>
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="container-px mx-auto max-w-7xl scroll-mt-24 py-24 md:py-36">
      <SectionHeading
        index="02"
        label="Selected Work"
        title="Projects"
        description="A spread across the modern ML stack — signals & deep learning, LLM safety, multimodal vision-language, medical imaging, semantic retrieval, and real-time anomaly detection. Each is a trained model with a live demo you can try in the browser. Tap a card for details."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} i={i} />
        ))}
      </div>
    </section>
  )
}
