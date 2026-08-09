import Reveal from './Reveal'

export default function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string
  label: string
  title: string
  description?: string
}) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="flex items-center gap-4">
        <span className="section-label">{index}</span>
        <span className="h-px flex-1 bg-ink-800" />
        <span className="section-label">{label}</span>
      </div>
      <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tightest text-ink-100 sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-300">{description}</p>
      )}
    </Reveal>
  )
}
