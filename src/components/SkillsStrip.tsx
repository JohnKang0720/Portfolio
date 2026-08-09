import { SKILL_MARQUEE, SKILLS } from '../data/content'
import Reveal from './Reveal'

export default function SkillsStrip() {
  return (
    <section className="border-y border-ink-800 bg-ink-900/40 py-10">
      {/* Infinite marquee */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...SKILL_MARQUEE, ...SKILL_MARQUEE].map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap font-mono text-sm uppercase tracking-widest text-ink-400"
            >
              {s}
              <span className="text-ink-600">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Grouped detail */}
      <div className="container-px mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
        {SKILLS.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.08}>
            <h3 className="section-label mb-4">{group.label}</h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-ink-200">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
