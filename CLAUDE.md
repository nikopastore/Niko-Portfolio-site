# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A high-end, minimalist portfolio website for Niko Pastore (Data & Full Stack Engineer) built with Next.js 16. The design is inspired by the Akio Framer template, featuring:
- Single-page layout with physics-based interactions
- Matter.js physics engine for interactive skill pills in hero section
- Dark/light theme toggle with localStorage persistence
- Bento grid layout for project showcase
- Responsive design with mobile-first approach

## Commands

### Development
```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture

### Tech Stack
- **Framework:** Next.js 16.1.0 with App Router
- **React:** 19.2.3
- **Styling:** Tailwind CSS v4 (using @tailwindcss/postcss)
- **Animations:** Framer Motion 12.23.26
- **Physics:** Matter.js 0.20.0 (for interactive hero section)
- **Icons:** Lucide React
- **Fonts:** Space Grotesk (headings), Space Mono (physics pills), Inter (body)
- **TypeScript:** v5

### Directory Structure
```
src/
├── app/
│   ├── layout.tsx       # Root layout with font setup, ThemeProvider, ToastProvider
│   ├── page.tsx         # Main page - single-page portfolio
│   └── globals.css      # Theme CSS variables and global styles
├── components/
│   ├── Header.tsx       # Fixed navigation (email, location, theme toggle)
│   ├── Hero.tsx         # Hero section wrapper
│   ├── PhysicsCanvas.tsx # Matter.js interactive physics simulation
│   ├── WorksGrid.tsx    # Bento grid layout for projects
│   ├── Experience.tsx   # Work history and education
│   ├── Contact.tsx      # Contact section with social links
│   ├── Footer.tsx       # Copyright footer
│   └── Toast.tsx        # Toast notification system
├── context/
│   └── ThemeContext.tsx # Theme state management (dark/light mode)
└── lib/
    ├── data.ts          # Site config, projects, experiences, education data
    └── utils.ts         # Utility functions (cn helper for classNames)
```

### Key Architectural Patterns

#### Theme System
- Implemented via React Context (`ThemeContext.tsx`)
- Two modes: `dark` (default) and `light`
- Theme persisted in localStorage
- CSS variables defined in `globals.css` with `:root` and `:root.light` selectors
- Theme toggle adds/removes `light` class on `<html>` element
- All components use Tailwind utility classes that reference CSS variables
- 300ms transitions for smooth theme changes

#### Physics Canvas (Matter.js)
- Located in `PhysicsCanvas.tsx` - the most complex component in the codebase
- Creates interactive "pills" (skill tags) and decorative circles that users can drag
- Physics engine runs client-side only (SSR fallback shows static pills)
- Bodies have high inertia to resist rotation and stay mostly upright
- Invisible boundary walls keep physics objects contained
- Staggered drop animation on initial load (150ms intervals)
- Custom canvas rendering with theme-aware colors
- Responds to window resize by recreating the entire simulation
- Uses weighted rotation for circle bodies (5-point stability)

**Important physics implementation details:**
- Pills are chamfered rectangles (full pill shape with `chamfer: { radius: height/2 }`)
- Custom rendering loop draws outlines only (no fill) with Space Mono font labels
- Torque applied each frame to keep pills upright (`beforeUpdate` event)
- Ground positioned so pills sit flush at visible bottom edge
- Touch actions enabled for vertical scrolling while allowing drag interaction

#### Page Layout
- Single-page application (`app/page.tsx`) imports and renders all sections
- Fixed header at top
- Sections: Hero → Works → Experience → Contact → Footer
- All data sourced from `lib/data.ts` for easy content updates

#### Data Management
- All portfolio content in `lib/data.ts`:
  - `siteConfig` - personal info and links
  - `skillTags` - skills shown in physics canvas
  - `projects` - 9 projects with categories, descriptions, skills, images
  - `experiences` - work history
  - `education` - academic credentials

#### Component Communication
- Props drilling from `page.tsx` to child components
- No global state beyond theme context
- Toast notifications use React Context (`ToastProvider`)

### CSS & Styling Notes
- Uses Tailwind CSS v4 with inline theme configuration in `globals.css`
- Custom CSS variables for consistent theming: `--background`, `--foreground`, `--card`, `--card-border`, `--muted`, `--accent`
- All components use Tailwind utilities referencing these variables (e.g., `bg-background`, `text-foreground`)
- Global transition on all elements for theme changes
- Custom scrollbar styling
- Font variables: `--font-inter`, `--font-space-grotesk`, `--font-space-mono`

### Responsive Design
- Mobile-first approach
- Breakpoints handled via Tailwind responsive utilities
- Physics canvas height: 500px on all devices
- Bento grid adjusts from multi-column to single column on mobile
- Components use Framer Motion for staggered animations and hover effects

## Common Workflows

### Adding New Projects
1. Edit `src/lib/data.ts`
2. Add new project object to `projects` array with required fields: `id`, `name`, `category`, `description`, `skills`, `image`
3. Use Unsplash URLs for placeholder images (format: `https://images.unsplash.com/photo-[ID]?w=800&h=600&fit=crop`)

### Modifying Physics Simulation
- All physics configuration in `src/components/PhysicsCanvas.tsx`
- Adjust `PHYSICS_TAGS` array to change pills/circles
- Modify gravity in `Engine.create({ gravity: { x: 0, y: 1.5, scale: 0.001 } })`
- Torque application happens in `beforeUpdate` event handler
- Custom rendering in `afterRender` event handler

### Updating Theme Colors
- Edit CSS variables in `src/app/globals.css`
- Update `:root` for dark mode, `:root.light` for light mode
- Physics canvas theme colors updated dynamically in `updateThemeColors()` function

### Design Reference
See `docs/plans/2025-12-20-portfolio-design.md` for original design specifications including:
- Bento grid layout patterns
- Typography scale and font usage
- Color palette and theme values
- Component design details
- Responsive breakpoint behaviors
