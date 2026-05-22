/**
 * ButtonGroup — wraps multiple buttons in an inline stack.
 * App Home doesn't have a dedicated <s-button-group>; use <s-stack> instead.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/stack
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SStackEl = (props: any) => React.createElement("s-stack", { suppressHydrationWarning: true, ...props });

export interface ButtonGroupProps {
  children?: React.ReactNode;
  /** Render buttons without spacing between them (segmented). */
  segmented?: boolean;
  /** Full-width block (not directly supported; passed to stack). */
  fullWidth?: boolean;
  /** Force no-wrap. */
  noWrap?: boolean;
}

export function ButtonGroup({ children, noWrap }: ButtonGroupProps) {
  return (
    <SStackEl
      direction="inline"
      gap="small"
      style={noWrap ? { flexWrap: "nowrap" } : undefined}
    >
      {children}
    </SStackEl>
  );
}
