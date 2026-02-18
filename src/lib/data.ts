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
      "A signal service for prediction markets that I built after noticing seasonal patterns in Polymarket data. The system analyzes historical event outcomes, correlates them with calendar effects, and generates trade signals. The interesting part is the backtesting engine — I can simulate any strategy against years of prediction market history.",
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
      "HirePriority, PolyQuant, TeachFolio, and more",
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
