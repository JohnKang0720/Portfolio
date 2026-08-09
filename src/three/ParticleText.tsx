import { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────
// Particle-text hero.
// The name is rasterized to an offscreen 2D canvas, its filled
// pixels are sampled into a THREE.Points cloud, and each particle
// springs toward its "home" pixel while fleeing the cursor.
//
// Orthographic camera at zoom 1 makes 1 world unit == 1 CSS pixel,
// so particle math lives entirely in centered pixel space.
// ─────────────────────────────────────────────────────────────

type Sampled = {
  positions: Float32Array
  colors: Float32Array
  count: number
}

function sampleText(
  lines: string[],
  width: number,
  height: number,
): Sampled | null {
  if (width < 2 || height < 2) return null
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const cvs = document.createElement('canvas')
  cvs.width = Math.floor(width * dpr)
  cvs.height = Math.floor(height * dpr)
  const ctx = cvs.getContext('2d')
  if (!ctx) return null
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Fit font size so the widest line spans ~86% width and the whole
  // block fits within ~78% height.
  const isMobile = width < 640
  const lineGap = isMobile ? 1.02 : 0.94
  let fontSize = Math.min(width / 4, height / (lines.length * 1.1))
  const family = '"Space Grotesk", system-ui, sans-serif'
  const fits = (fs: number) => {
    ctx.font = `700 ${fs}px ${family}`
    const widest = Math.max(...lines.map((l) => ctx.measureText(l).width))
    const totalH = fs * lineGap * lines.length
    return widest <= width * 0.86 && totalH <= height * 0.82
  }
  while (fontSize > 8 && !fits(fontSize)) fontSize -= 2

  ctx.font = `700 ${fontSize}px ${family}`
  const lineH = fontSize * lineGap
  const blockH = lineH * lines.length
  const startY = height / 2 - blockH / 2 + lineH / 2
  lines.forEach((line, i) => {
    ctx.fillText(line, width / 2, startY + i * lineH)
  })

  const img = ctx.getImageData(0, 0, cvs.width, cvs.height).data
  // Sampling gap in CSS pixels; scaled by dpr when indexing.
  const gap = Math.max(3, Math.round(width / 300))
  const positions: number[] = []
  const colors: number[] = []
  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      const sx = Math.floor(x * dpr)
      const sy = Math.floor(y * dpr)
      const idx = (sy * cvs.width + sx) * 4 + 3 // alpha channel
      if (img[idx] > 128) {
        // Center the coordinate system; flip Y so up is positive.
        positions.push(x - width / 2, -(y - height / 2), (Math.random() - 0.5) * 6)
        const shade = 0.72 + Math.random() * 0.28
        colors.push(shade, shade, shade)
      }
    }
  }
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    count: positions.length / 3,
  }
}

// Round soft dot sprite so particles read as points of light, not squares.
function makeDotTexture() {
  const s = 64
  const c = document.createElement('canvas')
  c.width = c.height = s
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.5, 'rgba(255,255,255,0.85)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  tex.needsUpdate = true
  return tex
}

function Particles({ lines }: { lines: string[] }) {
  const { size, gl } = useThree()
  const pointsRef = useRef<THREE.Points>(null)
  const geomRef = useRef<THREE.BufferGeometry>(null)
  const homeRef = useRef<Float32Array | null>(null)
  const velRef = useRef<Float32Array | null>(null)
  const [fontsReady, setFontsReady] = useState(false)
  const hasIntroed = useRef(false)
  const dot = useMemo(() => makeDotTexture(), [])

  useEffect(() => {
    let active = true
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => active && setFontsReady(true))
    } else {
      setFontsReady(true)
    }
    return () => {
      active = false
    }
  }, [])

  const sampled = useMemo(
    () => sampleText(lines, size.width, size.height),
    // Rebuild whenever the canvas resizes or fonts finish loading.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lines, size.width, size.height, fontsReady],
  )

  // Wire up home / current / velocity buffers when a new sample arrives.
  useEffect(() => {
    if (!sampled || !geomRef.current) return
    const { positions, colors, count } = sampled
    homeRef.current = positions.slice()
    velRef.current = new Float32Array(count * 3)
    // Scatter the particles only for the very first assemble-on-load intro.
    // Later rebuilds (resize / viewport changes) lay out directly at home so
    // the name never randomly re-explodes.
    const start = positions.slice()
    if (!hasIntroed.current) {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2
        const r = Math.max(size.width, size.height) * (0.25 + Math.random() * 0.45)
        start[i * 3] = Math.cos(a) * r
        start[i * 3 + 1] = Math.sin(a) * r
        start[i * 3 + 2] = (Math.random() - 0.5) * 120
      }
      hasIntroed.current = true
    }
    const geo = geomRef.current
    geo.setAttribute('position', new THREE.BufferAttribute(start, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.attributes.position.needsUpdate = true
  }, [sampled, size.width, size.height])

  const pointer = useRef({ x: 1e6, y: 1e6, active: false })

  // Track hover state directly on the canvas element — more reliable than
  // raycasting the point cloud.
  useEffect(() => {
    const el = gl.domElement
    const enter = () => (pointer.current.active = true)
    const leave = () => (pointer.current.active = false)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointermove', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointermove', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [gl])

  useFrame((state) => {
    const geo = geomRef.current
    const home = homeRef.current
    const vel = velRef.current
    if (!geo || !home || !vel) return
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    // Pointer in centered pixel space (ortho zoom 1 → NDC * halfSize).
    const px = pointer.current.active ? state.pointer.x * (size.width / 2) : 1e6
    const py = pointer.current.active ? state.pointer.y * (size.height / 2) : 1e6

    const R = size.width < 640 ? 70 : 110
    const R2 = R * R
    const spring = 0.09
    const friction = 0.8
    const t = state.clock.elapsedTime

    for (let i = 0; i < arr.length; i += 3) {
      const hx = home[i]
      const hy = home[i + 1]
      const hz = home[i + 2]

      // Cursor repulsion.
      const dx = arr[i] - px
      const dy = arr[i + 1] - py
      const d2 = dx * dx + dy * dy
      if (d2 < R2 && d2 > 0.0001) {
        const d = Math.sqrt(d2)
        const force = (1 - d / R) * 26
        vel[i] += (dx / d) * force
        vel[i + 1] += (dy / d) * force
      }

      // Idle shimmer on Z + tiny XY breathing.
      const drift = Math.sin(t * 1.2 + hx * 0.01 + hy * 0.01) * 1.4

      // Spring back to home.
      vel[i] += (hx - arr[i]) * spring
      vel[i + 1] += (hy - arr[i + 1]) * spring
      vel[i + 2] += (hz + drift - arr[i + 2]) * spring

      vel[i] *= friction
      vel[i + 1] *= friction
      vel[i + 2] *= friction

      arr[i] += vel[i]
      arr[i + 1] += vel[i + 1]
      arr[i + 2] += vel[i + 2]
    }
    posAttr.needsUpdate = true

    // Very slow parallax tilt for depth.
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.pointer.x * 0.06
      pointsRef.current.rotation.x = -state.pointer.y * 0.04
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef} />
      <pointsMaterial
        size={size.width < 640 ? 2.2 : 2.8}
        map={dot}
        vertexColors
        transparent
        depthWrite={false}
        sizeAttenuation={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Full-bleed invisible plane so pointer events register across the canvas.
function PointerPlane({ lines }: { lines: string[] }) {
  return <Particles lines={lines} />
}

export default function ParticleText({ lines }: { lines: string[] }) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 100], zoom: 1, near: 0.1, far: 1000 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <PointerPlane lines={lines} />
    </Canvas>
  )
}
