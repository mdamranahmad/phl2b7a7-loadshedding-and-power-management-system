import type { IChatReply, IChatTopic } from "@/types";

/**
 * Offline knowledge base for the chat assistant. Every answer is a plain-text
 * summary of how the app actually works, paired with a deep link to the page
 * that performs the job. No network call, no API key: `answerFor` matches the
 * normalized question against the topic keywords and returns the best hit.
 */
export const CHAT_TOPICS: IChatTopic[] = [
  {
    id: "schedule",
    title: "How is the load-shedding schedule generated?",
    answer:
      "A substation manager enters the substation capacity and the allocated load in kW, plus a schedule duration and an outage slot length. The system splits that window into slots and publishes a batch of per-area schedules.\n\nCustomers can follow their own batch on the Load-Shedding Schedule page, and zonal managers review published batches under Zone → Schedule Batches.",
    keywords: [
      "schedule",
      "load shedding",
      "loadshedding",
      "load shed",
      "slot",
      "batch",
      "when power",
      "generated",
      "published",
      "duration",
      "timetable",
    ],
    href: "/customer/schedule",
    linkLabel: "Open load-shedding schedule",
  },
  {
    id: "generate-schedule",
    title: "Generate a schedule batch",
    answer:
      "Substation managers open Schedule → Generate Schedule, fill in the capacity, allocated load, schedule duration and slot length, then publish the batch. Published batches show up right away for every customer in the covered area.",
    keywords: [
      "generate schedule",
      "create schedule",
      "publish",
      "capacity",
      "slot length",
      "substation manager",
      "make schedule",
    ],
    href: "/substation/schedules/generate",
    linkLabel: "Open Generate Schedule",
  },
  {
    id: "allocate-kw",
    title: "Allocate power (kW) across areas",
    answer:
      "Substation managers distribute the available capacity across areas from the Power → Allocate kW page. That allocation is what schedule generation uses when it splits capacity into outage slots.",
    keywords: [
      "allocate",
      "allocation",
      "kw",
      "kilowatt",
      "capacity",
      "budget",
    ],
    href: "/substation/allocate",
    linkLabel: "Open Allocate kW",
  },
  {
    id: "tokens",
    title: "Recharge a prepaid meter",
    answer:
      "Open My Tokens, choose a recharge amount and continue to bKash hosted checkout. When the payment completes you land back on the success or cancel page, and the purchased token number appears in your token list.",
    keywords: [
      "token",
      "recharge",
      "bkash",
      "b kash",
      "payment",
      "pay",
      "prepaid",
      "meter",
      "top up",
      "topup",
      "buy electricity",
      "purchase",
    ],
    href: "/dashboard/my-tokens",
    linkLabel: "Open My Tokens",
  },
  {
    id: "token-number",
    title: "Use a token number on my meter",
    answer:
      "Token numbers are formatted as XXXX-XXXX-XXXX-XXXX-XXXX. Type the number straight into your prepaid meter after recharging, or redeem it from the Recharge Token form inside My Tokens.",
    keywords: [
      "token number",
      "use token",
      "enter token",
      "meter number",
      "format",
      "redeem",
      "code",
    ],
    href: "/dashboard/my-tokens",
    linkLabel: "Open My Tokens",
  },
  {
    id: "payment-failed",
    title: "My payment failed or was cancelled",
    answer:
      "If you cancel the checkout or bKash returns a failure, the token stays UNPAID — you are never charged twice. Open My Tokens and press Pay on the unpaid token to restart checkout for that same token.",
    keywords: [
      "failed",
      "fail",
      "cancel",
      "cancelled",
      "canceled",
      "unpaid",
      "retry",
      "refund",
      "stuck",
      "error",
      "not working payment",
    ],
    href: "/dashboard/my-tokens",
    linkLabel: "Open My Tokens",
  },
  {
    id: "report-outage",
    title: "Report a power outage",
    answer:
      "Use Report Outage in the customer menu. Pick a severity — TOTAL_BLACKOUT, PARTIAL_POWER, DIM_LIGHTS, NEIGHBORHOOD_WIDE or OTHERS — add the address and the time the power went out, then submit. You receive a ticket number to track it.",
    keywords: [
      "report outage",
      "power outage",
      "blackout",
      "no power",
      "power cut",
      "power out",
      "no electricity",
      "out of power",
      "severity",
      "address",
      "outage",
      "complaint",
      "fault",
      "dead",
    ],
    href: "/customer/report-outage",
    linkLabel: "Open Report Outage",
  },
  {
    id: "outage-status",
    title: "How an outage ticket gets resolved",
    answer:
      "Every ticket moves through a fixed flow: PENDING → APPROVED → ASSIGNED → RESOLVED (or REOPENED). A zonal manager approves your report, a substation manager assigns an available technician, and the technician marks it resolved once the fault is fixed. You can watch each step by ticket number.",
    keywords: [
      "status",
      "pending",
      "approved",
      "assigned",
      "resolved",
      "reopened",
      "progress",
      "workflow",
      "who approves",
      "ticket",
      "steps",
    ],
  },
  {
    id: "technician-apply",
    title: "Apply as a technician",
    answer:
      "Open Apply as a Technician from the login page, complete the multi-step application (experience, expertise and resume), enter the OTP emailed to you, and wait for a substation manager to approve. Approved technicians then sign in like any other user.",
    keywords: [
      "become technician",
      "apply technician",
      "application",
      "resume",
      "otp",
      "verify email",
      "join",
      "signup technician",
      "technician job",
    ],
    href: "/apply-as-technician",
    linkLabel: "Start an application",
  },
  {
    id: "technician-work",
    title: "Technician assignments after approval",
    answer:
      "Sign in and open My Assignments in the technician dashboard. Each assigned outage report shows the ticket details and the customer address; mark the work done with Resolve Assignment, and keep your availability status up to date.",
    keywords: [
      "assignment",
      "resolve",
      "my assignments",
      "technician dashboard",
      "technician work",
      "availability",
      "duty",
      "dispatched",
    ],
    href: "/technician/assignments",
    linkLabel: "Open My Assignments",
  },
  {
    id: "approve-technician",
    title: "Review technician applications",
    answer:
      "Substation managers review applicants under Technicians → Applications: each entry shows the resume and experience and can be approved or rejected with a reason. The applicant sees that reason on their profile.",
    keywords: [
      "approve technician",
      "reject",
      "review application",
      "verification status",
      "applicants",
      "pending application",
    ],
    href: "/substation/technician-applications",
    linkLabel: "Open Applications",
  },
  {
    id: "zone-outages",
    title: "Zone manager outage workflow",
    answer:
      "Zonal managers open Zone → Outage Reports, inspect a report and approve or reject it. Approved reports are queued for a substation manager to dispatch a technician.",
    keywords: [
      "zonal",
      "zone manager",
      "approve outage",
      "review report",
      "reject report",
      "zone dashboard",
    ],
    href: "/zone/outage-reports",
    linkLabel: "Open Outage Reports",
  },
  {
    id: "demo-login",
    title: "Use the demo login buttons",
    answer:
      "The login page has one-click demo buttons for Customer, Technician, Zonal Manager and Substation Manager. Each authenticates a real demo account and drops you straight into that role's dashboard.",
    keywords: [
      "demo",
      "login",
      "sign in",
      "signin",
      "password",
      "account",
      "credentials",
      "test account",
    ],
    href: "/login",
    linkLabel: "Open login",
  },
  {
    id: "roles",
    title: "Which roles exist in the system?",
    answer:
      "Four roles, each with its own dashboard:\n\n• CUSTOMER — schedules, token recharges, outage reports\n• TECHNICIAN — assigned outage work\n• ZONE_MANAGER — approves outage reports, monitors zone schedules\n• SUBSTATION_MANAGER — schedules, kW allocation, technician dispatch and applications",
    keywords: [
      "role",
      "roles",
      "permission",
      "permissions",
      "who can",
      "access",
      "customer",
      "technician",
      "manager",
      "dashboard",
    ],
  },
  {
    id: "profile",
    title: "Update my profile & settings",
    answer:
      "Profile & Settings sits in the sidebar under Account on every dashboard, or directly at /dashboard/profile. It shows your account details, role and profile fields.",
    keywords: [
      "profile",
      "settings",
      "update account",
      "change details",
      "edit account",
      "my account",
    ],
    href: "/dashboard/profile",
    linkLabel: "Open Profile & Settings",
  },
  {
    id: "contact",
    title: "Contact support",
    answer:
      "Use the Contact page for questions, feedback or bug reports — it is linked from the site header and footer.",
    keywords: [
      "contact",
      "support",
      "help desk",
      "email",
      "phone",
      "reach you",
      "feedback",
      "bug",
    ],
    href: "/contact",
    linkLabel: "Open Contact",
  },
  {
    id: "faq",
    title: "Read the FAQ",
    answer:
      "The FAQ page has written answers about schedules, token recharges, outage tickets and demo access.",
    keywords: [
      "faq",
      "questions",
      "guide",
      "documentation",
      "docs",
      "learn",
      "read more",
    ],
    href: "/faq",
    linkLabel: "Open FAQ",
  },
];

