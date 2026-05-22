import React, { useId } from "react";

export interface GridProps {
  /** Number of equal-width columns on desktop. */
  columns?: number;
  /** Pixel gap between cells. */
  gap?: number;
  /** Collapse to one column below this breakpoint. */
  collapseBelowPx?: number;
  /** Draw divider lines between columns. */
  divided?: boolean;
  /** Vertical alignment of each grid cell's content. */
  verticalAlign?: "start" | "center" | "end";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Grid({
  columns = 3,
  gap = 16,
  collapseBelowPx = 1024,
  divided = false,
  verticalAlign = "start",
  children,
  style,
}: GridProps) {
  const id = useId().replace(/[^a-z0-9]/gi, "");
  const className = `np-grid-${id}`;
  const cells = React.Children.toArray(children);
  const alignItems =
    verticalAlign === "center"
      ? "center"
      : verticalAlign === "end"
        ? "flex-end"
        : "flex-start";

  return (
    <>
      <style suppressHydrationWarning>{`
        .${className} {
          display: grid;
          grid-template-columns: repeat(${columns}, minmax(0, 1fr));
          gap: ${gap}px;
          align-items: stretch;
        }

        .${className} > .${className}__cell {
          display: flex;
          align-items: ${alignItems};
          min-height: 100%;
        }

        .${className} > .${className}__cell > .${className}__inner {
          width: 100%;
        }

        @media (max-width: ${collapseBelowPx}px) {
          .${className} {
            grid-template-columns: 1fr;
          }
          .${className} > .${className}__cell {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
      `}</style>

      <div className={className} style={style}>
        {cells.map((child, idx) => (
          <div
            key={idx}
            className={`${className}__cell`}
            style={
              divided && idx < cells.length - 1
                ? {
                    borderRight: "1px solid var(--p-color-border-subdued)",
                    paddingRight: 12,
                  }
                : undefined
            }
          >
            <div className={`${className}__inner`}>{child}</div>
          </div>
        ))}
      </div>
    </>
  );
}
