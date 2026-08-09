# Gyo-Jin Kang — Portfolio

A dark, monochrome portfolio for **Gyo-Jin (John) Kang** — Data Scientist & AI Engineer.
Single-page site with a WebGL particle-text hero, driven by a transparent nav bar.

**Live sections:** Hero · Skills · Experience timeline · Projects · Blog · Contact

## Tech stack

- **React 18 + TypeScript**
- **Vite** (build tooling)
- **Tailwind CSS** (monochrome design system)
- **Framer Motion** (scroll reveals, transitions)
- **three.js + @react-three/fiber** (interactive particle-text hero)

## Highlights

- **Particle-text hero** — the name is rasterized to a canvas, sampled into a
  THREE.Points cloud, and each particle springs toward its home pixel while
  fleeing the cursor. three.js is code-split into its own lazy-loaded chunk.
- **Content registry** — all copy (projects, experience, skills, blog posts)
  lives in `src/data/` so edits never touch JSX.
- **In-page blog reader** — long-form posts render via a lightweight markdown
  subset in a modal.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Structure

```
src/
├── components/     # Nav, Hero, Projects, Blog, Experience, Contact, …
├── three/          # ParticleText (WebGL hero)
├── data/           # content.ts (registry) + blog.ts (posts)
├── App.tsx
└── index.css       # Tailwind layers + design tokens
```

---
© Gyo-Jin Kang · Vancouver, BC
