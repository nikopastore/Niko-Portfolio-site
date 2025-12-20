export const siteConfig = {
  name: "Niko Pastore",
  email: "nikopastore@gmail.com",
  role: "DATA & FULL STACK ENGINEER",
  location: "BASED IN PHOENIX, ARIZONA",
  linkedin: "https://linkedin.com/in/nikopastore",
  github: "https://github.com/nikopastore",
};

export const skillTags = [
  "Data Engineering",
  "Generative AI",
  "Next.js",
  "Full Stack",
  "Python",
  "LLM Orchestration",
  "TypeScript",
  "PostgreSQL",
  "Cloud Architecture",
];

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  skills: string[];
  image: string;
  span: "normal" | "wide" | "full";
}

export const projects: Project[] = [
  {
    id: "hirepriority",
    name: "HirePriority",
    category: "AI-Powered SaaS / Recruiting Automation",
    description:
      "A specialized B2B platform for insurance agencies that automates candidate sourcing and vetting using LLM-driven workflows.",
    skills: ["Next.js", "OpenAI API", "LangChain", "PostgreSQL", "Pinecone", "Tailwind CSS", "Node.js"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    span: "wide",
  },
  {
    id: "sipwiki",
    name: "SipWiki",
    category: "Consumer Mobile Web App / Affiliate Tech",
    description:
      "A comprehensive digital encyclopedia of drinking games featuring real-time search and dynamic Amazon Storefront integration.",
    skills: ["React Native", "Expo", "TypeScript", "AWS Lambda", "DynamoDB", "Amazon Associates API"],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=600&fit=crop",
    span: "normal",
  },
  {
    id: "career-forge",
    name: "Career Forge",
    category: "Generative AI / EdTech",
    description:
      "An AI-driven career coach that analyzes resumes against job descriptions for real-time optimization and skill-gap analysis.",
    skills: ["Python", "FastAPI", "NLP", "LLM Fine-tuning", "Clerk Auth", "Vercel"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
    span: "normal",
  },
  {
    id: "routeware",
    name: "Routeware Data Infrastructure",
    category: "Data Engineering / Enterprise Systems",
    description:
      "Engineered scalable data pipelines and architectural improvements for waste management logistics with high-availability.",
    skills: ["SQL", "Data Modeling", "ETL/ELT", "Python", "Docker", "Azure/AWS"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    span: "normal",
  },
  {
    id: "social-pilot",
    name: "Social Pilot",
    category: "AI Automation / Marketing Tech",
    description:
      "An automated social media management tool that generates, schedules, and optimizes content across platforms using multi-modal AI.",
    skills: ["API Integration", "OpenAI Vision", "Redis", "BullMQ", "Cron Jobs"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    span: "wide",
  },
  {
    id: "flood-prediction",
    name: "Flood Prediction Model",
    category: "Data Science / Machine Learning",
    description:
      "Developed a predictive analytics model using historical climate data and geospatial mapping to forecast flooding events.",
    skills: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "GIS", "XGBoost"],
    image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&h=600&fit=crop",
    span: "wide",
  },
  {
    id: "arbitrage-tool",
    name: "Online Arbitrage Scoring Tool",
    category: "E-commerce / Data Scraping",
    description:
      "A custom tool to identify profitable retail arbitrage opportunities by scraping and scoring real-time pricing data.",
    skills: ["BeautifulSoup", "Selenium", "Data Analysis", "Web Scraping", "Python"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    span: "normal",
  },
  {
    id: "shopsmart-ai",
    name: "ShopSmart AI",
    category: "Browser Automation / AI Commerce",
    description:
      "A cross-platform shopping assistant performing real-time semantic product matching across Amazon, Target, and Walmart.",
    skills: ["JavaScript", "Chrome Extension APIs", "NLP", "Web Scraping", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    span: "normal",
  },
  {
    id: "styleflow-seo",
    name: "StyleFlow SEO",
    category: "Data-Driven Marketing / SEO Engineering",
    description:
      "A high-conversion SEO engine for lifestyle brands using programmatic SEO and automated content clusters.",
    skills: ["Next.js", "Headless CMS", "Google Search Console API", "GA4/GTM", "Schema.org"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    span: "full",
  },
];

export interface Experience {
  company: string;
  role: string;
  years: string;
  type: "work" | "education";
  subtitle?: string;
}

export const experiences: Experience[] = [
  {
    company: "Routeware, Inc.",
    role: "Data Engineer",
    years: "2023 - Present",
    type: "work",
  },
  {
    company: "Routeware, Inc.",
    role: "Data Engineer Intern",
    years: "2023",
    type: "work",
  },
  {
    company: "TownHub",
    role: "Co-Creator & Data Manager",
    years: "2015 - 2017",
    type: "work",
  },
  {
    company: "CoolBizTools",
    role: "Data & Marketing Manager",
    years: "2014 - 2016",
    type: "work",
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
