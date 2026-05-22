/**
 * IndexTable — fully featured <s-table> wrapper.
 *
 * Follows the App Home index table composition pattern:
 *   https://shopify.dev/docs/api/app-home/patterns/compositions/index-table
 *
 * Features:
 *   - Search field + sort popover in the slot="filters" area
 *   - Row selection via React context + s-checkbox + clickDelegate
 *   - Select-all checkbox in the header
 *   - Bulk actions bar (replaces search/sort when rows are selected)
 *   - Pagination controls below the table
 *   - listSlot on column headers for responsive stacking
 */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
} from "react";

// ── Web-component element shims ────────────────────────────────────────────
/* eslint-disable @typescript-eslint/no-explicit-any */
const STableEl          = (props: any) => React.createElement("s-table",            { suppressHydrationWarning: true, ...props });
const STableHeaderRowEl = (props: any) => React.createElement("s-table-header-row", { suppressHydrationWarning: true, ...props });
const STableHeaderEl    = (props: any) => React.createElement("s-table-header",     { suppressHydrationWarning: true, ...props });
const STableBodyEl      = (props: any) => React.createElement("s-table-body",       { suppressHydrationWarning: true, ...props });
const STableRowEl       = (props: any) => React.createElement("s-table-row",        { suppressHydrationWarning: true, ...props });
const STableCellEl      = (props: any) => React.createElement("s-table-cell",       { suppressHydrationWarning: true, ...props });
const SSectionEl        = (props: any) => React.createElement("s-section",          { suppressHydrationWarning: true, ...props });
const SGridEl           = (props: any) => React.createElement("s-grid",             { suppressHydrationWarning: true, ...props });
const STextFieldEl      = (props: any) => React.createElement("s-text-field",       { suppressHydrationWarning: true, ...props });
const SButtonEl         = (props: any) => React.createElement("s-button",           { suppressHydrationWarning: true, ...props });
const SPopoverEl        = (props: any) => React.createElement("s-popover",          { suppressHydrationWarning: true, ...props });
const SStackEl          = (props: any) => React.createElement("s-stack",            { suppressHydrationWarning: true, ...props });
const SBoxEl            = (props: any) => React.createElement("s-box",              { suppressHydrationWarning: true, ...props });
const SChoiceListEl     = (props: any) => React.createElement("s-choice-list",      { suppressHydrationWarning: true, ...props });
const SChoiceEl         = (props: any) => React.createElement("s-choice",           { suppressHydrationWarning: true, ...props });
const STextEl           = (props: any) => React.createElement("s-text",             { suppressHydrationWarning: true, ...props });
const SCheckboxEl       = (props: any) => React.createElement("s-checkbox",         { suppressHydrationWarning: true, ...props });
/* eslint-enable @typescript-eslint/no-explicit-any */

// ── Selection context ──────────────────────────────────────────────────────
interface SelectionContextValue {
  selectable: boolean;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

const SelectionContext = createContext<SelectionContextValue>({
  selectable: false,
  selectedIds: new Set(),
  onToggle: () => {},
});

// ── Public types ───────────────────────────────────────────────────────────

export interface IndexTableHeading {
  title: string;
  /** Hide visible text but keep it for screen readers. */
  hidden?: boolean;
  /** Controls responsive stacking order: "primary" | "secondary". */
  listSlot?: "primary" | "secondary";
}

export interface SortOption {
  label: string;
  value: string;
}

export interface IndexTableBulkAction {
  content: string;
  onAction: () => void;
  destructive?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export interface IndexTablePagination {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  /** Optional label rendered between the Previous / Next buttons. */
  label?: string;
}

export interface IndexTableProps {
  headings: readonly IndexTableHeading[];
  children?: React.ReactNode;
  /** Total number of items (used in resource-count label). */
  itemCount?: number;
  /** Accessible resource names shown in selection / count labels. */
  resourceName?: { singular: string; plural: string };

  // ── Selection ──────────────────────────────────────────────────────────
  /** Enable checkbox column and row selection. */
  selectable?: boolean;
  /** All available IDs — enables the select-all header checkbox. */
  allItemIds?: string[];
  /** Controlled list of selected IDs. */
  selectedItemIds?: string[];
  /** Called with the new selection array when the selection changes. */
  onSelectionChange?: (ids: string[]) => void;

  // ── State ──────────────────────────────────────────────────────────────
  loading?: boolean;
  emptyState?: React.ReactNode;

  // ── Accessibility ──────────────────────────────────────────────────────
  /** Accessible label for the wrapping <s-section>. */
  accessibilityLabel?: string;

  // ── Search ─────────────────────────────────────────────────────────────
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
  searchPlaceholder?: string;

