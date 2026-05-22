import React from "react";
import { Text } from "./Text";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SGridEl = (props: any) => React.createElement("s-grid", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SBoxEl = (props: any) => React.createElement("s-box", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SClickableEl = (props: any) => React.createElement("s-clickable", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SImageEl = (props: any) => React.createElement("s-image", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SDividerEl = (props: any) => React.createElement("s-divider", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SHeadingEl = (props: any) => React.createElement("s-heading", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SButtonEl = (props: any) => React.createElement("s-button", { suppressHydrationWarning: true, ...props });

export interface MediaCardProps {
  title: string;
  imageSrc?: string | null;
  imageAlt: string;
  actionLabel?: string;
  actionAccessibilityLabel?: string;
  onAction?: () => void;
  minBlockSize?: string;
  maxInlineSize?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function MediaCard({
  title,
  imageSrc,
  imageAlt,
  actionLabel = "Edit",
  actionAccessibilityLabel,
  onAction,
  minBlockSize = "300px",
  maxInlineSize = "216px",
  emptyTitle = "No artwork selected yet",
  emptyDescription = "Upload or select artwork in step 1.",
}: MediaCardProps) {
  if (!imageSrc) {
    return (
      <div
        style={{
          border: "1px dashed #C9CCCF",
          borderRadius: 10,
          minHeight: 220,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          color: "#6D7175",
          textAlign: "center",
          padding: 18,
        }}
      >
        <div style={{ fontSize: 30 }}>🖼️</div>
        <Text as="p" variant="bodyMd" fontWeight="semibold">
          {emptyTitle}
        </Text>
        <Text as="p" variant="bodySm" tone="subdued">
          {emptyDescription}
        </Text>
      </div>
    );
  }

  return (
    <SGridEl justifyItems="center" alignItems="center" minBlockSize={minBlockSize}>
      <SBoxEl border="base" borderRadius="base" overflow="hidden" maxInlineSize={maxInlineSize}>
        <SClickableEl>
          <SImageEl
            aspectRatio="1/1"
            objectFit="cover"
            alt={imageAlt}
            src={imageSrc}
          />
        </SClickableEl>
        <SDividerEl />
        <SGridEl
          gridTemplateColumns="1fr auto"
          background="base"
          padding="small"
          gap="small"
          alignItems="center"
        >
          <SHeadingEl>{title}</SHeadingEl>
          {onAction ? (
            <SButtonEl
              onClick={onAction}
              accessibilityLabel={actionAccessibilityLabel ?? actionLabel}
            >
              {actionLabel}
            </SButtonEl>
          ) : null}
        </SGridEl>
      </SBoxEl>
    </SGridEl>
  );
}
