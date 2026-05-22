/**
 * Modal — wraps <s-modal>.
 *
 * Bridge pattern: App Home modals are opened/closed imperatively via
 * `showOverlay()` / `hideOverlay()` on the DOM element. We bridge the Polaris
 * React `open: boolean` prop by calling these methods inside a `useEffect`.
 *
 * The `onClose` callback is wired to the native `hide` event.
 *
 * Reference: https://shopify.dev/docs/api/app-home/web-components/overlays/modal
 */
import React, { useRef, useEffect, useId } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SModalEl = React.forwardRef<HTMLElement, any>((props, ref) =>
  React.createElement("s-modal", { suppressHydrationWarning: true, ref, ...props })
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SButtonEl = (props: any) => React.createElement("s-button", { suppressHydrationWarning: true, ...props });

export interface ModalAction {
  content: string;
  onAction?: () => void;
  loading?: boolean;
  disabled?: boolean;
  destructive?: boolean;
}

export interface ModalProps {
  /** Controls visibility (bridged to showOverlay/hideOverlay). */
  open: boolean;
  /** Called when the modal is dismissed. */
  onClose: () => void;
  /** Modal heading / title. */
  title: string;
  /**
   * Accessible label announced to screen-reader users.
   * Defaults to `title` when omitted. Required by <s-modal> when the body
   * scrolls (the internal scroll-box needs an accessibilityLabel).
   */
  accessibilityLabel?: string;
  /** Primary call-to-action button. */
  primaryAction?: ModalAction;
  /** Secondary action buttons. */
  secondaryActions?: ModalAction[];
  /** Content size. */
  size?: "small" | "small-100" | "medium" | "base" | "large" | "large-100";
  /** Prevent dismissal via backdrop click, Escape, or the built-in close button. */
  disableImplicitClose?: boolean;
  /** Remove inner padding. */
  noScroll?: boolean;
  children?: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  accessibilityLabel,
  primaryAction,
  secondaryActions,
  size,
  disableImplicitClose = false,
  children,
}: ModalProps) {
  const ref = useRef<HTMLElement & { showOverlay?: () => void; hideOverlay?: () => void }>(null);
  const explicitHideRef = useRef(false);
  const closingFromPropRef = useRef(false);
  // Stable unique ID so commandFor on buttons can reference this modal instance.
  const rawId = useId();
  const modalId = `modal-${rawId.replace(/[^a-z0-9]/gi, "")}`;

  // Sync `open` prop → imperative show/hide.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      closingFromPropRef.current = false;
      el.showOverlay?.();
    } else {
      closingFromPropRef.current = true;
      el.hideOverlay?.();
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !disableImplicitClose) return;

    const shadowRoot = el.shadowRoot;
    if (!shadowRoot) return;

    const hideNativeCloseControls = () => {
      const closeElements = shadowRoot.querySelectorAll<HTMLElement>([
        '[aria-label="Close"]',
        '[title="Close"]',
        '[part="close-button"]',
        '[part="close"]',
        '[class*="close" i]',
      ].join(", "));

      closeElements.forEach((closeElement) => {
        closeElement.setAttribute("hidden", "true");
        closeElement.setAttribute("aria-hidden", "true");
        closeElement.style.display = "none";
        closeElement.style.pointerEvents = "none";
      });
    };

    const dialog = shadowRoot.querySelector("dialog");
    const handleCancel = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    hideNativeCloseControls();

    dialog?.addEventListener("cancel", handleCancel);
    dialog?.addEventListener("click", handleBackdropClick, true);
    shadowRoot.addEventListener("keydown", handleEscape as EventListener, true);

    const observer = new MutationObserver(() => {
      hideNativeCloseControls();
    });
    observer.observe(shadowRoot, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      dialog?.removeEventListener("cancel", handleCancel);
      dialog?.removeEventListener("click", handleBackdropClick, true);
      shadowRoot.removeEventListener("keydown", handleEscape as EventListener, true);
    };
  }, [disableImplicitClose, open]);

  // Bridge the native `hide` event → `onClose` so React state stays in sync
  // when the modal is closed via commandFor buttons or the built-in X button.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      if (disableImplicitClose && !explicitHideRef.current && !closingFromPropRef.current) {
        queueMicrotask(() => {
          el.showOverlay?.();
        });
        return;
      }

      explicitHideRef.current = false;
      closingFromPropRef.current = false;
      onClose();
    };
    el.addEventListener("hide", handler);
    return () => el.removeEventListener("hide", handler);
  }, [disableImplicitClose, onClose]);

  const sizeAttr =
    size === "large-100" ? "large-100"
    : size === "large" ? "large"
    : size === "small-100" ? "small-100"
    : size === "small" ? "small"
    : size === "base" ? "base"
    : undefined;

  return (
    <SModalEl
      ref={ref}
      id={modalId}
      heading={title}
      accessibilityLabel={accessibilityLabel || title || "Modal"}
      size={sizeAttr}
    >

      {/* Body content */}
      {children}

      {/* Primary action — does NOT auto-close so the caller can show loading
          state and close only on success. The onAction handler is responsible
          for updating the `open` prop. */}
      {primaryAction && (
        <SButtonEl
          slot="primary-action"
          variant="primary"
          tone={primaryAction.destructive ? "critical" : undefined}
          loading={primaryAction.loading || undefined}
          disabled={primaryAction.disabled || undefined}
          onClick={primaryAction.onAction}
        >
          {primaryAction.content}
        </SButtonEl>
      )}

      {/* Secondary actions.
          When disableImplicitClose is true we use commandFor/command="--hide"
          so the native close mechanism fires (setting explicitHideRef so the
          hide-event guard lets it through).
          For regular modals we simply call onAction — the caller is responsible
          for toggling the `open` prop, which triggers hideOverlay normally. */}
      {secondaryActions?.map((action) => (
        <SButtonEl
          key={action.content}
          slot="secondary-actions"
          variant="secondary"
          loading={action.loading || undefined}
          disabled={action.disabled || undefined}
          {...(disableImplicitClose
            ? { commandFor: modalId, command: "--hide" }
            : {})}
          onClick={() => {
            if (disableImplicitClose) {
              explicitHideRef.current = true;
            }
            action.onAction?.();
          }}
        >
          {action.content}
        </SButtonEl>
      ))}

      
    </SModalEl>
  );
}

// ---------------------------------------------------------------------------
// Modal.Section — padded block within a modal body.
// ---------------------------------------------------------------------------
Modal.Section = function ModalSection({
  children,
  flush,
  padding,
}: {
  children?: React.ReactNode;
  /** Remove inner padding. */
  flush?: boolean;
  /** Padding override. */
  padding?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SBoxEl = "s-box" as any;
  const pad = flush ? "none" : (padding ?? "base");
  return <SBoxEl padding={pad}>{children}</SBoxEl>;
};
