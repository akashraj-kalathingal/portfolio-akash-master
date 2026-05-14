# akashraj.dev — 3D Portfolio

A cinematic, interactive portfolio for **Akashraj Kalathingal** — Senior
Software Engineer. Built with Next.js 15 + React 19 + Three.js +
React Three Fiber.

## Stack

- **Next.js 15** App Router (React 19)
- **TypeScript** strict
- **Tailwind CSS v4** zero-config CSS-first theming
- **React Three Fiber 9** + **drei 10** + **three 0.171**
- **Framer Motion 11** for non-3D motion
- **Inter** + **JetBrains Mono** via `next/font/google`

## What's on the page

1. **Hero with interactive 3D scene** — distributed-system topology with
   icosahedral nodes, connected lines, particle depth field, mouse-tilt
   parallax, three-light cinematic setup, fog and vignette.
2. **About** — narrative summary, animated stats counter, career arc
   timeline with pulse markers on highlight years.
3. **Experience** — expandable role cards with mouse-driven 3D tilt
   (perspective-transformed in CSS, spring-smoothed), scale chips, and
   stack tags.
4. **Case Studies** — tabbed deep-dives with animated layoutId pill,
   structured problem/approach/impact framing.
5. **Skills** — grouped competency grid with hover-revealed glow.
6. **System Design Showcase** — animated SVG architecture diagrams for
   three real systems (BMO AI chatbot, Scotiabank ISO 20022 wire
   payments, Target Patroller orchestration) with flowing dashed lines
   for data movement.
7. **GitHub Integration** — server-fetched profile + recent repos via
   the public GitHub REST API with hourly revalidation. Falls back
   gracefully when there are no public repos yet.
8. **Education, Awards, Contact** — final glass cards with status
   strip.

## The 3D scene

The hero renders an abstracted distributed-system topology:

- 9 icosahedral nodes laid out on a sphere (deterministic, so SSR/CSR agree)
- Each node connected to its 2 nearest neighbours via `lineSegments`
- Slow autorotation + mouse-driven tilt parallax with smoothing
- 400-point particle field forming a depth blanket
- Three-light setup: ambient + warm key + cool fill
- Fog and bottom vignette for cinematic depth

Intentionally restrained. The aesthetic comes from lighting and motion,
not poly count or trick effects.

## Performance & accessibility

- Three.js scene is dynamically imported with `ssr: false` — no SSR
  WebGL crashes, no hydration mismatches
- DPR capped at 1.75 to prevent retina overdraw
- `prefers-reduced-motion` switches the 3D renderer to `frameloop="demand"`
- Fonts are self-hosted via `next/font` — zero CLS
- All non-3D animation respects `prefers-reduced-motion` via the global
  stylesheet

## Quick start

```bash
pnpm install     # or npm / yarn
pnpm dev         # http://localhost:3000
pnpm build && pnpm start
```

Drop your resume PDF at `public/Akashraj_Kalathingal_Resume.pdf` so the
download button works.

## GitHub integration (optional)

The GitHub section works without any configuration — it uses GitHub's
public REST API. Unauthenticated requests are rate-limited to 60/hour
per IP, which is plenty for personal portfolio traffic.

If you expect higher traffic or want to be safe, set a fine-grained
read-only Personal Access Token:

```bash
# .env.local
GITHUB_TOKEN=github_pat_...
```

The fetch will use it automatically if present.

## Project shape

```
src/
├─ app/
│  ├─ layout.tsx            # metadata, fonts
│  ├─ page.tsx              # composition
│  └─ globals.css           # tokens, fonts, aurora gradient text
├─ components/
│  ├─ Scene3D.tsx           # 3D topology — heart of the hero
│  ├─ Hero.tsx              # text overlay + 3D mount
│  ├─ Nav.tsx               # sticky pill nav
│  ├─ About.tsx             # narrative + animated stats + arc
│  ├─ StatCell.tsx          # animated counter
│  ├─ Experience.tsx        # role cards with tilt
│  ├─ CaseStudies.tsx       # tabbed case-study viewer
│  ├─ Skills.tsx            # grouped competency grid
│  ├─ SystemDesign.tsx      # animated SVG architecture diagrams
│  ├─ GithubSection.tsx     # server component, live GH data
│  ├─ Footer.tsx            # education / awards / contact
│  └─ Primitives.tsx        # Section, Reveal, GlassCard
├─ content/
│  └─ data.ts               # single source of truth
└─ lib/
   └─ github.ts             # GitHub API client with revalidation
```

## Deployment

```bash
npx vercel        # link
npx vercel --prod # ship
```

Or import the repo at vercel.com/new — Next.js auto-detected. Three.js
works out of the box thanks to `transpilePackages: ["three"]` in
`next.config.mjs`. Set the optional `GITHUB_TOKEN` in Project Settings
→ Environment Variables if you want it.

## Customization

All copy is in `src/content/data.ts`. To change your tagline, the
experience bullets, the case studies, or anything else — edit that
file. No component changes needed.

To change the 3D scene's vibe, the constants at the top of
`Scene3D.tsx` are the knobs: `NODE_COUNT`, the palette array, the
particle count, and the light intensities. Each one is a 2-second tweak.

## Honest notes

- A 3D portfolio is not what gets FAANG offers — it's a personal-brand
  signal. The artifacts that actually move recruiter inboxes are the
  GitHub repo and the technical blog posts in Path B of this bundle.
  This portfolio amplifies them; it doesn't replace them.
- The 3D scene is taste-first. I deliberately avoided particle glitter,
  neon glow, infinite camera spirals, and other portfolio clichés.
- Performance is the silent feature. Big visual portfolios that lag on
  mid-tier devices read as juvenile to senior engineers.
- I couldn't `npm install` + `next build` inside the sandbox where this
  was generated (no registry access), so the code is type-correct by
  careful authoring against current SDK docs, not by a green build. On
  first install you may hit one or two small fixes — paste any errors
  back and I'll patch them quickly.
