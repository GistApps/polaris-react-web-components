/**
 * Thumbnail — wraps <s-thumbnail>.
 * Reference: https://shopify.dev/docs/api/app-home/web-components/media-and-visuals/thumbnail
 */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SThumbnailEl = (props: any) => React.createElement("s-thumbnail", { suppressHydrationWarning: true, ...props });

export interface ThumbnailProps {
  source: string;
  alt?: string;
  size?: "extraSmall" | "small" | "medium" | "large";
}

export function Thumbnail({ source, alt, size }: ThumbnailProps) {
  return (
    <SThumbnailEl src={source} alt={alt ?? ""} size={size} />
  );
}
