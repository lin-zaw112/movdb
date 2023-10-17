"use client";
import Portal from "@/Components/utils/Potal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, type ReactElement, useState } from "react";
import Loading from "@/app/LoadingOverlay";

const MovieNavagation = ({ id }: { id: string }): ReactElement => {
  const path = usePathname();
  const [isIndex, setIsIndex] = useState<"star" | "trailer">();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const root = path.split("/");
    if (root[root.length - 1] === "star") setIsIndex("star");
    if (root[root.length - 1] === "trailer") setIsIndex("trailer");
    setLoading(false);
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
          onClick={() => {
            setLoading(true);
          }}
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
          onClick={() => {
            setLoading(true);
          }}
        >
          Trailer
        </Link>
      </ul>
      <Portal>{loading && <Loading />}</Portal>
    </nav>
  );
};

export default MovieNavagation;
