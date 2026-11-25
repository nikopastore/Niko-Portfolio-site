export type BotCategory =
  | "human"
  | "ai_assistant"
  | "ai_search"
  | "ai_training"
  | "search_engine"
  | "ambiguous";

export interface BotClassification {
  category: BotCategory;
  botName: string | null;
  ua: string;
  accept: string;
}

export type MirrorTrigger = "dot_md" | "accept_header" | "bot_ua" | "html";

const SEARCH_ENGINES: Array<[RegExp, string]> = [
  [/Googlebot|Google-InspectionTool|AdsBot-Google/i, "Googlebot"],
  [/Bingbot|msnbot|BingPreview/i, "Bingbot"],
  [/DuckDuckBot/i, "DuckDuckBot"],
  [/Applebot(?!-Extended)/i, "Applebot"],
  [/Slurp/i, "Yahoo-Slurp"],
];

const AI_ASSISTANTS: Array<[RegExp, string]> = [
  [/Claude-User/i, "Claude-User"],
  [/Claude-Code/i, "Claude-Code"],
  [/ChatGPT-User/i, "ChatGPT-User"],
  [/Perplexity-User/i, "Perplexity-User"],
  [/MistralAI-User/i, "MistralAI-User"],
  [/Meta-ExternalFetcher/i, "Meta-ExternalFetcher"],
  [/NotebookLM|Google-NotebookLM/i, "Google-NotebookLM"],
  [/Anthropic-AI/i, "Anthropic-AI"],
];

const AI_SEARCH_BOTS: Array<[RegExp, string]> = [
  [/OAI-SearchBot/i, "OAI-SearchBot"],
  [/Claude-SearchBot/i, "Claude-SearchBot"],
  [/PerplexityBot/i, "PerplexityBot"],
  [/YouBot/i, "YouBot"],
  [/DuckAssistBot/i, "DuckAssistBot"],
];

const AI_TRAINING_BOTS: Array<[RegExp, string]> = [
  [/GPTBot/i, "GPTBot"],
  [/ClaudeBot/i, "ClaudeBot"],
  [/CCBot/i, "CCBot"],
  [/Google-Extended/i, "Google-Extended"],
  [/Applebot-Extended/i, "Applebot-Extended"],
  [/Bytespider/i, "Bytespider"],
  [/Meta-ExternalAgent/i, "Meta-ExternalAgent"],
  [/Amazonbot/i, "Amazonbot"],
];

function matchPattern(ua: string, rules: Array<[RegExp, string]>): string | null {
  for (const [pattern, name] of rules) {
    if (pattern.test(ua)) return name;
  }
  return null;
}

export function classifyRequest(headers: Headers): BotClassification {
  const ua = headers.get("user-agent") ?? "";
  const accept = headers.get("accept") ?? "";

  // Traditional search engines must always receive canonical HTML (anti-cloaking guardrail).
  const searchEngine = matchPattern(ua, SEARCH_ENGINES);
  if (searchEngine) {
    return { category: "search_engine", botName: searchEngine, ua, accept };
  }

  const aiAssistant = matchPattern(ua, AI_ASSISTANTS);
  if (aiAssistant) {
    return { category: "ai_assistant", botName: aiAssistant, ua, accept };
  }

  const aiSearch = matchPattern(ua, AI_SEARCH_BOTS);
  if (aiSearch) {
    return { category: "ai_search", botName: aiSearch, ua, accept };
  }

  const aiTraining = matchPattern(ua, AI_TRAINING_BOTS);
  if (aiTraining) {
    return { category: "ai_training", botName: aiTraining, ua, accept };
  }

  // Flag missing UA or spoofed legacy browser strings (e.g. Chrome/58) as ambiguous.
  if (!ua || /Chrome\/[1-6]\d\./i.test(ua)) {
    return { category: "ambiguous", botName: null, ua, accept };
  }

  return { category: "human", botName: null, ua, accept };
}

export function acceptsMarkdown(headers: Headers): boolean {
  const accept = (headers.get("accept") ?? "").toLowerCase();
  return accept.includes("text/markdown");
}

export function wantsMarkdown(headers: Headers): {
  serveMarkdown: boolean;
  trigger: MirrorTrigger;
  classification: BotClassification;
} {
  const classification = classifyRequest(headers);

  if (acceptsMarkdown(headers)) {
    return {
      serveMarkdown: true,
      trigger: "accept_header",
      classification,
    };
  }

  if (
    classification.category === "ai_assistant" ||
    classification.category === "ai_search"
  ) {
    return {
      serveMarkdown: true,
      trigger: "bot_ua",
      classification,
    };
  }

  return {
    serveMarkdown: false,
    trigger: "html",
    classification,
  };
}

export function logAgentMirrorRequest(params: {
  path: string;
  servedFormat: "markdown" | "html";
  trigger: MirrorTrigger;
  classification: BotClassification;
  headers: Headers;
}) {
  const { path, servedFormat, trigger, classification, headers } = params;
  if (servedFormat !== "markdown" && classification.category === "human") {
    return;
  }

  console.info(
    JSON.stringify({
      event: "agent_mirror_request",
      timestamp: new Date().toISOString(),
      path,
      servedFormat,
      trigger,
      category: classification.category,
      botName: classification.botName,
      accept: classification.accept,
      ua: classification.ua.slice(0, 200),
      country: headers.get("x-vercel-ip-country") ?? headers.get("cf-ipcountry") ?? undefined,
      asn: headers.get("x-vercel-ip-asn") ?? headers.get("cf-asn") ?? undefined,
      edgeId: headers.get("cf-ray") ?? headers.get("x-vercel-id") ?? undefined,
    })
  );
}
