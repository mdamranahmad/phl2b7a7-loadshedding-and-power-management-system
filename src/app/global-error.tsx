"use client";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
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
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Application Error
        </h1>
        <p style={{ color: "#666", maxWidth: "32rem" }}>
          {error.message ||
            "Something went wrong while rendering the application."}
        </p>
        <button
          type="button"
          onClick={retry}
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "0.75rem",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
