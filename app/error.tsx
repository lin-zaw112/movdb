"use client"; // Error components must be Client Components

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h2>{error.message}</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
