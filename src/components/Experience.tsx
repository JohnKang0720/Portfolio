import { motion } from 'framer-motion'
import { EXPERIENCE, RESEARCH } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const EDUCATION = [
  {
    title: 'BSc, Statistics (Economics Concentration)',
    org: 'University of British Columbia',
    period: 'Sep 2022 – May 2027 (Expected)',
  },
  {
    title: 'Deep Learning Specialization',
    org: 'Coursera',
    period: 'Mar 2025',
  },
]

export default function Experience() {
  return (
    <section id="work" className="container-px mx-auto max-w-7xl scroll-mt-24 py-24 md:py-36">
      <SectionHeading
        index="01"
        label="Career"
        title="Experience"
        description="From neurotech research to experimentation at scale to shipping agentic AI in production."
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-ink-800 md:left-[9px]" />

          <div className="space-y-14">
            {EXPERIENCE.map((exp, i) => (
              <Reveal key={exp.org} delay={i * 0.05}>
                <div className="relative pl-8 md:pl-12">
                  {/* Node */}
                  <span className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full border border-ink-500 bg-ink-950 md:h-5 md:w-5">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink-100" />
                  </span>

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-xl font-semibold tracking-tight text-ink-100">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-ink-400">{exp.period}</span>
                  </div>
                  <p className="mt-1 font-mono text-sm text-ink-300">
                    {exp.org} · <span className="text-ink-500">{exp.location}</span>
                  </p>
                  <p className="mt-3 text-sm text-ink-300">{exp.blurb}</p>

                  <ul className="mt-4 space-y-2.5">
                    {exp.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink-200">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-500" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink-700 px-2.5 py-1 font-mono text-[11px] text-ink-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sidebar: research + education */}
        <div className="space-y-6">
          <Reveal>
            <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-6">
              <h3 className="section-label mb-4">Research</h3>
              <motion.div whileHover={{ x: 3 }} className="transition-transform">
                <p className="font-semibold text-ink-100">{RESEARCH.role}</p>
                <p className="mt-1 font-mono text-xs text-ink-400">
                  {RESEARCH.org} · {RESEARCH.period}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">{RESEARCH.blurb}</p>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-6">
              <h3 className="section-label mb-4">Education</h3>
              <div className="space-y-5">
                {EDUCATION.map((ed) => (
                  <div key={ed.title}>
                    <p className="font-medium leading-snug text-ink-100">{ed.title}</p>
                    <p className="mt-1 font-mono text-xs text-ink-400">{ed.org}</p>
                    <p className="font-mono text-xs text-ink-500">{ed.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
