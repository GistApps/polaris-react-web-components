/**
 * BlockStack — wraps <s-stack direction="block">.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/stack
 */
import React from "react";
import { sp } from "./tokens";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SStackEl = (props: any) => React.createElement("s-stack", { suppressHydrationWarning: true, ...props });

export interface BlockStackProps {
  gap?: string;
  align?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
  inlineAlign?: "start" | "end" | "center" | "baseline" | "stretch";
  children?: React.ReactNode;
}

export function BlockStack({ gap, align, inlineAlign, children }: BlockStackProps) {
  return (
    <SStackEl
      direction="block"
      gap={sp(gap)}
      justifyContent={align}
      alignItems={inlineAlign}
    >
      {children}
    </SStackEl>
  );
}
