import React from "react";

export default function CardSkelaton(): React.ReactNode {
  return (
    <div className="h-72 w-44 animate-pulse cursor-pointer overflow-hidden rounded-xl bg-neutral-900/10 opacity-100 shadow-lg dark:bg-neutral-50/10" />
  );
}
