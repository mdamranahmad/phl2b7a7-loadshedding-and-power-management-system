"use client";

import { THEME_INIT_SCRIPT } from "@/lib/theme";

// global-error replaces the root layout, so globals.css is not guaranteed to be
// loaded here. Everything this page needs is inlined.
const STYLES = `
:root {
  color-scheme: light;
  --ge-background: #ffffff;
  --ge-foreground: #16191a;
  --ge-muted: #59666c;
}
.dark {
  color-scheme: dark;
  --ge-background: #131718;
  --ge-foreground: #f2f5f5;
  --ge-muted: #a8b3b8;
}
`;

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{STYLES}</style>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, no user input
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1rem",
          background: "var(--ge-background)",
          color: "var(--ge-foreground)",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Application Error
        </h1>
        <p style={{ color: "var(--ge-muted)", maxWidth: "32rem" }}>
          {error.message ||
            "Something went wrong while rendering the application."}
        </p>
        <button
          type="button"
          onClick={retry}
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
            background: "var(--ge-foreground)",
            color: "var(--ge-background)",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
