/**
 * polaris-web.tsx — barrel re-export
 *
 * All Polaris-style components are now implemented as individual files that
 * wrap Shopify's App Home web components (<s-*> elements).
 *
 * Import from this file exactly as before — no consumer changes required.
 */

// ── Providers / wrappers ──────────────────────────────────────────────────────
export { AppProvider }                   from "./AppProvider";
export { Frame }                         from "./Frame";

// ── Page ──────────────────────────────────────────────────────────────────────
export { Page }                          from "./Page";
export type { PageProps }                from "./Page";

// ── Layout & Structure ────────────────────────────────────────────────────────
export { Layout }                        from "./Layout";
export type { LayoutProps, LayoutSectionProps } from "./Layout";

export { Box }                           from "./Box";
export type { BoxProps }                 from "./Box";

export { Card }                          from "./Card";
export type { CardProps }                from "./Card";

export { BlockStack }                    from "./BlockStack";
export type { BlockStackProps }          from "./BlockStack";

export { InlineStack }                   from "./InlineStack";
export type { InlineStackProps }         from "./InlineStack";

export { InlineGrid }                    from "./InlineGrid";
export type { InlineGridProps }          from "./InlineGrid";

export { Grid }                          from "./Grid";
export type { GridProps }                from "./Grid";

export { Divider }                       from "./Divider";

// ── Typography ────────────────────────────────────────────────────────────────
export { Text }                          from "./Text";
export type { TextProps }                from "./Text";

// ── Actions ───────────────────────────────────────────────────────────────────
export { Button }                        from "./Button";
export type { ButtonProps }              from "./Button";

export { Link }                          from "./Link";
export type { LinkProps }                from "./Link";

export { ButtonGroup }                   from "./ButtonGroup";
export type { ButtonGroupProps }         from "./ButtonGroup";

// ── Forms ─────────────────────────────────────────────────────────────────────
export { TextField }                     from "./TextField";
export type { TextFieldProps }           from "./TextField";

export { Select }                        from "./Select";
export type { SelectProps, SelectOption, SelectOptionGroup } from "./Select";

export { Checkbox }                      from "./Checkbox";
export type { CheckboxProps }            from "./Checkbox";

export { ChoiceList }                    from "./ChoiceList";
export type { ChoiceListProps, ChoiceDescriptor } from "./ChoiceList";

export { FormLayout }                    from "./FormLayout";
export type { FormLayoutProps, FormLayoutGroupProps } from "./FormLayout";

export { DropZone }                      from "./DropZone";
export type { DropZoneProps, DropZoneFile } from "./DropZone";

// ── Feedback & Status ─────────────────────────────────────────────────────────
export { Badge }                         from "./Badge";
export type { BadgeProps, BadgeTone }    from "./Badge";

export { Banner }                        from "./Banner";
export type { BannerProps }              from "./Banner";

export { Spinner }                       from "./Spinner";
export type { SpinnerProps }             from "./Spinner";

// ── Overlays ──────────────────────────────────────────────────────────────────
export { Modal }                         from "./Modal";
export type { ModalProps, ModalAction }  from "./Modal";

// ── Data Display ──────────────────────────────────────────────────────────────
export { IndexTable }                    from "./IndexTable";
export type {
  IndexTableProps,
  IndexTableHeading,
  IndexTableRowProps,
  IndexTableCellProps,
  SortOption,
  IndexTableBulkAction,
  IndexTablePagination,
}                                        from "./IndexTable";

export { List }                          from "./List";
export type { ListProps }                from "./List";

export { ResourceList }                  from "./ResourceList";
export type {
  ResourceListProps,
  ResourceListPrimaryAction,
  ResourceListPagination,
}                                        from "./ResourceList";

export { ResourceItem }                  from "./ResourceItem";
export type { ResourceItemProps }        from "./ResourceItem";

export { EmptyState }                    from "./EmptyState";
export type { EmptyStateProps, EmptyStateAction } from "./EmptyState";

export { HelpCard }                      from "./HelpCard";
export type { HelpCardProps }            from "./HelpCard";

// ── Media & Visuals ───────────────────────────────────────────────────────────
export { Thumbnail }                     from "./Thumbnail";
export type { ThumbnailProps }           from "./Thumbnail";

export { MediaCard }                     from "./MediaCard";
export type { MediaCardProps }           from "./MediaCard";

export { Icon }                          from "./Icon";
export type { IconProps }                from "./Icon";

export { Tooltip }                       from "./Tooltip";
export type { TooltipProps }             from "./Tooltip";

// ── Navigation ────────────────────────────────────────────────────────────────
export { ContextualSaveBar }             from "./ContextualSaveBar";
export type { ContextualSaveBarProps, ContextualSaveBarAction } from "./ContextualSaveBar";

// ── Icons (Polaris icon replacements) ─────────────────────────────────────────
export { CheckCircleIcon }               from "./icons/CheckCircleIcon";
export type { CheckCircleIconProps }     from "./icons/CheckCircleIcon";

