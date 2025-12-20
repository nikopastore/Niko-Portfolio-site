# Niko Pastore Portfolio - Design Document

## Overview
A high-end, minimalist portfolio inspired by the Akio Framer template. Single-page design with physics-based interactions, Bento grid layout, and dark/light theme toggle.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Physics:** Matter.js
- **Icons:** Lucide React
- **Fonts:** Space Grotesk (headings), Inter (body)

---

## 1. Header (Fixed Navigation)

### Layout
- **Left:** Email link (nikopastore@gmail.com)
- **Center (stacked):**
  - Line 1: Arrow icon + "DATA & FULL STACK ENGINEER"
  - Line 2: "BASED IN PHOENIX, ARIZONA" (muted)
- **Right:** Theme toggle (sun/moon)

### Theme System
| Property | Dark Mode | Light Mode |
|----------|-----------|------------|
| Background | #000000 | #FAFAFA |
| Text | #FFFFFF | #0F0F0F |
| Cards | #1A1A1A | #F5F5F5 |
| Muted | #666666 | #666666 |
| Border | #262626 | #E5E5E5 |

- 300ms transitions
- localStorage persistence

---

## 2. Hero Section

### Physics Canvas (Matter.js)
- Container: ~600px height, full viewport width
- Invisible boundary walls
- 9 draggable pill-shaped bodies:
  1. Data Engineering
  2. Generative AI
  3. Next.js
  4. Full Stack
  5. Python
  6. LLM Orchestration
  7. TypeScript
  8. PostgreSQL
  9. Cloud Architecture

### Pill Design
- Rounded rectangle (border-radius: 999px)
- Border: #333 (dark) / #CCC (light)
- Background: transparent or subtle #1A1A1A
- Labels: Space Grotesk Medium

### Physics Behavior
- Pills fall from random top positions
- Realistic bounce and collision
- Mouse/touch draggable
- Responsive to window resize

### Name Display
- "NIKO PASTORE" in Space Grotesk Bold
- Size: ~120px (desktop), ~60px (mobile)
- Letter-spacing: -0.03em
- Centered below physics container

---

## 3. Works Section (Bento Grid)

### Section Header
- "SELECTED WORKS" - large heading

### Grid Layout (Desktop)
```
┌─────────────────────┬─────────────┐
│ HirePriority (2col) │ SipWiki     │
├──────────┬──────────┼─────────────┤
│ Career   │ Route-   │ Social      │
│ Forge    │ ware     │ Pilot (2col)│
├──────────┴──────────┼──────┬──────┤
│ Flood Prediction    │ Arbi │ Shop │
│ (2col)              │ trage│ Smart│
├─────────────────────┴──────┴──────┤
│ StyleFlow SEO (full width)        │
└───────────────────────────────────┘
```

### Projects Data
1. **HirePriority** - AI-Powered SaaS / Recruiting Automation
2. **SipWiki** - Consumer Mobile Web App / Affiliate Tech
3. **Career Forge** - Generative AI / EdTech
4. **Routeware Data Infrastructure** - Data Engineering / Enterprise
5. **Social Pilot** - AI Automation / Marketing Tech
6. **Flood Prediction Model** - Data Science / ML
7. **Online Arbitrage Scoring Tool** - E-commerce / Scraping
8. **ShopSmart AI** - Browser Automation / AI Commerce
9. **StyleFlow SEO** - Data-Driven Marketing / SEO

### Card Design
- Background: #1A1A1A (dark) / #F5F5F5 (light)
- Border: 1px solid #262626
- Border-radius: 24px
- Padding: 24px
- Placeholder Unsplash image

### Card Content
- Category tag (small, muted)
- Project name (Space Grotesk Bold, 24px)
- Description (Inter, muted, 2 lines)

### Hover Effects
- Scale: 1.02
- Border: #444
- "View Project →" arrow fades in
- 300ms transition

---

## 4. Experience Section

### Work Experience
| Company | Role | Years |
|---------|------|-------|
| Routeware, Inc. | Data Engineer | 2023 - Present |
| Routeware, Inc. | Data Engineer Intern | 2023 |
| TownHub | Co-Creator & Data Manager | 2015 - 2017 |
| CoolBizTools | Data & Marketing Manager | 2014 - 2016 |

### Education
| Institution | Degree |
|-------------|--------|
| UC San Diego | M.S. Data Science (Halıcıoğlu Data Science Institute) |
| UC San Diego | B.S. Business Psychology (Rady School of Management) |

### Design
- Company/School: Space Grotesk Medium, 18px
- Role/Degree: Inter Regular, 16px, muted
- Year: right-aligned, muted
- Separator: 1px #262626 line
- Hover: subtle background, slight right shift
- Animation: staggered fade-in (100ms delay each)

---

## 5. Contact & Footer

### Contact Section
- Heading: "LET'S WORK TOGETHER" (Space Grotesk, large)
- Email: nikopastore@gmail.com (large, centered, mailto)
- Links: LinkedIn, GitHub, Email (pill buttons)
- Button hover: fill invert

### Footer
- Left: "© 2025 Niko Pastore"
- Right: "Built with Next.js"
- Border-top: 1px #262626
- Color: #666666

---

## 6. Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>1200px) | Full Bento grid, large typography |
| Tablet (768-1200px) | 2-column grid, adjusted spacing |
| Mobile (<768px) | Single column, stacked layout |

---

## 7. File Structure

```
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── providers.tsx (theme)
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── PhysicsCanvas.tsx
│   ├── WorksGrid.tsx
│   ├── ProjectCard.tsx
│   ├── Experience.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ThemeToggle.tsx
├── lib/
│   ├── data.ts (projects, experience)
│   └── utils.ts (cn helper)
├── hooks/
│   └── useTheme.ts
└── public/
    └── images/
```

---

## 8. Dependencies

```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^10",
    "matter-js": "^0.19",
    "lucide-react": "^0.300",
    "clsx": "^2",
    "tailwind-merge": "^2"
  }
}
```

---

## 9. Deployment

- Platform: Vercel
- Domain: nikopastore-portfolio.vercel.app
