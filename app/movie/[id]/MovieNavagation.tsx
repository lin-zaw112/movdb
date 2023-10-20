"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, type ReactElement, useState } from "react";

export default function MovieNavagation({ id }: { id: string }): ReactElement {
  const path = usePathname();
  const [isIndex, setIsIndex] = useState<"star" | "trailer">();
  useEffect(() => {
    const root = path.split("/");
    if (root[root.length - 1] === "star") setIsIndex("star");
    if (root[root.length - 1] === "trailer") setIsIndex("trailer");
  }, [path, id]);

  return (
    <nav className="mx-auto flex items-center overflow-hidden font-medium">
      <ul className="flex flex-row">
        <Link
          href={`/movie/${id}/star`}
          className={`${
            isIndex === "star"
              ? "bg-neutral-100 dark:bg-neutral-900"
              : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
          } px-6 py-4 transition duration-300  `}
          replace
        >
          Stars
        </Link>
        <Link
          href={`/movie/${id}/trailer`}
          className={`${
            isIndex === "trailer"
              ? "bg-neutral-100 dark:bg-neutral-900"
              : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
          } px-6 py-4 transition duration-300  `}
          prefetch
          replace
        >
          Trailer
        </Link>
      </ul>
    </nav>
  );
}
