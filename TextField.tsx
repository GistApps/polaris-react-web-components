/**
 * TextField — wraps <s-text-field> (single-line) or <s-text-area> (multiline).
 *
 * Event bridging:
 *   App Home fires a native `change` CustomEvent. Inside Shopify's AppProvider
 *   the `onChange` prop receives the new string value directly. Our wrapper
 *   also handles the raw Event fallback via `e.target.value`.
 *
 * References:
 *   https://shopify.dev/docs/api/app-home/web-components/forms/text-field
 *   https://shopify.dev/docs/api/app-home/web-components/forms/text-area
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const STextFieldEl = (props: any) => React.createElement("s-text-field", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const STextAreaEl  = (props: any) => React.createElement("s-text-area",  { suppressHydrationWarning: true, ...props });

export interface TextFieldProps {
  /** Visible label. */
  label: string;
  /** Controlled value. */
  value?: string;
  /** Change handler — receives the new string value. */
  onChange?: (value: string) => void;
  /** Blur handler — receives the current string value. */
  onBlur?: (value: string) => void;
  /** KeyUp handler — receives the current string value. */
  onKeyUp?: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Error message shown below the field. */
  error?: string | boolean;
  /** Helper text shown below the field (maps to `details`). */
  helpText?: React.ReactNode;
  /** Field `name` attribute. */
  name?: string;
  /** `autocomplete` attribute value. */
  autoComplete?: string;
  /** Visually hide the label (still readable by screen readers). */
  labelHidden?: boolean;
  /** Whether the field is read-only. */
  readOnly?: boolean;
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Whether the field is required. */
  requiredIndicator?: boolean;
  /** Use a multi-line textarea. */
  multiline?: boolean | number;
  /** Input `type` (text, email, number, tel, url, …). */
  type?: string;
  /** Prefix text/icon shown before the input (not supported; ignored). */
  prefix?: React.ReactNode;
  /** Suffix text/icon shown after the input (not supported; ignored). */
  suffix?: React.ReactNode;
  /** Connected right slot (not supported; ignored). */
  connectedRight?: React.ReactNode;
  /** Connected left slot (not supported; ignored). */
  connectedLeft?: React.ReactNode;
}

function extractValue(e: unknown): string {
  if (typeof e === "string") return e;
  if (e && typeof e === "object") {
    const ev = e as { target?: { value?: string }; detail?: { value?: string } | string };
    if (typeof ev.detail === "string") return ev.detail;
    if (ev.detail && typeof ev.detail === "object") return ev.detail.value ?? "";
    return (ev.target as HTMLInputElement)?.value ?? "";
  }
  return String(e ?? "");
}

export function TextField({
  label,
  value,
  onChange,
  onBlur,
  onKeyUp,
  placeholder,
  error,
  helpText,
  name,
  autoComplete,
  labelHidden,
  readOnly,
  disabled,
  requiredIndicator,
  multiline,
  type,
  prefix,
  suffix,
}: TextFieldProps) {
  const handleChange = onChange
    ? (e: unknown) => onChange(extractValue(e))
    : undefined;
  const handleBlur = onBlur
    ? (e: unknown) => onBlur(extractValue(e))
    : undefined;
  const handleKeyUp = onKeyUp
    ? (e: unknown) => onKeyUp(extractValue(e))
    : undefined;

  const labelVisibility = labelHidden ? "exclusive" : undefined;
  const details = helpText
    ? typeof helpText === "string"
      ? helpText
      : undefined       // non-string helpText not supported
    : undefined;
  const errorMsg = error && typeof error === "string" ? error : undefined;
  const prefixText = typeof prefix === "string" || typeof prefix === "number" ? String(prefix) : undefined;
  const suffixText = typeof suffix === "string" || typeof suffix === "number" ? String(suffix) : undefined;

  if (multiline) {
    return (
      <STextAreaEl
        label={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        error={errorMsg}
        details={details}
        name={name}
        autocomplete={autoComplete}
        labelAccessibilityVisibility={labelVisibility}
        readOnly={readOnly || undefined}
        disabled={disabled || undefined}
        required={requiredIndicator || undefined}
      />
    );
  }

  return (
    <STextFieldEl
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      placeholder={placeholder}
      error={errorMsg}
      details={details}
      name={name}
      type={type}
      prefix={prefixText}
      suffix={suffixText}
      autocomplete={autoComplete}
      labelAccessibilityVisibility={labelVisibility}
      readOnly={readOnly || undefined}
      disabled={disabled || undefined}
      required={requiredIndicator || undefined}
    />
  );
}