  // ── Sort ───────────────────────────────────────────────────────────────
  sortOptions?: SortOption[];
  sortSelected?: string;
  onSortChange?: (value: string) => void;

  // ── Bulk actions ───────────────────────────────────────────────────────
  bulkActions?: IndexTableBulkAction[];

  // ── Pagination ─────────────────────────────────────────────────────────
  pagination?: IndexTablePagination;
}

export interface IndexTableRowProps {
  id: string;
  children?: React.ReactNode;
  /** Explicit selected state (overrides context when provided). */
  selected?: boolean;
  /** Click handler – only fires when selectable=false. */
  onClick?: () => void;
  /** Row position (informational; not forwarded to DOM). */
  position?: number;
  tone?: "subdued" | "success" | "warning" | "critical";
}

export interface IndexTableCellProps {
  children?: React.ReactNode;
  flush?: boolean;
  alignment?: "start" | "center" | "end";
  colSpan?: number;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function Row({ id, children, onClick, tone }: IndexTableRowProps) {
  const { selectable, selectedIds, onToggle } = useContext(SelectionContext);
  // Sanitise the id to produce a valid HTML id
  const cbId = `idx-cb-${id.replace(/[^a-z0-9]/gi, "_")}`;

  return (
    <STableRowEl
      tone={tone}
      clickDelegate={selectable ? cbId : undefined}
      onClick={!selectable ? onClick : undefined}
      style={!selectable && onClick ? { cursor: "pointer" } : undefined}
    >
      {selectable && (
        <STableCellEl>
          <SCheckboxEl
            id={cbId}
            label={id}
            labelHidden
            checked={selectedIds.has(id) || undefined}
            onChange={() => onToggle(id)}
          />
        </STableCellEl>
      )}
      {children}
    </STableRowEl>
  );
}

function Cell({ children, alignment, colSpan }: IndexTableCellProps) {
  return (
    <STableCellEl alignment={alignment} colSpan={colSpan}>
      {children}
    </STableCellEl>
  );
}

// ── Helper: extract first value from s-choice-list change event ────────────
function extractChoiceValue(e: unknown): string {
  if (!e || typeof e !== "object") return "";
  const ev = e as { detail?: string[] | string; target?: { value?: string } };
  if (Array.isArray(ev.detail)) return ev.detail[0] ?? "";
  if (typeof ev.detail === "string") return ev.detail;
  return (ev.target as HTMLInputElement)?.value ?? "";
}

// ── Main component ─────────────────────────────────────────────────────────

export function IndexTable({
  headings,
  children,
  itemCount,
  resourceName,
  selectable = false,
  allItemIds,
  selectedItemIds,
  onSelectionChange,
  loading,
  emptyState,
  accessibilityLabel,
  searchQuery,
  onSearchQueryChange,
  searchPlaceholder,
  sortOptions,
  sortSelected,
  onSortChange,
  bulkActions,
  pagination,
}: IndexTableProps) {
  const rawId = useId();
  const sortPopoverId = rawId.replace(/:/g, "sp");

  // Internal selection when not controlled externally
  const [internalSelected, setInternalSelected] = useState<Set<string>>(
    () => new Set(selectedItemIds ?? []),
  );

  const selectedIds =
    selectedItemIds !== undefined ? new Set(selectedItemIds) : internalSelected;

  const toggleSelection = useCallback(
    (id: string) => {
      const next = new Set(selectedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (onSelectionChange) onSelectionChange([...next]);
      else setInternalSelected(next);
    },
    [selectedIds, onSelectionChange],
  );

  const clearSelection = useCallback(() => {
    if (onSelectionChange) onSelectionChange([]);
    else setInternalSelected(new Set());
  }, [onSelectionChange]);

  const toggleSelectAll = useCallback(() => {
    if (!allItemIds) return;
    const allSel = allItemIds.every((id) => selectedIds.has(id));
    const next = allSel ? [] : [...allItemIds];
    if (onSelectionChange) onSelectionChange(next);
    else setInternalSelected(new Set(next));
  }, [allItemIds, selectedIds, onSelectionChange]);

  const allSelected =
    allItemIds != null &&
    allItemIds.length > 0 &&
    allItemIds.every((id) => selectedIds.has(id));
  const someSelected =
    allItemIds != null && selectedIds.size > 0 && !allSelected;

  const hasSelection   = selectedIds.size > 0;
  const showBulkBar    = selectable && hasSelection && (bulkActions?.length ?? 0) > 0;
  const hasFilterArea  = onSearchQueryChange !== undefined || (sortOptions && sortOptions.length > 0);
  const showFilterSlot = hasFilterArea || showBulkBar;

  const resourceLabel = resourceName
    ? hasSelection
      ? `${selectedIds.size} ${selectedIds.size === 1 ? resourceName.singular : resourceName.plural} selected`
      : `${itemCount ?? 0} ${(itemCount ?? 0) === 1 ? resourceName.singular : resourceName.plural}`
    : undefined;

  const noItems =
    !children ||
    (Array.isArray(children) && children.filter(Boolean).length === 0);

  const sectionLabel =
    accessibilityLabel ??
    (resourceName ? `${resourceName.plural} table` : "Index table");

  return (
    <SelectionContext.Provider
      value={{ selectable, selectedIds, onToggle: toggleSelection }}
    >
      <SSectionEl padding="none" accessibilityLabel={sectionLabel}>

        {/* ── Filters / bulk-actions — rendered outside s-table so always visible ── */}
        {showFilterSlot && (
          <SGridEl
            gap="small-200"
            gridTemplateColumns={
              showBulkBar
                ? "auto 1fr auto"
                : sortOptions && sortOptions.length > 0
                  ? "1fr auto"
                  : "1fr"
            }
            alignItems="center"
            paddingInline="base"
            paddingBlockStart="base"
            paddingBlockEnd="small-200"
          >
            {showBulkBar ? (
              /* Bulk-action mode */
              <>
                <STextEl variant="bodySm" tone="subdued">
                  {resourceLabel}
                </STextEl>
                <div />
                <SStackEl direction="inline" gap="small-200" alignItems="center">
                  {bulkActions!.map((action) => (
                    <SButtonEl
                      key={action.content}
                      tone={action.destructive ? "critical" : undefined}
                      variant="secondary"
                      loading={action.loading || undefined}
                      disabled={action.disabled || undefined}
                      onClick={action.onAction}
                    >
                      {action.content}
                    </SButtonEl>
                  ))}
                  <SButtonEl variant="tertiary" onClick={clearSelection}>
                    Deselect
                  </SButtonEl>
                </SStackEl>
              </>
            ) : (
              /* Normal filter mode */
              <>
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
                {sortOptions && sortOptions.length > 0 && (
                  <>
                    <SButtonEl
                      icon="sort"
                      variant="secondary"
                      accessibilityLabel="Sort"
                      commandFor={sortPopoverId}
                    />
                    <SPopoverEl id={sortPopoverId}>
                      <SStackEl gap="none">
                        <SBoxEl padding="small">
                          <SChoiceListEl
                            label="Sort by"
                            name={`${sortPopoverId}-sort`}
                            onChange={(e: unknown) => {
                              const val = extractChoiceValue(e);
                              if (val) onSortChange?.(val);
                            }}
                          >
                            {sortOptions.map((opt) => (
                              <SChoiceEl
                                key={opt.value}
                                value={opt.value}
                                selected={
                                  sortSelected === opt.value || undefined
                                }
                              >
                                {opt.label}
                              </SChoiceEl>
                            ))}
                          </SChoiceListEl>
                        </SBoxEl>
                      </SStackEl>
                    </SPopoverEl>
                  </>
                )}
              </>
            )}
          </SGridEl>
        )}

        <STableEl loading={loading || undefined}>

          {/* ── Header row ── */}
          <STableHeaderRowEl>
            {selectable && allItemIds && (
              <STableHeaderEl accessibilityLabel="Select all">
                <SCheckboxEl
                  label="Select all"
                  labelHidden
                  checked={allSelected || undefined}
                  indeterminate={someSelected || undefined}
                  onChange={toggleSelectAll}
                />
              </STableHeaderEl>
            )}
            {selectable && !allItemIds && (
              <STableHeaderEl accessibilityLabel="Select" />
            )}
            {headings.map((h) => (
              <STableHeaderEl
                key={h.title}
                listSlot={h.listSlot}
                accessibilityLabel={h.hidden ? h.title : undefined}
              >
                {h.hidden ? null : h.title}
              </STableHeaderEl>
            ))}
          </STableHeaderRowEl>

          {/* ── Body ── */}
          <STableBodyEl>
            {noItems && emptyState ? (
              <STableRowEl>
                <STableCellEl
                  colSpan={headings.length + (selectable ? 1 : 0)}
                >
                  {emptyState}
                </STableCellEl>
              </STableRowEl>
            ) : (
              children
            )}
          </STableBodyEl>
        </STableEl>

        {/* ── Pagination ── */}
        {pagination && (pagination.hasPrevious || pagination.hasNext) && (
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
      </SSectionEl>
    </SelectionContext.Provider>
  );
}

IndexTable.Row  = Row;
IndexTable.Cell = Cell;
