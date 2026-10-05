"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import type { CSSProperties } from "react";
export default function SafeImage({
  src,
  alt,
  style,
}: {
  src?: string | null;
  alt: string;
  style?: CSSProperties;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const valid =
    typeof src === "string" &&
    (/^https?:\/\//i.test(src) || /^\/(?!\/)/.test(src));
  if (!valid || failedSource === src)
    return (
      <Box
        role="img"
        aria-label={alt}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#eee",
          color: "text.secondary",
          p: 1,
          textAlign: "center",
          overflow: "hidden",
        }}
        style={{ width: "100%", height: "100%", ...style }}
      >
        {alt}
      </Box>
    );
  // External images may be absent or from old storage hosts; retain a readable fallback.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src!}
      alt={alt}
      onError={() => setFailedSource(src!)}
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "contain", ...style }}
    />
  );
}