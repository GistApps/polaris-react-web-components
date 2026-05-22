/**
 * Layout + Layout.Section
 *
 * Faithful port of the Polaris React Layout CSS:
 *   https://github.com/Shopify/polaris-react/blob/main/polaris-react/src/components/Layout/Layout.module.css
 *
 * The container is `display: flex; flex-wrap: wrap`. Sections flow into the
 * same row by their flex-basis. The negative-margin/positive-margin pattern
 * provides uniform 16px gutters.
 *
 * Section widths:
 *   default    → flex: 2 2 360px; min-width: 51%  (forces full row unless paired with a sidebar)
 *   oneThird   → flex: 1 1 160px; min-width: 0
 *   oneHalf    → flex: 1 1 240px; min-width: 0
 *   twoThirds  → flex: 2 2 240px; min-width: 0
 *   fullWidth  → flex: 1 1 100%
 *   secondary  → same as oneThird
 */
import React from "react";

const GAP = "var(--p-space-400, 16px)";

// ---------------------------------------------------------------------------
// Layout.Section
// ---------------------------------------------------------------------------
export interface LayoutSectionProps {
  children?: React.ReactNode;
  secondary?: boolean;
  oneThird?: boolean;
  twoThirds?: boolean;
  fullWidth?: boolean;
  variant?: "oneThird" | "twoThirds" | "oneHalf" | "fullWidth" | string;
}

function LayoutSection({
  children,
  secondary,
  oneThird,
  twoThirds,
  fullWidth,
  variant,
}: LayoutSectionProps) {
  let flexStyle: React.CSSProperties;

  if (fullWidth || variant === "fullWidth") {
    flexStyle = { flex: "1 1 100%" };
  } else if (secondary || oneThird || variant === "oneThird") {
    flexStyle = { flex: "1 1 160px", minWidth: 0 };
  } else if (variant === "oneHalf") {
    flexStyle = { flex: "1 1 240px", minWidth: 0 };
  } else if (twoThirds || variant === "twoThirds") {
    flexStyle = { flex: "2 2 240px", minWidth: 0 };
  } else {
    // Default: takes up ~2/3 of a row; min-width: 51% means it wraps solo
    // when no room for a sidebar, matching Polaris React behaviour exactly.
    flexStyle = { flex: "2 2 360px", minWidth: "51%" };
  }

  return (
    <div
      style={{
        ...flexStyle,
        maxWidth: `calc(100% - ${GAP})`,
        marginTop: GAP,
        marginLeft: GAP,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
export interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: `calc(-1 * ${GAP})`,
        marginLeft: `calc(-1 * ${GAP})`,
      }}
    >
      {children}
    </div>
  );
}

Layout.Section = LayoutSection;

