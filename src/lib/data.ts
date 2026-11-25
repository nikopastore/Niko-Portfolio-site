export const siteConfig = {
  name: "Niko Pastore",
  email: "nikopastore@gmail.com",
  role: "DATA ENGINEER & AI PRODUCT BUILDER",
  location: "PHOENIX, ARIZONA",
  linkedin: "https://www.linkedin.com/in/nikopastore/",
  github: "https://github.com/nikopastore",
  twitter: "https://x.com/nikopastore",
  discord: "https://discord.gg/ai-agent-mastery",
  rss: "https://nikopastore-portfolio.vercel.app/blog/feed.xml",
  url: "https://nikopastore-portfolio.vercel.app",
  enableDiscord: false,
  enableNewsletter: false,
  enableComments: false,
  enableTraining: true,
};

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  techHighlights: string[];
  skills: string[];
  image: string;
  url?: string;
  metrics?: string;
  statusLabel?: string;
}

export interface App {
  id: string;
  name: string;
  category: string;
  description: string;
  skills: string[];
  icon: string;
  logo?: string;
  screenshots?: string[];
  url: string;
  platforms: string[];
}

export const projects: Project[] = [
  {
    id: "agent-memory-site",
    name: "Agent Memory Site",
    category: "AI Tooling / Open Source",
    description:
      "A local-first CLI that compiles a Markdown knowledge vault into a portable, browsable agent memory bundle. One build outputs a static search dashboard, retrieval-ready JSONL chunks with content hashes, a live MCP server, and context files for Claude, Codex, and Cursor.",
    techHighlights: [
      "Compiles Markdown notes into chunks.jsonl, search-index.json, and static HTML",
      "Generates AGENTS.md, CLAUDE.md, .cursorrules, llms.txt, and agent-card.json",
      "Built-in MCP server runtime for Claude Desktop, Claude Code, Codex, and Cursor",
      "Privacy filtering and redacted-link placeholders between private and public modes",
    ],
    skills: ["TypeScript", "Node.js", "MCP", "RAG / JSONL", "Static Search", "GitHub Pages"],
    image: "/screenshots/agentmemorysite.png",
    url: "https://nikopastore.github.io/agent-memory-site/",
    metrics: "One Markdown build for Claude, Codex, Cursor & MCP",
  },
  {
    id: "sdhomepros",
    name: "SDHomePros",
    category: "Local Marketplace / Home Services",
    description:
      "A San Diego contractor directory built from a real 13.6K+ member community. Homeowners can find trusted local pros by trade, while contractors can list their business and get discovered through a focused marketplace instead of another noisy lead-gen site.",
    techHighlights: [
      "Community-backed contractor directory with trade-based search",
      "Contractor onboarding and business listing workflows",
      "SEO-focused local marketplace pages for high-intent searches",
      "Built around an existing 13.6K+ member Facebook community",
    ],
    skills: ["Next.js", "TypeScript", "Local SEO", "Marketplace UX", "Community Growth", "Vercel"],
    image: "/screenshots/sdhomepros.png",
    url: "https://sdhomepros.app/",
    metrics: "13.6K+ members in one local home-pro network",
  },
  {
    id: "national-planning-group",
    name: "National Planning Group",
    category: "Real Estate / Property Management",
    description:
      "An investor-first property management site for real estate owners. The site positions NPG around protected cash flow, reduced vacancy, transparent reporting, and operational workflows that make property performance visible instead of opaque.",
    techHighlights: [
      "Investor-focused landing page and free assessment funnel",
      "Operational dashboard storytelling for revenue, vacancy, and maintenance",
      "Clear service architecture for property management conversion",
      "Trust-forward copy and reporting narrative for owner acquisition",
    ],
    skills: ["Next.js", "TypeScript", "Conversion UX", "Real Estate Ops", "SEO", "Vercel"],
    image: "/screenshots/nationalplanninggroup.png",
    url: "https://www.nationalplanninggroup.com/",
    metrics: "Investor-ready funnel that clarifies property ops",
  },
  {
    id: "sitepilot",
    name: "SitePilot",
    category: "Developer Tools / Web Audits",
    description:
      "A free instant website audit tool that analyzes SEO, performance, accessibility, and security in 60 seconds with no signup required. Generates overall and category scores alongside prioritized, step-by-step fix recommendations and exportable reports.",
    techHighlights: [
      "100+ automated checks across Performance, SEO, Accessibility, and Security",
      "Core Web Vitals, structured data, WCAG compliance, and header diagnostics",
      "Prioritized remediation list with step-by-step fix instructions",
      "PDF report export and email delivery for team sharing",
    ],
    skills: ["Next.js", "TypeScript", "Technical SEO", "Core Web Vitals", "Web Security", "Vercel"],
    image: "/screenshots/sitepilot.png",
    url: "https://trysitepilot.com/",
    metrics: "100+ audit checks in 60 seconds, zero signup",
  },
  {
    id: "sipwiki",
    name: "SipWiki",
    category: "Consumer App / Affiliate Tech",
    description:
      "A drinking-games encyclopedia and party companion with game discovery, favorites, and product recommendations. The technical challenge was keeping the experience fast and searchable while supporting content growth and affiliate monetization.",
    techHighlights: [
      "Fast game discovery with structured content and category filters",
      "Affiliate-ready product recommendation surfaces",
      "Mobile-first UX for party settings",
      "SEO-friendly content architecture for long-tail discovery",
    ],
    skills: ["React Native", "Expo", "TypeScript", "AWS Lambda", "DynamoDB", "Affiliate Tech"],
    image: "/screenshots/sipwiki.png",
    url: "https://sipwiki.app/",
  },
  {
    id: "elementary-state-of-mind",
    name: "ElementaryStateOfMind",
    category: "Creator Commerce / Education",
    description:
      "A polished teacher-resource storefront for Zoe Pastore's Elementary State of Mind brand. The site turns classroom resources, TPT products, reviews, and social channels into a clean owned storefront that feels credible to teachers and easy to browse.",
    techHighlights: [
      "Teacher-resource storefront with product browsing",
      "TPT, social, and content channels consolidated into one owned site",
      "Fast Next.js storefront with image-rich product cards",
      "Built for discoverability, trust, and direct creator-brand ownership",
    ],
    skills: ["Next.js", "TypeScript", "Creator Commerce", "SEO", "Tailwind CSS", "Vercel"],
    image: "/screenshots/elementarystateofmind.png",
    url: "https://www.elementarystateofmind.com/",
    metrics: "Shopfront for Zoe’s teacher-resource brand",
  },
  {
    id: "flood-prediction",
    name: "Flood Prediction Model",
    category: "Data Science / Climate Tech",
    description:
      "My UCSD capstone project: a machine-learning model that predicts flood risk 48 hours in advance using satellite imagery, weather data, and terrain analysis. The feature-engineering work focused on separating true flood predictors from noisy weather correlations.",
    techHighlights: [
      "XGBoost ensemble with geospatial features",
      "Satellite imagery processing with rasterio",
      "Time-series cross-validation for proper backtesting",
      "Interactive risk maps with Folium",
    ],
    skills: ["Python", "Scikit-learn", "XGBoost", "Pandas", "GeoPandas", "GIS", "Matplotlib"],
    image: "/screenshots/flood.png",
    metrics: "87% accuracy with 48-hour flood warnings",
    statusLabel: "UCSD M.S. Capstone",
  },
];

