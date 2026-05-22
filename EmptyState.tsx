/**
 * EmptyState — no direct App Home web-component equivalent.
 * Implemented using <s-stack> + <s-button> for a consistent look inside
 * the Shopify Admin embedded UI.
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SStackEl   = (props: any) => React.createElement("s-stack",     { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SButtonEl  = (props: any) => React.createElement("s-button",    { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SBoxEl     = (props: any) => React.createElement("s-box",       { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SHeadingEl = (props: any) => React.createElement("s-heading",   { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SParagraphEl = (props: any) => React.createElement("s-paragraph", { suppressHydrationWarning: true, ...props });

export interface EmptyStateAction {
  content: string;
  onAction?: () => void;
  url?: string;
}

export interface EmptyStateProps {
  heading: string;
  /** Optional image URL. */
  image?: string;
  /** Description paragraphs. */
  children?: React.ReactNode;
  /** Primary CTA. */
  action?: EmptyStateAction;
  /** Secondary CTA. */
  secondaryAction?: EmptyStateAction;
}

export function EmptyState({
  heading,
  image,
  children,
  action,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <SBoxEl padding="large-300">
      <SStackEl direction="block" gap="base" alignItems="center">
        {image && (
          <img
            src={image}
            alt=""
            style={{ maxWidth: 160, height: "auto" }}
          />
        )}

        <SHeadingEl>{heading}</SHeadingEl>

        {children && (
          <SParagraphEl tone="subdued">{children}</SParagraphEl>
        )}

        <SStackEl direction="inline" gap="small">
          {action && (
            <SButtonEl
              variant="primary"
              href={action.url}
              onClick={action.onAction}
            >
              {action.content}
            </SButtonEl>
          )}
          {secondaryAction && (
            <SButtonEl
              variant="secondary"
              href={secondaryAction.url}
              onClick={secondaryAction.onAction}
            >
              {secondaryAction.content}
            </SButtonEl>
          )}
        </SStackEl>
      </SStackEl>
    </SBoxEl>
  );
}
