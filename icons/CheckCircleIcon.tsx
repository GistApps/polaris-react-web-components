/**
 * CheckCircleIcon — SVG icon component.
 * There is no direct `<s-icon>` equivalent for this specific icon shape, so we
 * keep it as a plain React SVG component.
 */
import React from "react";

export interface CheckCircleIconProps {
  /** Icon size in pixels. */
  width?: number;
  height?: number;
  /** Accessible label. */
  accessibilityLabel?: string;
  /** Fill colour (CSS colour string). */
  fill?: string;
  /** Tone applied via CSS custom properties. */
  tone?: "base" | "success" | "critical" | "warning" | "info" | "magic" | "subdued";
}

const TONE_COLORS: Record<string, string> = {
  success:  "var(--p-color-icon-success, #007c5b)",
  critical: "var(--p-color-icon-critical, #d72c0d)",
  warning:  "var(--p-color-icon-warning, #ffc453)",
  info:     "var(--p-color-icon-info, #3b5bdb)",
  magic:    "var(--p-color-icon-magic, #7c3aed)",
  subdued:  "var(--p-color-icon-subdued, #8a8a8a)",
  base:     "var(--p-color-icon, #303030)",
};

export function CheckCircleIcon({
  width = 20,
  height = 20,
  accessibilityLabel,
  fill,
  tone = "base",
}: CheckCircleIconProps) {
  const color = fill ?? TONE_COLORS[tone] ?? TONE_COLORS.base;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={width}
      height={height}
      fill={color}
      aria-label={accessibilityLabel}
      aria-hidden={accessibilityLabel ? undefined : true}
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z"
      />
    </svg>
  );
}
