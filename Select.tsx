/**
 * Select — wraps <s-select> with <s-option> children.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/forms/select
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SSelectEl = (props: any) => React.createElement("s-select", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SOptionEl = (props: any) => React.createElement("s-option", { suppressHydrationWarning: true, ...props });

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  title: string;
  options: SelectOption[];
}

export interface SelectProps {
  label: string;
  options: (SelectOption | SelectOptionGroup)[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string | boolean;
  helpText?: React.ReactNode;
  name?: string;
  disabled?: boolean;
  labelHidden?: boolean;
  placeholder?: string;
}

function isGroup(o: SelectOption | SelectOptionGroup): o is SelectOptionGroup {
  return "title" in o && "options" in o;
}

function extractValue(e: unknown): string {
  if (typeof e === "string") return e;
  if (e && typeof e === "object") {
    const ev = e as { target?: { value?: string }; detail?: { value?: string } | string };
    if (typeof ev.detail === "string") return ev.detail;
    if (ev.detail && typeof ev.detail === "object") return ev.detail.value ?? "";
    return (ev.target as HTMLSelectElement)?.value ?? "";
  }
  return String(e ?? "");
}

export function Select({
  label,
  options,
  value,
  onChange,
  error,
  name,
  disabled,
  labelHidden,
  helpText,
  placeholder,
}: SelectProps) {
  const handleChange = onChange
    ? (e: unknown) => onChange(extractValue(e))
    : undefined;

  const errorMsg = error && typeof error === "string" ? error : undefined;
  const labelVisibility = labelHidden ? "exclusive" : undefined;
  const details = helpText
    ? typeof helpText === "string"
      ? helpText
      : undefined
    : undefined;

  const renderOptions = (opts: SelectOption[]) =>
    opts.map((o) => (
      <SOptionEl
        key={o.value}
        value={o.value}
        disabled={o.disabled || undefined}
      >
        {o.label}
      </SOptionEl>
    ));

  return (
    <SSelectEl
      label={label}
      value={value}
      onChange={handleChange}
      error={errorMsg}
      name={name}
      disabled={disabled || undefined}
      labelAccessibilityVisibility={labelVisibility}
      placeholder={placeholder}
      details={details}
    >
      {options.map((o) => {
        if (isGroup(o)) {
          return (
            <optgroup key={o.title} label={o.title}>
              {renderOptions(o.options)}
            </optgroup>
          );
        }
        return (
          <SOptionEl key={o.value} value={o.value} disabled={o.disabled || undefined}>
            {o.label}
          </SOptionEl>
        );
      })}
    </SSelectEl>
  );
}
