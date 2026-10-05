"use client";
import { useEffect } from "react";
const sources: Record<string, string> = {
  recommendations: "/recommended-initiatives",
  initiatives: "/initiatives",
  owned: "/profile#owned-initiatives",
};
export function sourcePath(source: string | null): string {
  return sources[source || ""] || "/initiatives";
}
export function rememberListPosition() {
  try {
    sessionStorage.setItem(
      `list-scroll:${window.location.pathname}`,
      String(window.scrollY)
    );
  } catch {}
}
export function detailHref(id: string) {
  const source =
    typeof window !== "undefined" &&
    window.location.pathname === "/recommended-initiatives"
      ? "recommendations"
      : typeof window !== "undefined" && window.location.pathname === "/profile"
      ? "owned"
      : "initiatives";
  return `/initiatives/${encodeURIComponent(id)}?from=${source}`;
}
export function useRestoreListPosition(ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    let frame = 0;
    try {
      const key = `list-scroll:${window.location.pathname}`;
      const value = sessionStorage.getItem(key);
      if (value !== null) {
        const offset = Number(value);
        frame = requestAnimationFrame(() => {
          window.scrollTo(0, Number.isFinite(offset) ? offset : 0);
          sessionStorage.removeItem(key);
        });
      }
    } catch {}
    return () => cancelAnimationFrame(frame);
  }, [ready]);
}