import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SDividerEl = (props: any) => React.createElement("s-divider", { suppressHydrationWarning: true, ...props });

export function Divider() {
  return <SDividerEl />;
}
