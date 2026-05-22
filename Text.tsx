/**
 * Text — maps Polaris React `Text` to the appropriate App Home web-component.
 *
 * Mapping strategy:
 *   - `as` ∈ h1-h6, or `variant` starts with "heading" → <s-heading>
 *   - `as` = "p", `as` = "div", body variants             → <s-paragraph>
 *   - everything else (span, strong, em, …)               → <s-text>
 *
 * References:
 *   https://shopify.dev/docs/api/app-home/web-components/typography-and-content/text
 *   https://shopify.dev/docs/api/app-home/web-components/typography-and-content/paragraph
 *   https://shopify.dev/docs/api/app-home/web-components/typography-and-content/heading
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const STextEl      = (props: any) => React.createElement("s-text",      { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SParagraphEl = (props: any) => React.createElement("s-paragraph", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SHeadingEl   = (props: any) => React.createElement("s-heading",   { suppressHydrationWarning: true, ...props });

/** Subset of Polaris React tone names that map to App Home tones. */
const TONE_MAP: Record<string, string> = {
  subdued:   "subdued",
  critical:  "critical",
  success:   "success",
  caution:   "caution",
  warning:   "caution",
  attention: "caution",
  magic:     "magic",
  info:      "info",
};

function mapTone(tone?: string) {
  if (!tone) return undefined;
  return TONE_MAP[tone] ?? tone;
}

type TextVariant =
  | "heading3xl" | "heading2xl" | "headingXl" | "headingLg"
  | "headingMd"  | "headingSm"  | "headingXs"
  | "bodyLg"     | "bodyMd"     | "bodySm"    | "bodyXs";

export interface TextProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
     | "p"  | "div" | "span" | "strong" | "em" | "dt" | "dd" | "li";
  variant?: TextVariant;
  tone?: string;
  fontWeight?: "bold" | "semibold" | "medium" | "regular";
  alignment?: "start" | "center" | "end" | "justify";
  truncate?: boolean;
  /** Break long words to prevent overflow. */
  breakWord?: boolean;
  /** Text decoration (e.g. line-through). */
  textDecorationLine?: "line-through" | "none";
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
const BLOCK_TAGS   = new Set(["p", "div", "dt", "dd"]);

export function Text({
  as,
  variant,
  tone,
  fontWeight,
  style,
  children,
}: TextProps) {
  const mappedTone = mapTone(tone);
  const isHeadingVariant = variant?.startsWith("heading") ?? false;
  const isHeadingTag     = as ? HEADING_TAGS.has(as) : false;
  const isBlockTag       = as ? BLOCK_TAGS.has(as)   : false;

  // strong / bold formatting
  const typeAttr =
    fontWeight === "bold" || fontWeight === "semibold" || as === "strong"
      ? "strong"
      : as === "em"
        ? "emphasis"
        : undefined;

  if (isHeadingVariant || isHeadingTag) {
    return (
      <SHeadingEl tone={mappedTone} style={style}>
        {children}
      </SHeadingEl>
    );
  }

  if (isBlockTag) {
    return (
      <SParagraphEl tone={mappedTone} type={typeAttr} style={style}>
        {children}
      </SParagraphEl>
    );
  }

  return (
    <STextEl tone={mappedTone} type={typeAttr} style={style}>
      {children}
    </STextEl>
  );
}
