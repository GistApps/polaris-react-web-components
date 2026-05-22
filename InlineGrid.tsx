/**
 * InlineGrid — wraps <s-grid> / <s-grid-item>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/grid
 */
import React from "react";
import { sp } from "./tokens";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SGridEl = (props: any) => React.createElement("s-grid", { suppressHydrationWarning: true, ...props });

/** Accepts the same columns formats as Polaris React InlineGrid. */
export interface InlineGridProps {
  columns?: number | string | { xs?: number | string; sm?: number | string; md?: number | string; lg?: number | string };
  gap?: string;
  alignItems?: "start" | "end" | "center" | "stretch";
  children?: React.ReactNode;
}

function resolveColumns(
  columns?: InlineGridProps["columns"],
): string | undefined {
  if (!columns) return undefined;
  if (typeof columns === "number") return `repeat(${columns}, 1fr)`;
  if (typeof columns === "string") return columns;
  // Responsive object — use md > sm > xs > lg priority for a single value
  const val = columns.md ?? columns.sm ?? columns.xs ?? columns.lg;
  if (!val) return undefined;
  return typeof val === "number" ? `repeat(${val}, 1fr)` : val;
}

export function InlineGrid({ columns, gap, alignItems, children }: InlineGridProps) {
  return (
    <SGridEl
      gridTemplateColumns={resolveColumns(columns)}
      gap={sp(gap)}
      alignItems={alignItems}
    >
      {children}
    </SGridEl>
  );
}
