/**
 * Button — wraps <s-button>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/actions/button
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SButtonEl = (props: any) => React.createElement("s-button", { suppressHydrationWarning: true, ...props });

/** Map Polaris React variant → App Home variant */
const VARIANT_MAP: Record<string, string> = {
  primary:   "primary",
  secondary: "secondary",
  plain:     "tertiary",
  tertiary:  "tertiary",
  monochromePlain: "tertiary",
};

/** Map Polaris React tone → App Home tone */
const TONE_MAP: Record<string, string> = {
  critical: "critical",
  success:  "auto",
};

export interface ButtonProps {
  /** Button label. */
  children?: React.ReactNode;
  /** Visual variant. */
  variant?: "primary" | "secondary" | "plain" | "tertiary" | "monochromePlain";
  /** Tone override. */
  tone?: "critical" | "success";
  /** URL — renders as a link-button. */
  url?: string;
  /** When true, the button acts as a form submit. */
  submit?: boolean;
  /** Show a loading spinner and disable interaction. */
  loading?: boolean;
  /** Disable the button. */
  disabled?: boolean;
  /** Icon rendered inside the button (ignored – use children). */
  icon?: React.ReactNode;
  /** Click handler. */
  onAction?: React.MouseEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Accessible label when no visible text is provided. */
  accessibilityLabel?: string;
  /** Size — no direct App Home equivalent; ignored. */
  size?: "slim" | "micro" | "medium" | "large";
  /** Toggle pressed state (not supported; ignored). */
  pressed?: boolean;
  /** Expand to fill container width. */
  fullWidth?: boolean;
  /** Open URL in a new tab. */
  external?: boolean;
  /** For use with Popover/Modal commandFor patterns. */
  "data-command-for"?: string;
}

export function Button({
  children,
  variant,
  tone,
  url,
  submit,
  loading,
  disabled,
  onAction,
  onClick,
  accessibilityLabel,
  fullWidth,
  external,
  pressed,
  size,
  ...rest
}: ButtonProps) {
  const mappedVariant = variant ? (VARIANT_MAP[variant] ?? variant) : undefined;
  const mappedTone    = tone    ? (TONE_MAP[tone]    ?? tone)    : undefined;
  const type          = submit  ? "submit"                       : "button";
  const handler       = onAction ?? onClick;

  // s-button has no pressed/selected state — render a styled native button
  // so we have full control over the "selected" appearance.
  if (pressed) {
    const isMicro = size === "micro";
    return (
      <button
        type={type}
        disabled={disabled || loading}
        onClick={handler}
        aria-pressed="true"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          border: "1px solid #000",
          borderRadius: "6px",
          padding: isMicro ? "1px 8px" : "6px 12px",
          fontSize: isMicro ? "11px" : "14px",
          fontFamily: "inherit",
          fontWeight: 500,
          lineHeight: isMicro ? "18px" : "20px",
          cursor: disabled ? "default" : "pointer",
          display: "inline-flex",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <SButtonEl
      variant={mappedVariant}
      tone={mappedTone}
      href={url}
      type={type}
      loading={loading || undefined}
      disabled={disabled || undefined}
      accessibilityLabel={accessibilityLabel}
      target={external ? "_blank" : undefined}
      onClick={handler}
      {...rest}
    >
      {children}
    </SButtonEl>
  );
}
