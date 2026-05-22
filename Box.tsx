/**
 * Box — wraps <s-box>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/box
 *
 * All spacing (padding*) and background props are translated from Polaris React
 * numeric tokens to App Home keywords via tokens.ts.
 */
import React from "react";
import { sp, bg, radius, borderColor as mapBorderColor } from "./tokens";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SBoxEl = (props: any) => React.createElement("s-box", { suppressHydrationWarning: true, ...props });

export interface BoxProps {
  padding?: string;
  paddingBlock?: string;
  paddingBlockStart?: string;
  paddingBlockEnd?: string;
  paddingInline?: string;
  paddingInlineStart?: string;
  paddingInlineEnd?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  borderWidth?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  overflowX?: "visible" | "hidden" | "scroll" | "auto";
  overflowY?: "visible" | "hidden" | "scroll" | "auto";
  children?: React.ReactNode;
  /** Passed straight through for escape-hatch styling. */
  style?: React.CSSProperties;
}

export function Box({
  padding,
  paddingBlock,
  paddingBlockStart,
  paddingBlockEnd,
  paddingInline,
  paddingInlineStart,
  paddingInlineEnd,
  background,
  borderRadius: br,
  borderColor: bc,
  borderWidth,
  width,
  height,
  minWidth,
  minHeight,
  overflowX,
  overflowY,
  children,
  style,
}: BoxProps) {
  // Build an inline style for props the web component doesn't natively support
  const extraStyle: React.CSSProperties = { ...style };
  if (width)     extraStyle.width     = width;
  if (height)    extraStyle.height    = height;
  if (minWidth)  extraStyle.minWidth  = minWidth;
  if (minHeight) extraStyle.minHeight = minHeight;
  if (overflowX) extraStyle.overflowX = overflowX;
  if (overflowY) extraStyle.overflowY = overflowY;

  return (
    <SBoxEl
      padding={sp(padding)}
      paddingBlock={sp(paddingBlock)}
      paddingBlockStart={sp(paddingBlockStart)}
      paddingBlockEnd={sp(paddingBlockEnd)}
      paddingInline={sp(paddingInline)}
      paddingInlineStart={sp(paddingInlineStart)}
      paddingInlineEnd={sp(paddingInlineEnd)}
      background={bg(background)}
      borderRadius={radius(br)}
      borderColor={mapBorderColor(bc)}
      borderWidth={borderWidth}
      style={Object.keys(extraStyle).length ? extraStyle : undefined}
    >
      {children}
    </SBoxEl>
  );
}
