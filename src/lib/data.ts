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
    id: "hirepriority",
    name: "HirePriority",
    category: "AI-Powered B2B SaaS",
    description:
      "A recruiting platform for insurance agencies with ML candidate scoring and Headhunter, an automated sourcing workflow for licensed professionals and university recruiting. Built the full product stack: auth, multi-tenant architecture, scoring pipelines, candidate matching, and production deployment.",
    techHighlights: [
      "Automated candidate sourcing from licensing boards and universities",
      "Custom ML scoring algorithm for candidate quality ranking",
      "LLM-assisted workflows for recruiting operations",
      "Production SaaS architecture with auth and multi-tenant data modeling",
    ],
    skills: ["Next.js", "TypeScript", "Python", "Scikit-learn", "OpenAI API", "LangChain", "PostgreSQL", "Vercel"],
    image: "/screenshots/hirepriority.png",
    url: "https://hirepriority.scalepilotlabs.com/",
    metrics: "ML scoring + automated recruiting",
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
    metrics: "13.6K+ community members",
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
    url: "https://www.sipwiki.app/",
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
    metrics: "Owned storefront for Zoe's teacher-resource brand",
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
    url: "https://nationalplanninggroup.com/",
    metrics: "Investor assessment funnel + property ops positioning",
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
    metrics: "87% accuracy, 48-hour advance warning",
  },
];

export const apps: App[] = [
  {
    id: "docpilot",
    name: "DocPilot",
    category: "Document Intelligence",
    description:
      "AI-powered document scanner that auto-detects document types and extracts structured data. Scan receipts, invoices, contracts — get clean markdown and exportable data.",
    skills: [
      "Swift",
      "SwiftUI",
      "VisionKit",
      "PDFKit",
      "CoreImage",
      "NuMarkdown API",
      "SwiftData",
    ],
    icon: "📄",
    logo: "/apps/docpilot/icon.png",
    screenshots: [
      "/apps/docpilot/01.png",
      "/apps/docpilot/02.png",
      "/apps/docpilot/03.png",
    ],
    url: "",
    platforms: ["iOS"],
  },
  {
    id: "ailarm",
    name: "AiLARM",
    category: "Productivity",
    description:
      "Smart alarm app with AI-powered morning briefings. Wake up to personalized weather, calendar, and motivational messages delivered in a natural voice.",
    skills: ["Swift", "SwiftUI", "AVFoundation", "Speech Synthesis", "WeatherKit"],
    icon: "⏰",
    logo: "/apps/ailarm/icon.png",
    screenshots: [
      "/apps/ailarm/01_alarm_list.png",
      "/apps/ailarm/02_ai_briefing.png",
      "/apps/ailarm/03_shake_dismiss.png",
      "/apps/ailarm/04_sounds.png",
    ],
    url: "https://ailarm.vercel.app",
    platforms: ["iOS"],
  },
  {
    id: "supplementsync",
    name: "SupplementSync",
    category: "Health & Wellness",
    description:
      "Supplement and medication tracker with wearable integration. Syncs with Apple Health, Whoop, and Oura to show health correlations and optimize your stack.",
    skills: ["Swift", "SwiftUI", "HealthKit", "Core Data", "Charts", "WidgetKit"],
    icon: "💊",
    logo: "/apps/supplementsync/icon.png",
    screenshots: [
      "/apps/supplementsync/01_stack.png",
      "/apps/supplementsync/02_correlations.png",
      "/apps/supplementsync/03_wearables.png",
    ],
    url: "",
    platforms: ["iOS"],
  },
  {
    id: "qrsimple",
    name: "QR Simple",
    category: "Utilities",
    description:
      "Clean, fast QR code generator and scanner. Create codes for URLs, WiFi, contacts, and more. No ads, no tracking, just works.",
    skills: ["React Native", "Expo", "NativeWind", "react-native-qrcode-svg", "expo-camera"],
    icon: "📱",
    logo: "/apps/qrsimple/icon.png",
    screenshots: [
      "/apps/qrsimple/01_generate.png",
      "/apps/qrsimple/02_scan.png",
    ],
    url: "",
    platforms: ["iOS", "Android"],
  },
  {
    id: "parchment",
    name: "Parchment",
    category: "Journaling",
    description:
      "Minimalist AI journaling app with voice dictation and handwriting OCR. Speak or scan your thoughts — Parchment converts them to clean, searchable entries.",
    skills: [
      "React Native",
      "Expo",
      "ElevenLabs Scribe",
      "Google Gemini 2.0",
      "RevenueCat",
      "AsyncStorage",
    ],
    icon: "📜",
    logo: "/apps/parchment/icon.png",
    screenshots: [
      "/apps/parchment/01_home.png",
      "/apps/parchment/02_voice.png",
      "/apps/parchment/03_ocr.png",
      "/apps/parchment/04_reflection.png",
    ],
    url: "",
    platforms: ["iOS", "Android"],
  },
  {
    id: "mealswipe",
    name: "MealSwipe",
    category: "Food & Lifestyle",
    description:
      "Tinder for meal planning. Swipe through recipe suggestions, save favorites, and generate weekly meal plans. AI learns your preferences over time.",
    skills: ["React Native", "Expo", "OpenAI API", "AsyncStorage", "Reanimated"],
    icon: "🍽️",
    logo: "/apps/mealswipe/icon.png",
    screenshots: [
      "/apps/mealswipe/01.png",
      "/apps/mealswipe/02.png",
      "/apps/mealswipe/03.png",
      "/apps/mealswipe/04.png",
    ],
    url: "",
    platforms: ["iOS", "Android"],
  },
];

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
      "Building AI-powered SaaS products",
      "HirePriority, SDHomePros, NPG, SipWiki, and more",
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
    years: "2023 - Present",
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
