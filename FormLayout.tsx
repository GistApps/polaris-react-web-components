/**
 * FormLayout + FormLayout.Group
 *
 * App Home doesn't have a dedicated form-layout web component. We use
 * <s-stack direction="block"> to stack fields vertically, which matches the
 * primary use case. FormLayout.Group uses an inline stack for side-by-side
 * fields.
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SStackEl = (props: any) => React.createElement("s-stack", { suppressHydrationWarning: true, ...props });

export interface FormLayoutProps {
  children?: React.ReactNode;
}

export interface FormLayoutGroupProps {
  children?: React.ReactNode;
  /** Number of columns in this group row. */
  condensed?: boolean;
}

function FormLayoutGroup({ children }: FormLayoutGroupProps) {
  return (
    <SStackEl direction="inline" gap="base" alignItems="start">
      {children}
    </SStackEl>
  );
}

export function FormLayout({ children }: FormLayoutProps) {
  return (
    <SStackEl direction="block" gap="base">
      {children}
    </SStackEl>
  );
}

FormLayout.Group = FormLayoutGroup;
