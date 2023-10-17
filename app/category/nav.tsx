"use client";
import Portal from "@/Components/utils/Potal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "../LoadingOverlay";
import { usePathname } from "next/navigation";

export default function Nav({ items }: { items: genre[] }): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  useEffect(() => {
    setLoading(false);
  }, [path]);
  const currentPage = Number(path.replace(/^\D+/g, ""));
  return (
    <nav className="flex h-full w-64 flex-none flex-col overflow-hidden overflow-y-scroll">
      {items.map((item) => {
        return (
          <Link
            href={`/category/${item.id}`}
            key={item.id}
            className={` p-2 text-center text-lg uppercase shadow hover:scale-110 hover:bg-neutral-200 dark:hover:bg-neutral-900 ${
              currentPage === item.id
                ? "scale-110 bg-neutral-200 dark:bg-neutral-900"
                : ""
            }`}
            onClick={() => {
              setLoading(true);
            }}
          >
            {item.name}
          </Link>
        );
      })}
      <Portal>{loading && <Loading />}</Portal>
    </nav>
  );
}