export const apps: App[] = [];

export interface Experience {
  company: string;
  role: string;
  years: string;
  type: "work" | "education";
  subtitle?: string;
  highlights?: string[];
  techStack?: string[];
}

export const experiences: Experience[] = [
  {
    company: "ScalePilot Labs",
    role: "Founder & Technical Lead",
    years: "2024 - Present",
    type: "work",
    highlights: [
      "Building AI-powered SaaS & developer tooling",
      "Agent Memory Site, SitePilot, SDHomePros, National Planning Group, SipWiki, and more",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Python",
      "OpenAI API",
      "LangChain",
      "PostgreSQL",
      "Vercel",
    ],
  },
  {
    company: "Routeware, Inc.",
    role: "Data Engineer",
    years: "2023 - 2026",
    type: "work",
    highlights: [
      "Led Snowflake + Sigma BI implementation",
      "Built ETL pipelines processing 1M+ records/day",
    ],
    techStack: ["Snowflake", "SQL", "Python", "FME", "Sigma BI", "dbt", "AWS"],
  },
  {
    company: "Routeware, Inc.",
    role: "Data Engineer Intern",
    years: "2023",
    type: "work",
    techStack: ["SQL", "Python", "Data Modeling", "Excel"],
  },
  {
    company: "TownHub",
    role: "Co-Founder & Data Lead",
    years: "2015 - 2017",
    type: "work",
    highlights: [
      "Built 5 community apps from scratch",
      "Handled all data infrastructure and analytics",
    ],
    techStack: ["Python", "SQL", "Data Analytics", "Marketing Automation"],
  },
];

