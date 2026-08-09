import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { BlogPost } from '../data/content'

// Inline **bold**, *italic*, and `code` within a text run.
function renderInline(text: string, keyBase: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${keyBase}-${i}`} className="font-semibold text-ink-100">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={`${keyBase}-${i}`} className="italic text-ink-200">
          {part.slice(1, -1)}
        </em>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={`${keyBase}-${i}`}
          className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-100"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return <span key={`${keyBase}-${i}`}>{part}</span>
  })
}

// Minimal block renderer for the markdown subset used in blog bodies.
function renderBody(body: string) {
  const lines = body.split('\n')
  const blocks: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        code.push(lines[i])
        i++
      }
      i++ // skip closing fence
      blocks.push(
        <pre
          key={key++}
          className="my-5 overflow-x-auto rounded-xl border border-ink-800 bg-ink-950 p-4 font-mono text-[13px] leading-relaxed text-ink-200"
        >
          <code>{code.join('\n')}</code>
        </pre>,
      )
      continue
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h3 key={key++} className="mt-9 text-xl font-semibold tracking-tight text-ink-100">
          {renderInline(line.slice(3), `h${key}`)}
        </h3>,
      )
      i++
      continue
    }

    if (line.startsWith('> ')) {
      blocks.push(
        <blockquote
          key={key++}
          className="my-5 border-l-2 border-ink-500 pl-5 text-lg italic leading-relaxed text-ink-100"
        >
          {renderInline(line.slice(2), `q${key}`)}
        </blockquote>,
      )
      i++
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      blocks.push(
        <ul key={key++} className="my-4 space-y-2">
          {items.map((it, j) => (
            <li key={j} className="flex gap-3 text-ink-300">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
              <span className="leading-relaxed">{renderInline(it, `li${key}-${j}`)}</span>
            </li>
          ))}
        </ul>,
      )
      continue
    }

    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    blocks.push(
      <p key={key++} className="my-4 leading-[1.8] text-ink-300">
        {renderInline(line, `p${key}`)}
      </p>,
    )
    i++
  }

  return blocks
}

export default function BlogModal({
  post,
  onClose,
}: {
  post: BlogPost
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex justify-center overflow-y-auto bg-ink-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-10 h-fit w-full max-w-3xl rounded-2xl border border-ink-800 bg-ink-900 px-6 py-10 sm:px-12 sm:py-14"
      >
        <button
          onClick={onClose}
          className="sticky top-0 float-right ml-4 grid h-10 w-10 place-items-center rounded-full border border-ink-700 text-ink-300 transition-colors hover:border-ink-100 hover:text-ink-100"
          aria-label="Close article"
        >
          ✕
        </button>

        <span className="section-label">{post.kicker}</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink-100 sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-ink-400">
          <span>{post.date}</span>
          <span className="text-ink-600">·</span>
          <span>{post.readingTime} read</span>
          <span className="text-ink-600">·</span>
          <span>{post.tags.join(' / ')}</span>
        </div>

        <div className="mt-8 border-t border-ink-800 pt-8 text-[15px]">
          {renderBody(post.body)}
        </div>

        <div className="mt-12 border-t border-ink-800 pt-6 text-center font-mono text-xs text-ink-500">
          Written by Gyo-Jin Kang · press ESC or click outside to close
        </div>
      </motion.article>
    </motion.div>
  )
}
