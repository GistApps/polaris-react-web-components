/**
 * ResourceList + ResourceItem — fully featured composition.
 *
 * Follows the App Home resource list pattern:
 *   https://shopify.dev/docs/api/app-home/patterns/compositions/resource-list
 *
 * Features:
 *   - <s-section> outer wrapper
 *   - Header grid: search field + optional primary action button
 *   - Count / sort row: item count label + <s-select> sort picker
 *   - Item list using <s-clickable> (border-top separator between items)
 *   - Pagination controls
 */
import React from "react";
import type { SortOption } from "./IndexTable";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SSectionEl    = (props: any) => React.createElement("s-section",    { suppressHydrationWarning: true, ...props });
const SStackEl      = (props: any) => React.createElement("s-stack",      { suppressHydrationWarning: true, ...props });
const SGridEl       = (props: any) => React.createElement("s-grid",       { suppressHydrationWarning: true, ...props });
const STextFieldEl  = (props: any) => React.createElement("s-text-field", { suppressHydrationWarning: true, ...props });
const SButtonEl     = (props: any) => React.createElement("s-button",     { suppressHydrationWarning: true, ...props });
const STextEl       = (props: any) => React.createElement("s-text",       { suppressHydrationWarning: true, ...props });
const SSelectEl     = (props: any) => React.createElement("s-select",     { suppressHydrationWarning: true, ...props });
const SOptionEl     = (props: any) => React.createElement("s-option",     { suppressHydrationWarning: true, ...props });
const SClickableEl  = (props: any) => React.createElement("s-clickable",  { suppressHydrationWarning: true, ...props });
const SSpinnerEl    = (props: any) => React.createElement("s-spinner",    { suppressHydrationWarning: true, ...props });
const SBoxEl        = (props: any) => React.createElement("s-box",        { suppressHydrationWarning: true, ...props });
/* eslint-enable @typescript-eslint/no-explicit-any */

// ── Types ──────────────────────────────────────────────────────────────────

