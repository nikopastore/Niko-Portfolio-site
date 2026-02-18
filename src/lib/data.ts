export const siteConfig = {
  name: "Niko Pastore",
  email: "nikopastore@gmail.com",
  role: "DATA ENGINEER & AI PRODUCT BUILDER",
  location: "PHOENIX, ARIZONA",
  linkedin: "https://www.linkedin.com/in/nikopastore/",
  github: "https://github.com/nikopastore",
};

export const skillTags = [
  "Snowflake",
  "Python",
  "TypeScript",
  "Next.js",
  "React",
  "PostgreSQL",
  "LLM Orchestration",
  "OpenAI API",
  "Anthropic Claude",
  "LangChain",
  "ETL Pipelines",
  "Data Modeling",
  "AWS",
  "Vercel",
  "Playwright",
  "Node.js",
];

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
}

export const projects: Project[] = [
  {
    id: "hirepriority",
    name: "HirePriority",
    category: "AI-Powered B2B SaaS",
    description:
      "A recruiting platform I built for insurance agencies with two core features: a custom ML algorithm that scores candidates against job requirements, and Headhunter — an automated recruiting tool that helps agents proactively find licensed professionals and university students to recruit. The ML scoring goes beyond keyword matching to actually understand fit. Headhunter pulls from state licensing boards, LinkedIn, and university databases to surface qualified candidates before they even apply. Built the whole thing: auth, multi-tenant architecture, ML scoring engine, LLM pipelines.",
    techHighlights: [
      "Headhunter: automated candidate sourcing from licensing boards & universities",
      "Custom ML scoring algorithm for candidate quality ranking",
      "LangChain orchestration with GPT-4 + Claude fallback",
      "Pinecone vector DB for semantic candidate matching",
      "Real-time WebSocket updates for live scoring",
    ],
    skills: ["Next.js", "TypeScript", "Python", "Scikit-learn", "OpenAI API", "LangChain", "Pinecone", "PostgreSQL"],
    image: "/screenshots/hirepriority.png",
    url: "https://hirepriority.scalepilotlabs.com/",
    metrics: "ML scoring + Headhunter automated recruiting",
  },
  {
    id: "polyquant",
    name: "PolyQuant",
    category: "Quantitative Finance / Prediction Markets",
    description:
      "A signal service for prediction markets that I built after noticing seasonal patterns in Polymarket data. The system analyzes historical event outcomes, correlates them with calendar effects, and generates trade signals. Currently 3/3 on called trades. The interesting part is the backtesting engine — I can simulate any strategy against years of prediction market history.",
    techHighlights: [
      "Custom backtesting engine with walk-forward optimization",
      "Seasonality decomposition using STL + Fourier analysis",
      "Real-time odds scraping via headless browser automation",
      "Signal generation with confidence intervals",
      "Automated position sizing based on Kelly criterion",
    ],
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Next.js", "TypeScript", "Playwright", "Vercel"],
    image: "/screenshots/polyquant.png",
    url: "https://polyquant.vercel.app/",
    metrics: "3/3 wins YTD (100% accuracy)",
  },
  {
    id: "job-machine",
    name: "Job Machine",
    category: "AI Automation / Career Tools",
    description:
      "An automated job hunting system I built for myself. It scans 50+ job boards every 10 minutes, matches postings against my resume using semantic similarity, then tailors my resume and cover letter for each match. The tailoring isn't just keyword stuffing — it actually rewrites bullet points to emphasize relevant experience. Generates ATS-optimized PDFs ready to submit.",
    techHighlights: [
      "Multi-model orchestration (GLM-5 for scanning, Claude for tailoring)",
      "Semantic job matching using embeddings",
      "Automated resume rewriting with keyword optimization",
      "PDF generation with WeasyPrint",
      "Cron-based continuous scanning across 50+ sources",
    ],
    skills: ["Python", "Claude API", "Playwright", "YAML", "WeasyPrint", "Node.js", "Cron"],
    image: "/screenshots/jobmachine.png",
    metrics: "Scans 50+ job boards, tailors applications in <30 seconds",
  },
  {
    id: "routeware",
    name: "Routeware Data Platform",
    category: "Enterprise Data Engineering",
    description:
      "My day job. I led the migration from legacy databases to Snowflake, built the ETL pipelines that process all our operational data, and set up Sigma BI for self-serve analytics. Before this, teams waited days for reports — now they query live data themselves. The tricky part was maintaining data quality across 50+ source systems while keeping the warehouse performant.",
    techHighlights: [
      "Snowflake data warehouse architecture from scratch",
      "FME + Python ETL processing 1M+ records daily",
      "Sigma BI dashboards replacing manual Excel reports",
      "Data quality framework with automated anomaly detection",
      "Cost optimization — cut Snowflake spend 40% via query tuning",
    ],
    skills: ["Snowflake", "SQL", "Python", "FME", "Sigma BI", "dbt", "AWS", "Data Modeling"],
    image: "/screenshots/routeware.png",
    metrics: "1M+ records/day, 40% cost reduction, 99.9% uptime",
  },
  {
    id: "sipwiki",
    name: "SipWiki",
    category: "Consumer App / Affiliate Tech",
    description:
      "A drinking games encyclopedia that started as a side project and turned into a real product. Users browse games, save favorites, and discover party supplies through integrated Amazon affiliate links. The interesting technical challenge was making it feel fast despite pulling from multiple APIs — I use aggressive caching and optimistic UI updates.",
    techHighlights: [
      "React Native + Expo for cross-platform mobile",
      "DynamoDB with single-table design for sub-10ms queries",
      "Lambda@Edge for personalized affiliate link injection",
      "Offline-first architecture with background sync",
    ],
    skills: ["React Native", "Expo", "TypeScript", "AWS Lambda", "DynamoDB", "Amazon Associates API"],
    image: "/screenshots/sipwiki.png",
    url: "https://www.sipwiki.app/",
  },
  {
    id: "teachfolio",
    name: "TeachFolio",
    category: "Website Platform / EdTech",
    description:
      "A platform for teachers to create professional portfolio websites. My wife needed a site for her TPT store, and I realized most teacher websites are terrible. TeachFolio generates clean, fast sites from a simple form — teachers pick a template, add their content, and get a deployed site in minutes. Integrates with TPT and Google Classroom.",
    techHighlights: [
      "Template engine with live preview",
      "Automated deployment to Vercel via API",
      "TPT store integration for automatic product sync",
      "Custom domain management with SSL",
    ],
    skills: ["Next.js", "TypeScript", "Vercel API", "PostgreSQL", "Tailwind CSS", "Stripe"],
    image: "/screenshots/teachfolio.png",
    url: "https://elementarystateofmind.com/",
    metrics: "Wife's site as proof of concept",
  },
  {
    id: "betbezel",
    name: "BetBezel",
    category: "Sports Analytics / Mobile App",
    description:
      "A sports betting research tool that uses AI to analyze matchups and generate daily picks. The UI is minimal — it lives in iOS Dynamic Island so you can glance at today's best bet without opening an app. Behind the scenes, it's running Gemini deep research on injury reports, weather, and historical performance data.",
    techHighlights: [
      "Gemini API for deep research synthesis",
      "iOS Dynamic Island + Live Activities integration",
      "Real-time odds comparison across sportsbooks",
      "Historical backtesting for strategy validation",
    ],
    skills: ["Swift", "SwiftUI", "Gemini API", "Python", "FastAPI", "Web Scraping"],
    image: "/screenshots/betbezel.png",
  },
  {
    id: "career-forge",
    name: "Career Forge",
    category: "AI Tools / EdTech",
    description:
      "An AI career coach that analyzes your resume against job descriptions and tells you exactly what's missing. Not vague advice — specific gaps like 'They want Kubernetes experience, you have Docker but no K8s mentioned.' I built this before Job Machine, and it taught me a lot about LLM-powered document analysis.",
    techHighlights: [
      "GPT-4 with structured output for consistent analysis",
      "Resume parsing with custom NER model",
      "Skill gap identification with market demand data",
      "Interview prep question generation",
    ],
    skills: ["Python", "FastAPI", "OpenAI API", "NLP", "Clerk Auth", "Vercel"],
    image: "/screenshots/careerforge.png",
  },
  {
    id: "social-forge",
    name: "Social Forge",
    category: "Marketing Automation",
    description:
      "An AI-powered social media manager that generates, schedules, and posts content across platforms. I use it for my own accounts — it drafts posts based on trending topics in my niche, I approve the good ones, and it handles scheduling. The multi-modal piece is interesting: it can analyze images and generate relevant captions.",
    techHighlights: [
      "Multi-platform posting (Twitter, LinkedIn, Instagram)",
      "GPT-4 Vision for image analysis and caption generation",
      "Buffer/Later API integration for scheduling",
      "Engagement analytics with posting time optimization",
    ],
    skills: ["Node.js", "OpenAI Vision API", "Redis", "BullMQ", "API Integration", "Cron"],
    image: "/screenshots/socialforge.png",
  },
  {
    id: "flood-prediction",
    name: "Flood Prediction Model",
    category: "Data Science / Climate Tech",
    description:
      "My capstone project at UCSD. Built a machine learning model that predicts flooding risk 48 hours in advance using satellite imagery, weather data, and terrain analysis. The model achieved 87% accuracy on out-of-sample data. The hard part was feature engineering — figuring out which combinations of variables actually predict flooding vs. just correlating with it.",
    techHighlights: [
      "XGBoost ensemble with geospatial features",
      "Satellite imagery processing with rasterio",
      "Time-series cross-validation for proper backtesting",
      "Interactive risk maps with Folium",
    ],
    skills: ["Python", "Scikit-learn", "XGBoost", "Pandas", "GeoPandas", "GIS", "Matplotlib"],
    image: "/screenshots/flood.png",
    metrics: "87% accuracy, 48-hour advance warning",
  },
];

export interface Experience {
  company: string;
  role: string;
  years: string;
  type: "work" | "education";
  subtitle?: string;
  highlights?: string[];
}

export const experiences: Experience[] = [
  {
    company: "ScalePilot Labs",
    role: "Founder & Technical Lead",
    years: "2024 - Present",
    type: "work",
    highlights: [
      "Building AI-powered SaaS products for SMBs",
      "HirePriority, PolyQuant, TeachFolio, and more",
    ],
  },
  {
    company: "Routeware, Inc.",
    role: "Data Engineer",
    years: "2023 - Present",
    type: "work",
    highlights: [
      "Led Snowflake + Sigma BI implementation",
      "Built ETL pipelines processing 1M+ records/day",
    ],
  },
  {
    company: "Routeware, Inc.",
    role: "Data Engineer Intern",
    years: "2023",
    type: "work",
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
