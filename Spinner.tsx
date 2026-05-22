/**
 * Spinner — wraps <s-spinner>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/feedback-and-status-indicators/spinner
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SSpinnerEl = (props: any) => React.createElement("s-spinner", { suppressHydrationWarning: true, ...props });

export interface SpinnerProps {
  size?: "small" | "large";
  accessibilityLabel?: string;
}

export function Spinner({ size, accessibilityLabel }: SpinnerProps) {
  return (
    <SSpinnerEl
      size={size}
      accessibilityLabel={accessibilityLabel}
    />
  );
}
