import React from "react";
import { Thumbnail } from "./Thumbnail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SBoxEl = (props: any) => React.createElement("s-box", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SGridEl = (props: any) => React.createElement("s-grid", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SCheckboxEl = (props: any) => React.createElement("s-checkbox", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SButtonEl = (props: any) => React.createElement("s-button", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SParagraphEl = (props: any) => React.createElement("s-paragraph", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SStackEl = (props: any) => React.createElement("s-stack", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SImageEl = (props: any) => React.createElement("s-image", { suppressHydrationWarning: true, ...props });

export interface HelpCardAction {
  label: string;
  onClick?: () => void;
  href?: string;
  accessibilityLabel?: string;
}

export interface HelpCardImage {
  src: string;
  alt: string;
}

export interface HelpCardProps {
  content: React.ReactNode;
  primaryAction?: HelpCardAction;
  secondaryAction?: HelpCardAction;
  img?: HelpCardImage;
}

export function HelpCard({
  content,
  primaryAction,
  secondaryAction,
  img,
}: HelpCardProps) {
  return (
    <SBoxEl padding="base" background="subdued" borderRadius="base">
      <SGridEl
        gridTemplateColumns="1fr auto"
        gap="base"
        alignItems="center"
      >
        <SGridEl gap="small-200">
          <SParagraphEl>
            {content}
          </SParagraphEl>
          <SStackEl direction="inline" gap="small-200">
            {primaryAction && (
              <SButtonEl
                variant="primary"
                onClick={primaryAction.onClick}
                href={primaryAction.href}
                accessibilityLabel={primaryAction.accessibilityLabel ?? primaryAction.label}
              >
                {primaryAction.label}
              </SButtonEl>
            )}
            {secondaryAction && (
              <SButtonEl
                variant="tertiary"
                tone="neutral"
                onClick={secondaryAction.onClick}
                href={secondaryAction.href}
                accessibilityLabel={secondaryAction.accessibilityLabel ?? secondaryAction.label}
              >
                {secondaryAction.label}
              </SButtonEl>
            )}
          </SStackEl>
        </SGridEl>
        {img && (
          <SBoxEl maxBlockSize="120px" maxInlineSize="120px">
            <Thumbnail size="large" source={img.src} alt={img.alt} />
          </SBoxEl>
        )}
      </SGridEl>
    </SBoxEl>
  );
}
