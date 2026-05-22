/**
 * ChoiceList — wraps <s-choice-list>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/forms/choice-list
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SChoiceListEl = (props: any) => React.createElement("s-choice-list", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SChoiceEl     = (props: any) => React.createElement("s-choice",      { suppressHydrationWarning: true, ...props });

export interface ChoiceDescriptor {
  value: string;
  label: string;
  helpText?: string;
  disabled?: boolean;
}

export interface ChoiceListProps {
  title?: string;
  choices: ChoiceDescriptor[];
  selected: string[];
  onChange: (selected: string[], name: string) => void;
  allowMultiple?: boolean;
  name?: string;
  error?: string | boolean;
  titleHidden?: boolean;
}

function extractSelected(e: unknown): string[] {
  if (Array.isArray(e)) return e as string[];
  if (e && typeof e === "object") {
    const ev = e as { detail?: string[] | string; target?: { value?: string } };
    if (Array.isArray(ev.detail)) return ev.detail;
    if (typeof ev.detail === "string") return [ev.detail];
    const val = (ev.target as HTMLInputElement)?.value;
    return val ? [val] : [];
  }
  return [];
}

export function ChoiceList({
  title,
  choices,
  selected,
  onChange,
  allowMultiple,
  name = "",
  error,
}: ChoiceListProps) {
  const handleChange = (e: unknown) => onChange(extractSelected(e), name);
  const errorMsg = error && typeof error === "string" ? error : undefined;

  return (
    <SChoiceListEl
      name={title}
      label={title}
      allowMultiple={allowMultiple || undefined}
      error={errorMsg}
      onChange={handleChange}
    >
      {choices.map((c) => (
        <SChoiceEl
          key={c.value}
          value={c.value}
          details={c.helpText}
          disabled={c.disabled || undefined}
          selected={selected.includes(c.value) || undefined}
        >
          {c.label}
        </SChoiceEl>
      ))}
    </SChoiceListEl>
  );
}
