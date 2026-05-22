/**
 * Banner — wraps <s-banner>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/feedback-and-status-indicators/banner
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SBannerEl = (props: any) => React.createElement("s-banner", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SBtnEl = (props: any) => React.createElement("s-button", { suppressHydrationWarning: true, ...props });

export interface BannerAction {
  content: string;
  onAction?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface BannerProps {
  title?: string;
  tone?: "success" | "warning" | "critical" | "info";
  action?: BannerAction;
  secondaryAction?: BannerAction;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

export function Banner({ title, tone, action, secondaryAction, children }: BannerProps) {

  return (
    <SBannerEl heading={title} tone={tone}>
      {children}

      {action && (
        <SBtnEl
          slot="primary-action"
          variant="primary"
          onClick={action.onAction}
          loading={action.loading || undefined}
          disabled={action.disabled || undefined}
        >
          {action.content}
        </SBtnEl>
      )}

      {secondaryAction && (
        <SBtnEl
          slot="secondary-action"
          onClick={secondaryAction.onAction}
          loading={secondaryAction.loading || undefined}
          disabled={secondaryAction.disabled || undefined}
        >
          {secondaryAction.content}
        </SBtnEl>
      )}
    </SBannerEl>
  );
}
