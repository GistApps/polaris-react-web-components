/**
 * ContextualSaveBar
 *
 * No direct App Home web-component equivalent. Implemented as a fixed top bar
 * using native HTML — this is acceptable inside the Shopify Admin iframe where
 * `position: fixed` resolves to the iframe viewport.
 */
import React from "react";

export interface ContextualSaveBarAction {
  content?: string;
  onAction?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface ContextualSaveBarProps {
  message?: string;
  saveAction?: ContextualSaveBarAction;
  discardAction?: ContextualSaveBarAction & { discardConfirmationModal?: boolean };
  /** Prevent the bar from being rendered by AppBridge (internal only). */
  contextControl?: React.ReactNode;
}

export function ContextualSaveBar({
  message,
  saveAction,
  discardAction,
}: ContextualSaveBarProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SStackEl  = "s-stack"  as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SButtonEl = "s-button" as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const STextEl   = "s-text"   as any;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: "var(--p-color-bg-inverse, #1a1a1a)",
        color: "var(--p-color-text-inverse, #fff)",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <STextEl type="strong">{message ?? "Unsaved changes"}</STextEl>

      <SStackEl direction="inline" gap="small">
        {discardAction && (
          <SButtonEl
            variant="secondary"
            loading={discardAction.loading || undefined}
            disabled={discardAction.disabled || undefined}
            onClick={discardAction.onAction}
          >
            {discardAction.content ?? "Discard"}
          </SButtonEl>
        )}
        {saveAction && (
          <SButtonEl
            variant="primary"
            loading={saveAction.loading || undefined}
            disabled={saveAction.disabled || undefined}
            onClick={saveAction.onAction}
          >
            {saveAction.content ?? "Save"}
          </SButtonEl>
        )}
      </SStackEl>
    </div>
  );
}
