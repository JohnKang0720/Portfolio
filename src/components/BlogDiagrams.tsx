import type { DiagramKind } from '../data/content'

// ─────────────────────────────────────────────────────────────
// Monochrome schematic diagrams for the blog, one per post kind.
// Pure inline SVG (no libraries). All share a viewBox of 340×132,
// a dotted backdrop, and marching-ants "flow" strokes that animate
// on card hover (.group:hover) or always in the modal (.diag-live).
// ─────────────────────────────────────────────────────────────

const VB = '0 0 340 132'

function Node({
  cx,
  cy,
  w = 74,
  h = 26,
  label,
  strong = false,
}: {
  cx: number
  cy: number
  w?: number
  h?: number
  label: string
  strong?: boolean
}) {
  return (
    <g>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={6}
        strokeWidth={1.5}
        className={strong ? 'fill-ink-100 stroke-ink-100' : 'fill-ink-900 stroke-ink-600'}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={9}
        className={`font-mono ${strong ? 'fill-ink-950' : 'fill-ink-300'}`}
      >
        {label}
      </text>
    </g>
  )
}

function Defs() {
  return (
    <defs>
      <marker
        id="dgArrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" className="fill-ink-500" />
      </marker>
      <pattern id="dgDots" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" className="fill-ink-800" />
      </pattern>
    </defs>
  )
}

function flow(extra = '') {
  return `dgflow stroke-ink-500 ${extra}`.trim()
}

// 1. Self-evolving loop: Generate → Judge → Refine → back
function Loop() {
  return (
    <>
      <line x1={198} y1={38} x2={248} y2={92} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <line x1={238} y1={104} x2={104} y2={104} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <line x1={82} y1={92} x2={148} y2={40} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <Node cx={170} cy={26} w={82} label="GENERATE" />
      <Node cx={275} cy={104} w={62} label="JUDGE" />
      <Node cx={65} cy={104} w={66} label="REFINE" />
    </>
  )
}

// 2. Tool hub (MCP): deprecated static schema → live agent with tool spokes
function Hub() {
  return (
    <>
      {/* deprecated static-schema box */}
      <rect x={16} y={54} width={64} height={24} rx={4} strokeWidth={1.3} strokeDasharray="3 3" className="fill-none stroke-ink-700" />
      <text x={48} y={66} textAnchor="middle" dominantBaseline="central" fontSize={8} className="font-mono fill-ink-600">SCHEMA</text>
      <line x1={36} y1={52} x2={60} y2={80} className="stroke-ink-600" strokeWidth={1.3} />
      <line x1={60} y1={52} x2={36} y2={80} className="stroke-ink-600" strokeWidth={1.3} />
      <text x={48} y={92} textAnchor="middle" fontSize={7.5} className="font-mono fill-ink-600">static · dropped</text>

      {/* spokes */}
      <line x1={190} y1={58} x2={252} y2={32} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <line x1={192} y1={66} x2={256} y2={66} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <line x1={190} y1={74} x2={248} y2={100} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <text x={215} y={50} textAnchor="middle" fontSize={7.5} className="font-mono fill-ink-500">MCP</text>

      <Node cx={150} cy={66} w={78} label="AGENT" strong />
      <Node cx={288} cy={30} w={54} h={22} label="dbt" />
      <Node cx={288} cy={66} w={54} h={22} label="repo" />
      <Node cx={288} cy={104} w={70} h={22} label="Snowflake" />
    </>
  )
}

// 3. Pipeline: Tickets → Classify → dbt → Dashboard
function Pipeline() {
  return (
    <>
      <line x1={76} y1={66} x2={100} y2={66} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <line x1={170} y1={66} x2={194} y2={66} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <line x1={246} y1={66} x2={268} y2={66} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <Node cx={44} cy={66} w={62} label="Tickets" />
      <Node cx={135} cy={66} w={66} label="Classify" />
      <text x={135} y={90} textAnchor="middle" fontSize={7.5} className="font-mono fill-ink-500">10 dims</text>
      <Node cx={222} cy={66} w={48} label="dbt" />
      <Node cx={302} cy={66} w={66} label="Dashboard" />
    </>
  )
}

