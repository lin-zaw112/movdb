"use client"; // Error components must be Client Components

import React from "react";

export default function Error(): React.ReactNode {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button>Try again</button>
    </div>
  );
}
