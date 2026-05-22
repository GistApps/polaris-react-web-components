/**
 * Badge — wraps <s-badge>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/feedback-and-status-indicators/badge
 *
 * Maps Polaris React tone names to App Home tone names:
 *   attention / warning → caution
 *   new                 → info
 *   neutral             → auto (default)
 */
import React from "react";
import { badgeTone } from "./tokens";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SBadgeEl = (props: any) => React.createElement("s-badge", { suppressHydrationWarning: true, ...props });

export type BadgeTone =
  | "success"
  | "attention"
  | "warning"
  | "caution"
  | "critical"
  | "info"
  | "new"
  | "neutral"
  | "magic";

export interface BadgeProps {
  tone?: BadgeTone;
  children?: React.ReactNode;
}

export function Badge({ tone, children }: BadgeProps) {
  return (
    <SBadgeEl tone={badgeTone(tone)}>
      {children}
    </SBadgeEl>
  );
}