/** Chips offered right after the greeting (and reused by the fallback). */
export const DEFAULT_SUGGESTIONS = [
  "schedule",
  "tokens",
  "report-outage",
  "technician-apply",
];

const GREETING_WORDS = new Set([
  "hi",
  "hey",
  "hello",
  "yo",
  "salam",
  "ola",
  "greetings",
  "ok",
  "okay",
  "hmm",
]);

const THANKS_WORDS = new Set(["thanks", "thank", "appreciate", "cheers"]);

/** Words too generic to carry meaning for matching. */
const STOP_WORDS = new Set([
  ...GREETING_WORDS,
  ...THANKS_WORDS,
  "a",
  "an",
  "the",
  "is",
  "are",
  "am",
  "was",
  "were",
  "be",
  "been",
  "being",
  "do",
  "does",
  "did",
  "can",
  "could",
  "should",
  "would",
  "will",
  "shall",
  "may",
  "might",
  "must",
  "i",
  "me",
  "my",
  "mine",
  "we",
  "our",
  "you",
  "your",
  "it",
  "its",
  "this",
  "that",
  "these",
  "those",
  "of",
  "in",
  "on",
  "at",
  "to",
  "for",
  "from",
  "with",
  "by",
  "and",
  "or",
  "if",
  "then",
  "so",
  "as",
  "what",
  "where",
  "when",
  "why",
  "how",
  "which",
  "who",
  "whom",
  "please",
  "plz",
  "pls",
  "thx",
  "there",
  "tell",
  "about",
  "get",
  "go",
  "make",
  "want",
  "need",
  "help",
  "any",
  "some",
  "much",
  "many",
]);

