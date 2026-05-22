/**
 * List + List.Item — wraps <s-unordered-list> / <s-ordered-list> with
 * <s-list-item> children.
 *
 * References:
 *   https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/unordered-list
 *   https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/ordered-list
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SUnorderedListEl = (props: any) => React.createElement("s-unordered-list", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SOrderedListEl   = (props: any) => React.createElement("s-ordered-list",   { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SListItemEl      = (props: any) => React.createElement("s-list-item",      { suppressHydrationWarning: true, ...props });

export interface ListProps {
  type?: "bullet" | "number";
  children?: React.ReactNode;
}

export function List({ type = "bullet", children }: ListProps) {
  if (type === "number") {
    return <SOrderedListEl>{children}</SOrderedListEl>;
  }
  return <SUnorderedListEl>{children}</SUnorderedListEl>;
}

List.Item = function ListItem({ children }: { children?: React.ReactNode }) {
  return <SListItemEl>{children}</SListItemEl>;
};
