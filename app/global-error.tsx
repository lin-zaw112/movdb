"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>Something went wrong! Globel</h2>
        <button
          onClick={() => {
            reset();
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