export interface ResourceListPrimaryAction {
  content: string;
  onAction?: () => void;
  url?: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface ResourceListPagination {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  label?: string;
}

export interface ResourceListProps<T> {
  items: T[];
  renderItem: (item: T, id: string, index: number) => React.ReactNode;
  /** Accessible resource names shown in the count label. */
  resourceName?: { singular: string; plural: string };
  /** Show loading spinner. */
  loading?: boolean;
  /** Shown when items is empty and not loading. */
  emptyState?: React.ReactNode;
  // Search
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
  searchPlaceholder?: string;
  // Sort
  sortOptions?: SortOption[];
  sortSelected?: string;
  onSortChange?: (value: string) => void;
  // Primary action (e.g. "Add Product" button)
  primaryAction?: ResourceListPrimaryAction;
  // Pagination
  pagination?: ResourceListPagination;
  /** Not used (accepted for Polaris-React API compatibility). */
  filterControl?: React.ReactNode;
}

function extractSelectValue(e: unknown): string {
  if (!e || typeof e !== "object") return "";
  const ev = e as { detail?: string | { value?: string }; target?: { value?: string } };
  if (typeof ev.detail === "string") return ev.detail;
  if (ev.detail && typeof ev.detail === "object") return ev.detail.value ?? "";
  return (ev.target as HTMLSelectElement)?.value ?? "";
}

export function ResourceList<T>({
  items,
  renderItem,
  resourceName,
  loading,
  emptyState,
  searchQuery,
  onSearchQueryChange,
  searchPlaceholder,
  sortOptions,
  sortSelected,
  onSortChange,
  primaryAction,
  pagination,
}: ResourceListProps<T>) {
  const hasHeader   = onSearchQueryChange !== undefined || primaryAction != null;
  const hasSort     = sortOptions != null && sortOptions.length > 0;
  const showMeta    = items.length > 0 || hasSort;

  const countLabel = resourceName
    ? `Showing ${items.length} ${
        items.length === 1 ? resourceName.singular : resourceName.plural
      }`
    : `Showing ${items.length} item${items.length === 1 ? "" : "s"}`;

  return (
    <SSectionEl padding="none">
      <SStackEl gap="small-200">

        {/* ── Header: search + primary action ── */}
        {hasHeader && (
          <SGridEl
            gridTemplateColumns={primaryAction != null ? "1fr auto" : "1fr"}
            gap="base"
            alignItems="center"
            paddingInline="base"
            paddingBlockStart="base"
          >
            {onSearchQueryChange !== undefined && (
              <STextFieldEl
                label={
                  searchPlaceholder ??
                  `Search ${resourceName?.plural ?? "items"}`
                }
                labelAccessibilityVisibility="exclusive"
                icon="search"
                placeholder={
                  searchPlaceholder ??
                  `Search ${resourceName?.plural ?? "items"}`
                }
                value={searchQuery ?? ""}
                onInput={(e: React.FormEvent<HTMLElement>) =>
                  onSearchQueryChange(
                    (e.target as HTMLInputElement).value,
                  )
                }
              />
            )}
            {primaryAction != null && (
              <SButtonEl
                href={primaryAction.url}
                loading={primaryAction.loading || undefined}
                disabled={primaryAction.disabled || undefined}
                onClick={primaryAction.url ? undefined : primaryAction.onAction}
              >
                {primaryAction.content}
              </SButtonEl>
            )}
          </SGridEl>
        )}

        {/* ── Count + sort row ── */}
        {showMeta && (
          <SGridEl
            gridTemplateColumns={hasSort ? "1fr auto" : "1fr"}
            gap="base"
            alignItems="center"
            paddingInline="base"
          >
            <STextEl tone="subdued" variant="bodySm">
              {countLabel}
            </STextEl>
            {hasSort && (
              <SSelectEl
                label="Sort"
                labelAccessibilityVisibility="exclusive"
                value={sortSelected}
                onChange={(e: unknown) => onSortChange?.(extractSelectValue(e))}
              >
                {sortOptions!.map((opt) => (
                  <SOptionEl key={opt.value} value={opt.value}>
                    {opt.label}
                  </SOptionEl>
                ))}
              </SSelectEl>
            )}
          </SGridEl>
        )}

        {/* ── Items ── */}
        {loading ? (
          <SBoxEl padding="large-300" style={{ display: "flex", justifyContent: "center" }}>
            <SSpinnerEl accessibilityLabel="Loading" />
          </SBoxEl>
        ) : items.length === 0 && emptyState != null ? (
          emptyState
        ) : (
          <SStackEl gap="none">
            {items.map((item, index) => {
              const id = String((item as { id?: unknown })?.id ?? index);
              return (
                <React.Fragment key={id}>
                  {renderItem(item, id, index)}
                </React.Fragment>
              );
            })}
          </SStackEl>
        )}

        {/* ── Pagination ── */}
        {pagination != null &&
          (pagination.hasPrevious || pagination.hasNext) && (
            <SGridEl
              gridTemplateColumns="1fr auto 1fr"
              alignItems="center"
              paddingInline="base"
              paddingBlock="small"
            >
              <div />
              <SStackEl direction="inline" gap="small-200" alignItems="center">
                <SButtonEl
                  variant="secondary"
                  disabled={!pagination.hasPrevious || undefined}
                  onClick={pagination.onPrevious}
                >
                  Previous
                </SButtonEl>
                {pagination.label && (
                  <STextEl tone="subdued">{pagination.label}</STextEl>
                )}
                <SButtonEl
                  variant="secondary"
                  disabled={!pagination.hasNext || undefined}
                  onClick={pagination.onNext}
                >
                  Next
                </SButtonEl>
              </SStackEl>
              <div />
            </SGridEl>
          )}

      </SStackEl>
    </SSectionEl>
  );
}

// ── ResourceItem ───────────────────────────────────────────────────────────

export interface ResourceItemProps {
  id: string;
  /** Navigate to this URL when clicked. */
  url?: string;
  /** JS click handler (used when url is absent). */
  onClick?: (id: string) => void;
  children?: React.ReactNode;
  /** Leading media (thumbnail, avatar, etc.). */
  media?: React.ReactNode;
  shortcutActions?: Array<{ content: string; url?: string; onAction?: () => void }>;
  accessibilityLabel?: string;
  selected?: boolean;
  /** Display name (informational; rendered via children). */
  name?: string;
}

export function ResourceItem({
  id,
  url,
  onClick,
  children,
  media,
  accessibilityLabel,
}: ResourceItemProps) {
  const handleClick = !url && onClick ? () => onClick(id) : undefined;

  const inner = media ? (
    <SGridEl
      gridTemplateColumns="auto 1fr"
      gap="base"
      alignItems="center"
    >
      {media}
      <div style={{ minWidth: 0 }}>{children}</div>
    </SGridEl>
  ) : (
    children
  );

  if (url) {
    // Navigation item — s-clickable with href
    return (
      <SClickableEl
        href={url}
        accessibilityLabel={accessibilityLabel}
        borderStyle="solid none none none"
        border="base"
        paddingInline="base"
        paddingBlock="small"
      >
        {inner}
      </SClickableEl>
    );
  }

  // JS-action item — native button/div for maximum event reliability
  return (
    <div
      role={handleClick ? "button" : "listitem"}
      tabIndex={handleClick ? 0 : undefined}
      aria-label={accessibilityLabel}
      onClick={handleClick}
      onKeyDown={
        handleClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      style={{
        padding: "12px 16px",
        cursor: handleClick ? "pointer" : undefined,
        borderTop: "1px solid var(--p-color-border, #e1e3e5)",
      }}
    >
      {media ? (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flexShrink: 0 }}>{media}</div>
          <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}


