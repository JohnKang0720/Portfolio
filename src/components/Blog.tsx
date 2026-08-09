import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { POSTS } from '../data/blog'
import type { BlogPost } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import BlogModal from './BlogModal'
import BlogDiagram from './BlogDiagrams'

export default function Blog() {
  const [active, setActive] = useState<BlogPost | null>(null)

  return (
    <section
      id="blog"
      className="border-y border-ink-800 bg-ink-900/30 py-24 md:py-36"
    >
      <div className="container-px mx-auto max-w-7xl scroll-mt-24">
        <SectionHeading
          index="03"
          label="Writing"
          title="Notes & Learnings"
          description="Deep-dives on the systems I've built and the ideas behind them — agentic AI, production LLM pipelines, and machine learning from first principles."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.id} delay={(i % 3) * 0.08}>
              <motion.button
                onClick={() => setActive(post)}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40 text-left transition-colors hover:border-ink-600 hover:bg-ink-850"
              >
                <div className="h-28 w-full border-b border-ink-800 bg-ink-950/40 px-4 py-3">
                  <BlogDiagram kind={post.diagram} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="section-label">{post.kicker}</span>
                    <span className="font-mono text-xs text-ink-500">{post.readingTime}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-ink-100">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-300">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-mono text-xs text-ink-500">{post.date}</span>
                    <span className="font-mono text-xs text-ink-200 transition-transform group-hover:translate-x-1">
                      Read →
                    </span>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <BlogModal post={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
