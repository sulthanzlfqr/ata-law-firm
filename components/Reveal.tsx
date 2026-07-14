"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay before the animation starts, in ms. Use for stagger. */
  delay?: number;
  /** Transition duration, in ms. */
  duration?: number;
  /** Starting vertical offset, in px (element travels from y to 0). */
  y?: number;
  /** Starting scale (element grows from scale to 1). Omit for no scale effect. */
  scale?: number;
  threshold?: number;
};

/**
 * Wraps children in a fade/translate reveal that plays once when the
 * element first enters the viewport. Falls back to instantly visible
 * when JS is unavailable (see .reveal noscript override) or the user
 * prefers reduced motion (see globals.css media query).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  duration = 500,
  y = 12,
  scale,
  threshold = 0.15,
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold });

  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
    "--reveal-y": `${y}px`,
    "--reveal-scale": scale ?? 1,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      style={style}
      className={`reveal${isVisible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}