// 4. Human-in-the-loop gate: Research → 👤 Review → Golden Seed → Ship
function Gate() {
  return (
    <>
      <line x1={80} y1={66} x2={108} y2={66} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <line x1={171} y1={66} x2={192} y2={66} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <line x1={272} y1={66} x2={288} y2={66} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <Node cx={46} cy={66} w={66} label="RESEARCH" />
      {/* human gate */}
      <circle cx={140} cy={40} r={7} className="fill-none stroke-ink-200" strokeWidth={1.3} />
      <path d="M131,54 a9,9 0 0 1 18,0" className="fill-none stroke-ink-200" strokeWidth={1.3} />
      <Node cx={140} cy={66} w={60} label="REVIEW" strong />
      <Node cx={232} cy={66} w={78} label="GOLDEN SEED" />
      <Node cx={310} cy={66} w={52} label="SHIP" />
      <text x={140} y={92} textAnchor="middle" fontSize={7.5} className="font-mono fill-ink-400">human gate</text>
    </>
  )
}

// 5. PCA: tilted point cloud with principal-component axes
const PCA_DOTS = [
  [96, 96], [112, 86], [122, 92], [134, 80], [140, 88], [150, 74],
  [158, 82], [166, 68], [174, 76], [182, 62], [190, 70], [200, 58],
  [208, 66], [220, 52], [232, 60], [244, 46], [130, 70], [206, 78],
]
function Pca() {
  return (
    <>
      {PCA_DOTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.4} className="fill-ink-400" />
      ))}
      {/* PC1 (major axis) */}
      <line x1={118} y1={86} x2={238} y2={44} className="dgdraw stroke-ink-100" strokeWidth={1.8} fill="none" markerEnd="url(#dgArrow)" />
      <text x={246} y={40} fontSize={9} className="font-mono fill-ink-200">PC1</text>
      {/* PC2 (minor axis, orthogonal) */}
      <line x1={174} y1={64} x2={200} y2={92} className="dgdraw stroke-ink-300" strokeWidth={1.6} fill="none" markerEnd="url(#dgArrow)" />
      <text x={202} y={104} fontSize={9} className="font-mono fill-ink-400">PC2</text>
    </>
  )
}

// 6. VAE bowtie: spikes → encoder ▸ z ◂ decoder → reconstruction
function Vae() {
  const raster = (x: number) =>
    [44, 54, 64, 74, 84].map((y, i) => (
      <line
        key={`${x}-${i}`}
        x1={x}
        y1={y}
        x2={x + (i % 2 === 0 ? 14 : 9)}
        y2={y}
        className="stroke-ink-400"
        strokeWidth={2}
      />
    ))
  return (
    <>
      {raster(28)}
      <text x={40} y={104} textAnchor="middle" fontSize={8} className="font-mono fill-ink-500">spikes</text>

      {/* encoder */}
      <path d="M64,42 L150,60 L150,72 L64,90 Z" className="fill-ink-900 stroke-ink-600" strokeWidth={1.4} />
      <text x={104} y={100} textAnchor="middle" fontSize={8} className="font-mono fill-ink-500">encoder</text>

      {/* flow through latent */}
      <line x1={150} y1={66} x2={162} y2={66} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />
      <circle cx={172} cy={66} r={11} className="fill-ink-100 stroke-ink-100" />
      <text x={172} y={66} textAnchor="middle" dominantBaseline="central" fontSize={10} className="font-mono fill-ink-950">z</text>
      <line x1={183} y1={66} x2={196} y2={66} className={flow()} strokeWidth={1.5} fill="none" markerEnd="url(#dgArrow)" />

      {/* decoder */}
      <path d="M196,60 L282,42 L282,90 L196,72 Z" className="fill-ink-900 stroke-ink-600" strokeWidth={1.4} />
      <text x={239} y={100} textAnchor="middle" fontSize={8} className="font-mono fill-ink-500">decoder</text>

      {raster(300)}
      <text x={312} y={104} textAnchor="middle" fontSize={8} className="font-mono fill-ink-500">recon</text>
    </>
  )
}

const MAP: Record<DiagramKind, () => JSX.Element> = {
  loop: Loop,
  hub: Hub,
  pipeline: Pipeline,
  gate: Gate,
  pca: Pca,
  vae: Vae,
}

export default function BlogDiagram({ kind }: { kind: DiagramKind }) {
  const Shape = MAP[kind]
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" className="h-full w-full" aria-hidden>
      <Defs />
      <rect x={0} y={0} width={340} height={132} fill="url(#dgDots)" opacity={0.5} />
      <Shape />
    </svg>
  )
}
