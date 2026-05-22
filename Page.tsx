/**
 * Page — React wrapper for the <s-page> Polaris App Home web component.
 *
 * Maps familiar Polaris-React–style props (heading/title, backAction,
 * primaryAction, secondaryActions, aside) onto the correct <s-page> slots
 * so every app page uses the platform-native layout automatically.
 *
 * Reference: https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/page
 *
 * Slot overview:
 *   slot="breadcrumb-actions"  → <s-link>   back / breadcrumb link
 *   slot="primary-action"      → <s-button variant="primary">  (max 1)
 *   slot="secondary-actions"   → <s-button>                    (max 3)
 *   slot="aside"               → any content for the right-hand panel
 *   (default slot)             → main page content
 */
import React from "react";

// ── Web-component element aliases ─────────────────────────────────────────────
// Casting to `any` avoids JSX IntrinsicElement conflicts with
// @shopify/app-bridge-ui-types while keeping all parent props fully typed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SPgEl    = (props: any) => React.createElement("s-page",   { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SBtnEl   = (props: any) => React.createElement("s-button", { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SMenuEl  = (props: any) => React.createElement("s-menu",   { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SLnkEl   = (props: any) => React.createElement("s-link",   { suppressHydrationWarning: true, ...props });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SBadgeEl = (props: any) => React.createElement("s-badge",  { suppressHydrationWarning: true, ...props });

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PageAction {
  /** Button label */
  content: string;
  /** Called when the button is activated */
  onAction?: () => void;
  /** Navigate to this URL instead of (or in addition to) onAction */
  url?: string;
  disabled?: boolean;
  loading?: boolean;
  /** "critical" renders the button in a destructive red tone */
  tone?: "critical" | "auto" | "neutral";
}

export interface PageProps {
  /**
   * The page heading rendered in the header.
   * Alias `title` is accepted for Polaris-React compatibility.
   */
  heading?: string;
  /** Alias for heading */
  title?: string;

  /**
   * Optional subtitle / description rendered as the first item in the
   * default content slot (below the heading, above children).
   */
  subtitle?: string;

  badge?: { content: string; tone?: "info" | "success" | "warning" | "critical" };
  /** Multiple status/accessory badges rendered inline in the page header. */
  badges?: Array<{ content: string; tone?: string }>;

  /**
   * Controls the maximum inline width of the page content column.
   * - "base"   — constrained width (~1000 px), best for most pages (default)
   * - "small" — narrower column, good for focused forms
   * - "large"   — edge-to-edge
   */
  inlineSize?: "base" | "small" | "large";

  /**
   * When true, equivalent to inlineSize="large".
   * Accepted for backwards-compat with the old polaris-web <Page>.
   */
  fullWidth?: boolean;

  /** Renders a breadcrumb link above the heading via slot="breadcrumb-actions" */
  backAction?: { content: string; url: string };

  /**
   * At most ONE primary action.
   * Rendered as <s-button variant="primary" slot="primary-action">.
   */
  primaryAction?: PageAction;

  /**
   * Up to THREE secondary actions.
   * Each rendered as <s-button slot="secondary-actions">.
   */
  secondaryActions?: PageAction[];

  /**
   * Arbitrary React content rendered in the aside (right-hand panel) slot.
   * Wrap in <s-box> or <s-section> for proper padding.
   */
  aside?: React.ReactNode;

  children?: React.ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Page({
  heading,
  title,
  subtitle,
  badge,
  badges,
  inlineSize,
  fullWidth,
  backAction,
  primaryAction,
  secondaryActions,
  aside,
  children,
}: PageProps) {
  const pageHeading    = heading ?? title ?? "";
  const effectiveSize  = fullWidth ? "large" : (inlineSize ?? "base");


  return (
    <SPgEl heading={pageHeading} inlineSize={effectiveSize} suppressHydrationWarning>


      {/* ── Breadcrumb / back link ── */}
      {backAction && (
        <SLnkEl slot="breadcrumb-actions" href={backAction.url} suppressHydrationWarning={true}>
          {backAction.content}
        </SLnkEl>
      )}

      {badge && (
        <SBadgeEl slot="accessory" tone={badge?.tone ?? "neutral"} suppressHydrationWarning>{badge?.content ?? "Draft"}</SBadgeEl>
      )}
      {badges?.map((b, i) => (
        <SBadgeEl key={i} slot="accessory" tone={b.tone ?? "neutral"} suppressHydrationWarning>{b.content}</SBadgeEl>
      ))}

      {/* ── Primary action (max 1) ── */}
      {primaryAction && (
        <SBtnEl
          slot="primary-action"
          variant="primary"
          onClick={primaryAction.onAction}
          {...((primaryAction.disabled || primaryAction.loading) ? { disabled: true } : {})}
          suppressHydrationWarning
        >
          {primaryAction.content}
        </SBtnEl>
      )}

      {/* ── Secondary actions (max 3) ── */}
      {secondaryActions && secondaryActions.length === 1 && (
        <SBtnEl
          slot="secondary-actions"
          onClick={secondaryActions[0].onAction}
          {...(secondaryActions[0].tone === "critical" ? { tone: "critical" } : {})}
          {...(secondaryActions[0].disabled ? { disabled: true } : {})}
          suppressHydrationWarning
        >
          {secondaryActions[0].content}
        </SBtnEl>
      )}

      {secondaryActions && secondaryActions.length > 1 && (
        <>
          <SBtnEl slot="secondary-actions" commandFor="more-actions-id" suppressHydrationWarning>More actions</SBtnEl>
          <SMenuEl id="more-actions-id" suppressHydrationWarning>
            {secondaryActions.map((action, index) => (
              <SBtnEl
                key={`pageActionSecondary-${index}`}
                slot="secondary-actions"
                onClick={action.onAction}
                {...(action.tone === "critical" ? { tone: "critical" } : {})}
                {...(action.disabled ? { disabled: true } : {})}
                suppressHydrationWarning
              >
                {action.content}
              </SBtnEl>
            ))}
          </SMenuEl>
        </>
      )}
      


      {/* ── Subtitle (default slot, appears below heading) ── */}
      {subtitle && (
        <p style={{ margin: "0 0 20px", color: "#6d7175", fontSize: 14, lineHeight: "20px" }}>
          {subtitle}
        </p>
      )}

      {/* ── Main content (default slot) ── */}
      {children}

      {/* ── Aside slot ── */}
      {aside && <div slot="aside">{aside}</div>}

    </SPgEl>
  );
}
