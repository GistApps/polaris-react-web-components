/**
 * InlineStack — wraps <s-stack direction="inline">.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/stack
 */
import React from "react";
import { sp } from "./tokens";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SStackEl = (props: any) => React.createElement("s-stack", { suppressHydrationWarning: true, ...props });

export interface InlineStackProps {
  gap?: string;
  /** Distribution along the inline (horizontal) axis */
  align?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
  /** Alignment along the block (vertical) axis */
  blockAlign?: "start" | "end" | "center" | "baseline" | "stretch";
  wrap?: boolean;
  children?: React.ReactNode;
}

export function InlineStack({ gap, align, blockAlign, wrap, children }: InlineStackProps) {
  return (
    <SStackEl
      direction="inline"
      gap={sp(gap)}
      justifyContent={align}
      alignItems={blockAlign}
      // s-stack wraps by default; to prevent wrapping use CSS via a style prop
      style={wrap === false ? { flexWrap: "nowrap" } : undefined}
    >
      {children}
    </SStackEl>
  );
}
