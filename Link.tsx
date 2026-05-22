/**
 * Link — wraps <s-link>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/actions/link
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SLinkEl = (props: any) => React.createElement("s-link", { suppressHydrationWarning: true, ...props });

export interface LinkProps {
  children?: React.ReactNode;
  /** Destination URL (preferred prop). */
  url?: string;
  /** Alias for compatibility with react-router Link usage. */
  to?: string;
  /** Open URL in a new tab. */
  external?: boolean;
  target?: "_self" | "_blank" | "_parent" | "_top";
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function Link({ children, url, to, external, target, rel, onClick }: LinkProps) {
  const href = url ?? to;

  return (
    <SLinkEl
      href={href}
      target={external ? "_blank" : target}
      rel={external ? (rel ?? "noopener noreferrer") : rel}
      onClick={onClick}
    >
      {children}
    </SLinkEl>
  );
}
