/**
 * Icon — wraps <s-icon>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/media-and-visuals/icon
 *
 * Falls back to rendering the React component source directly for custom SVG icons
 * passed from @shopify/polaris-icons.
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SIconEl = (props: any) => React.createElement("s-icon", { suppressHydrationWarning: true, ...props });

export interface IconProps {
  /** An icon name string from the Shopify icon library, or a React SVG component. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source?: string | React.ComponentType<any>;
  tone?: string;
  accessibilityLabel?: string;
}

export function Icon({ source, tone, accessibilityLabel }: IconProps) {
  // If source is a React component (e.g. from @shopify/polaris-icons), render it directly.
  if (source && typeof source === "function") {
    try {
      const Comp = source as React.ComponentType<{ width?: number; height?: number; style?: React.CSSProperties }>;
      return <Comp width={20} height={20} />;
    } catch {
      return <span aria-hidden="true">•</span>;
    }
  }

  // Otherwise render the s-icon web component with the icon name string.
  return (
    <SIconEl
      type={source}
      tone={tone}
      accessibilityLabel={accessibilityLabel}
    />
  );
}
