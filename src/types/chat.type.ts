/** One entry of the assistant's offline knowledge base. */
export interface IChatTopic {
  /** Stable identifier, also used for picking default suggestions. */
  id: string;
  /** Short label shown on suggestion chips. */
  title: string;
  /** Plain-text answer handed back when the query matches this topic. */
  answer: string;
  /** Terms (single or multi word) matched against the normalized question. */
  keywords: string[];
  /** Optional deep link rendered as a CTA inside the answer bubble. */
  href?: string;
  /** Label of that CTA, e.g. "Open My Tokens". */
  linkLabel?: string;
}

/** The assistant's computed reply for a single user message. */
export interface IChatReply {
  content: string;
  href?: string;
  linkLabel?: string;
  /** Topic ids of the follow-up chips offered under the answer. */
  suggestions: string[];
}

/** A single entry in the conversation transcript. */
export interface IChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  href?: string;
  linkLabel?: string;
  suggestions?: string[];
}
