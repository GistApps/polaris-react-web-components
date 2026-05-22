/**
 * Checkbox — wraps <s-checkbox>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/forms/checkbox
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SCheckboxEl = (props: any) => React.createElement("s-checkbox", { suppressHydrationWarning: true, ...props });

export interface CheckboxProps {
  label: string;
  checked?: boolean | "indeterminate";
  onChange?: (newChecked: boolean, id: string) => void;
  error?: string | boolean;
  helpText?: React.ReactNode;
  name?: string;
  id?: string;
  disabled?: boolean;
}

function extractChecked(e: unknown): boolean {
  if (typeof e === "boolean") return e;
  if (e && typeof e === "object") {
    const ev = e as { target?: { checked?: boolean }; detail?: { checked?: boolean } | boolean };
    if (typeof ev.detail === "boolean") return ev.detail;
    if (ev.detail && typeof ev.detail === "object") return ev.detail.checked ?? false;
    return (ev.target as HTMLInputElement)?.checked ?? false;
  }
  return false;
}

export function Checkbox({
  label,
  checked,
  onChange,
  error,
  name,
  id,
  helpText,
  disabled,
}: CheckboxProps) {
  const handleChange = onChange
    ? (e: unknown) => onChange(extractChecked(e), id ?? "")
    : undefined;

  const details = helpText && typeof helpText === "string" ? helpText : undefined;
  const errorMsg = error && typeof error === "string" ? error : undefined;
  const isChecked =
    checked === true
      ? true
      : checked === "indeterminate"
        ? undefined   // web component handles indeterminate via attribute
        : undefined;

  return (
    <SCheckboxEl
      label={label}
      checked={isChecked}
      indeterminate={checked === "indeterminate" || undefined}
      onChange={handleChange}
      error={errorMsg}
      details={details}
      name={name}
      id={id}
      disabled={disabled || undefined}
    />
  );
}