export const education: Experience[] = [
  {
    company: "University of California, San Diego",
    role: "M.S. Data Science",
    years: "",
    type: "education",
    subtitle: "Halıcıoğlu Data Science Institute",
  },
  {
    company: "University of California, San Diego",
    role: "B.S. Business Psychology",
    years: "",
    type: "education",
    subtitle: "Rady School of Management",
  },
];

export interface Training {
  id: string;
  name: string;
  category: string;
  description: string;
  bullets: string[];
  url?: string;
  cta: string;
  // "discord" renders the existing Discord logo; "whop" renders an inline Whop wordmark; "custom" uses a 2-letter chip
  iconStyle: "discord" | "whop" | "custom";
  iconInitials?: string;
  // Optional secondary link surfaced as a quieter pill on the card (e.g. case study)
  caseStudyUrl?: string;
  caseStudyCta?: string;
}

export const training: Training[] = [
  {
    id: "ai-training-hub",
    name: "AI Training Hub",
    category: "AI LEARNING PROJECT",
    description:
      "A gamified personal AI fluency tracker I built to stay accountable across 60 curated AI, ML, agent, and cloud courses. It turns the curriculum into XP, levels, streaks, quality tiers, and a daily learning loop.",
    bullets: [
      "60-course catalog across Learn, Build, and Ship tracks",
      "S/A/B/C quality tiers, XP, streaks, progress state, and Top Picks",
      "Open-source vanilla HTML/CSS/JS app deployed on GitHub Pages",
    ],
    url: "https://nikopastore.github.io/ai-training-hub/",
    cta: "Open AI Training Hub",
    iconStyle: "custom",
    iconInitials: "AI",
    caseStudyUrl: "/blog/ai-training-hub-case-study",
    caseStudyCta: "Read the case study",
  },
  {
    id: "ai-agent-mastery-discord",
    name: "AI Agent Mastery",
    category: "FREE COMMUNITY",
    description:
      "Discord community for builders shipping real AI agents in production. Daily setups, peer reviews, and teardowns.",
    bullets: [
      "Daily agent setups and configuration templates",
      "Peer review of agent architecture and prompts",
      "Live teardowns of new models, tools, and releases",
    ],
    url: "https://discord.gg/ai-agent-mastery",
    cta: "Join free on Discord",
    iconStyle: "discord",
  },
  {
    id: "field-notes-blog",
    name: "Field Notes Blog",
    category: "OPEN KNOWLEDGE BASE",
    description:
      "High-intent writeups on AI agents, data engineering, and production systems. Implementation details most tutorials skip.",
    bullets: [
      "35+ field notes on real builds, models, and tooling",
      "Answer-first structure for humans and AI agents",
      "Linked to the source: diagrams, code, and tradeoffs",
    ],
    url: "/blog",
    cta: "Read the field notes",
    iconStyle: "custom",
    iconInitials: "FN",
  },
];
