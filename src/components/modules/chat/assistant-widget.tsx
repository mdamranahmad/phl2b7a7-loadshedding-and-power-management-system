"use client";

import { Bot, MessageCircle, Send, Sparkles, Trash2, X } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { answerFor, getTopic } from "@/lib/chat-knowledge";
import type { IChatMessage } from "@/types";

/** Session-scoped transcript ids so React keys stay unique and stable. */
let messageSeq = 0;
const nextMessageId = () => `chat-${++messageSeq}`;

function welcomeMessage(): IChatMessage {
  const welcome = answerFor("");
  return {
    id: nextMessageId(),
    role: "assistant",
    content: welcome.content,
    suggestions: welcome.suggestions,
  };
}

/**
 * Floating "Power Assistant" widget: a rule-based helper that answers from an
 * offline knowledge base (`src/lib/chat-knowledge.ts`), offers follow-up chips
 * and deep links to the page that performs the job. It stays mounted in the
 * root layout, so the transcript survives client-side navigation.
 */
export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<IChatMessage[]>(() => [
    welcomeMessage(),
  ]);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Scrolls the transcript to the newest bubble. */
  // biome-ignore lint/correctness/useExhaustiveDependencies: the ref read is invisible to the linter, but new messages and the typing indicator must re-trigger the scroll
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, isThinking]);

  /** Moves focus into the composer whenever the panel opens. */
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  /** Escape closes the panel from anywhere on the page. */
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  /** Never leave a pending answer timer behind. */
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const send = (raw: string) => {
    const question = raw.trim();
    if (!question || isThinking) return;

    setMessages((prev) => [
      ...prev,
      { id: nextMessageId(), role: "user", content: question },
    ]);
    setDraft("");
    setIsThinking(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const reply = answerFor(question);
      setMessages((prev) => [
        ...prev,
        { id: nextMessageId(), role: "assistant", ...reply },
      ]);
      timerRef.current = null;
      setIsThinking(false);
    }, 400);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(draft);
  };

  const resetChat = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setIsThinking(false);
    setDraft("");
    setMessages([welcomeMessage()]);
    inputRef.current?.focus();
  };

  /** Keeps Tab cycling inside the panel while it is open. */
  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <Button
        type="button"
        size="icon-lg"
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="fixed right-4 bottom-4 z-50 size-12 rounded-full shadow-lg"
      >
        {isOpen ? (
          <X className="size-5" aria-hidden />
        ) : (
          <MessageCircle className="size-5" aria-hidden />
        )}
      </Button>

      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Power Assistant"
          onKeyDown={trapFocus}
          className="fixed right-4 bottom-20 z-50 flex h-[min(34rem,calc(100dvh-7rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b bg-muted/40 px-4 py-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-tight font-semibold">
                Power Assistant
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Schedules, tokens &amp; outages
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={resetChat}
              aria-label="Clear conversation"
            >
              <Trash2 aria-hidden />
            </Button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm break-words whitespace-pre-wrap text-primary-foreground">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex justify-start">
                  <div className="max-w-[92%] space-y-2 rounded-2xl rounded-bl-md bg-muted px-3 py-2 text-sm break-words whitespace-pre-line">
                    <p>{message.content}</p>

                    {message.href && message.linkLabel && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-fit"
                        nativeButton={false}
                        render={<Link href={message.href} />}
                      >
                        {message.linkLabel}
                      </Button>
                    )}

                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {message.suggestions.map((topicId) => {
                          const topic = getTopic(topicId);
                          if (!topic) return null;
                          return (
                            <Button
                              key={topicId}
                              type="button"
                              variant="outline"
                              size="xs"
                              disabled={isThinking}
                              onClick={() => send(topic.title)}
                            >
                              {topic.title}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}

            {isThinking && (
              <div className="flex justify-start" aria-hidden>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-3 py-3">
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t p-3"
          >
            <Input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about schedules, tokens…"
              aria-label="Message the Power Assistant"
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Send message"
              disabled={!draft.trim() || isThinking}
            >
              <Send aria-hidden />
            </Button>
          </form>

          <p className="border-t px-4 py-2 text-center text-[11px] text-muted-foreground">
            <Sparkles className="mr-1 inline size-3 align-[-2px]" aria-hidden />
            Answers come from the app's own help guide
          </p>
        </div>
      )}
    </>
  );
}
