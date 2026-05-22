/**
 * Tooltip — wraps <s-tooltip>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/typography-and-content/tooltip
 *
 * Correct s-tooltip API:
 *   <s-tooltip id="…">tooltip text</s-tooltip>    ← content goes INSIDE the element
 *   <activator interestfor="…">…</activator>       ← activator references the tooltip by id
 *
 * s-tooltip only accepts text, s-text, or s-paragraph as children — NOT arbitrary
 * HTML elements. `interestfor` must live directly on the interactive element (button,
 * s-text, s-button, etc.) — it does NOT work on a wrapper <span>.
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const STooltipEl = (props: any) => React.createElement("s-tooltip", { suppressHydrationWarning: true, ...props });

export interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  /** Dismiss tooltip when mouse leaves (ignored; included for compatibility). */
  dismissOnMouseOut?: boolean;
  /** Show tooltip without delay. */
  hasUnderline?: boolean;
  /** Preferred position (ignored). */
  preferredPosition?: "above" | "below" | "mostSpace";
}

export function Tooltip({ content, children }: TooltipProps) {
  const rawId = React.useId();
  // React useId returns strings like ":r0:" — colons are invalid in HTML id values.
  const id = rawId.replace(/:/g, "tt");

  // Inject `interestfor` directly onto the child element so the trigger
  // is on the interactive element itself (required by the Interest Invoker API).
  // Falls back to rendering children as-is if they aren't a valid React element.
  const activator = React.isValidElement(children)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? React.cloneElement(children as React.ReactElement<any>, { interestfor: id } as any)
    : children;

  return (
    <>
      {/* Tooltip text content — must be plain text only, no HTML children. */}
      <STooltipEl id={id}>{content}</STooltipEl>
      {activator}
    </>
  );
}
