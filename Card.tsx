/**
 * Card — wraps <s-section>.
 * Polaris React `Card` maps to App Home `Section` in the embedded UI.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/section
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SSectionEl = (props: any) => React.createElement("s-section", { suppressHydrationWarning: true, ...props });

export interface CardProps {
  children?: React.ReactNode;
  /** Optional heading rendered in the section header. */
  title?: string;
  /** When "0", removes padding. Maps to padding="none". */
  padding?: string;
}

export function Card({ children, title, padding }: CardProps) {
  const padAttr = padding === "0" ? "none" : undefined;

  return (
    <SSectionEl heading={title || undefined} padding={padAttr}>
      {children}
    </SSectionEl>
  );
}

// ---------------------------------------------------------------------------
// Card.Section — nested section within a Card. No direct equivalent in
// App Home web components; render children directly (section spacing is
// handled by the parent <s-section>).
// ---------------------------------------------------------------------------
Card.Section = function CardSection({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <>{children}</>;
};