/**
 * Lowercases, strips punctuation and pads with spaces so keywords can be
 * matched with a guaranteed boundary on both sides (`" load shedding "`).
 */
function normalize(text: string): string {
  const core = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  return core ? ` ${core} ` : "";
}

function significantTokens(normalized: string): string[] {
  return normalized
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function scoreTopic(topic: IChatTopic, normalized: string): number {
  let score = 0;

  for (const keyword of topic.keywords) {
    const needle = normalize(keyword);
    if (needle && normalized.includes(needle)) {
      // Multi-word keywords are far more specific, so they outweigh single words.
      score += needle.trim().split(" ").length > 1 ? 3 : 1;
    }
  }

  // Question words from the chip label double as extra matching terms.
  for (const token of significantTokens(normalize(topic.title))) {
    if (normalized.includes(` ${token} `)) score += 1;
  }

  return score;
}

/** Finds the topic with the highest score, or `null` when nothing matches. */
export function matchTopic(query: string): IChatTopic | null {
  const normalized = normalize(query);
  if (!normalized) return null;

  // Suggestion chips submit a topic's own title, so an exact title match wins
  // outright. This also avoids ties such as "Generate a schedule batch".
  const exact = CHAT_TOPICS.find(
    (topic) => normalize(topic.title) === normalized,
  );
  if (exact) return exact;

  let best: IChatTopic | null = null;
  let bestScore = 0;

  for (const topic of CHAT_TOPICS) {
    const score = scoreTopic(topic, normalized);
    if (score > bestScore) {
      best = topic;
      bestScore = score;
    }
  }

  return best;
}

/** Looks up a topic by id so suggestion chips can be resolved to labels. */
export function getTopic(id: string): IChatTopic | undefined {
  return CHAT_TOPICS.find((topic) => topic.id === id);
}

const GREETING_REPLY =
  "Hi! I'm the Power Assistant for the Load Shedding & Power Management System.\n\nAsk me about load-shedding schedules, meter token recharges, outage reports or technician applications.";

const THANKS_REPLY =
  "You're welcome! Ask me anything else about schedules, tokens, outages or accounts.";

const FALLBACK_REPLY =
  "I don't have an answer for that yet. Try one of the topics below, or open the FAQ for the written version.";

/**
 * Resolves a user message to a reply. Handles greetings/thanks first, then
 * falls back to keyword matching, then to a polite "I don't know" that still
 * points at the FAQ.
 */
export function answerFor(query: string): IChatReply {
  const normalized = normalize(query);
  const words = normalized ? normalized.split(" ").filter(Boolean) : [];

  if (words.length === 0) {
    return { content: GREETING_REPLY, suggestions: DEFAULT_SUGGESTIONS };
  }

  // Greetings and thanks ("hi", "thanks!", "ok thanks") carry no search intent.
  const hasContent = words.some(
    (word) => word.length > 1 && !STOP_WORDS.has(word),
  );
  if (!hasContent) {
    const isThanks = words.some((word) => THANKS_WORDS.has(word));
    return {
      content: isThanks ? THANKS_REPLY : GREETING_REPLY,
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  const topic = matchTopic(query);
  if (topic) {
    return {
      content: topic.answer,
      href: topic.href,
      linkLabel: topic.linkLabel,
      suggestions: pickSuggestions(topic.id),
    };
  }

  return {
    content: FALLBACK_REPLY,
    href: "/faq",
    linkLabel: "Open the FAQ",
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

/** The topic's own chip plus three related ones that are not a repeat of it. */
function pickSuggestions(topicId: string): string[] {
  const ids = [topicId, ...DEFAULT_SUGGESTIONS].filter(
    (id, index, all) => all.indexOf(id) === index,
  );
  return ids.slice(0, 4);
}
