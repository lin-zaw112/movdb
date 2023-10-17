"use client";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import Portal from "@/Components/utils/Potal";
import Loading from "./LoadingOverlay";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, type ReactElement, useState } from "react";

const MainNavagation = (): ReactElement => {
  const path = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isIndex, setIsIndex] = useState(true);
  const backHandler = function (): void {
    router.back();
  };
  const HandleOnLoad = function (e: React.MouseEvent): void {
    if ((e.target as HTMLAnchorElement).pathname !== path) {
      setLoading(true);
    } else {
      router.refresh();
    }
  };
  useEffect(() => {
    if (path !== "/") setIsIndex(false);
    if (path === "/") setIsIndex(true);
    setLoading(false);
  }, [path]);
  return (
    <div className="fixed left-0 top-0 z-50 mx-auto flex h-16 w-screen items-center justify-between bg-white px-20 font-medium uppercase ring-1 ring-inset ring-neutral-100 dark:bg-neutral-950">
      {!isIndex && (
        <button className="absolute" onClick={backHandler}>
          <ArrowLongLeftIcon className="h-6 w-6" />
        </button>
      )}
      <h1
        className={`${
          !isIndex ? "m-14" : ""
        } cursor-pointer subpixel-antialiased transition hover:translate-y-1 hover:scale-105 dark:text-neutral-50`}
      >
        <Link href="/" onClick={HandleOnLoad}>
          MOVDB
        </Link>
      </h1>
      <nav className="hidden md:block">
        <ul className="flex flex-row space-x-32">
          <li
            className={`border-b-2 transition duration-300 hover:border-black dark:text-neutral-50 dark:hover:border-white  ${
              path.startsWith("/popular")
                ? "border-black dark:border-white"
                : "border-transparent"
            }`}
          >
            <Link href="/popular" onClick={HandleOnLoad}>
              Popular
            </Link>
          </li>

          <li className={`group relative w-fit`}>
            <Link
              href={"/category"}
              className={` border-b-2 transition duration-300 hover:border-black dark:text-neutral-50 dark:hover:border-white ${
                path.startsWith("/category")
                  ? "border-black dark:border-white"
                  : "border-transparent"
              }`}
            >
              Category
            </Link>
            <nav className="sr-only flex h-fit w-fit flex-col overflow-hidden whitespace-nowrap bg-neutral-50/90 text-center transition-all group-hover:not-sr-only group-hover:absolute dark:bg-neutral-950/90">
              <Link
                href="/category/16"
                className="-translate-y-96 border-b-2 border-transparent px-4 py-2 transition duration-300 hover:border-black group-hover:-translate-y-0  dark:text-neutral-50 dark:hover:border-white"
                onClick={HandleOnLoad}
              >
                anime
              </Link>
              <Link
                href="/"
                className="-translate-y-96 border-b-2 border-transparent px-4 py-2 transition duration-500  hover:border-black  group-hover:-translate-y-0 dark:text-neutral-50 dark:hover:border-white"
                onClick={HandleOnLoad}
              >
                Actor
              </Link>
            </nav>
          </li>
          <Link
            href="/topRated"
            className={`border-b-2 transition duration-300 hover:border-black dark:text-neutral-50 dark:hover:border-white ${
              path.startsWith("/topRated")
                ? "border-black dark:border-white"
                : "border-transparent"
            }`}
            onClick={HandleOnLoad}
          >
            Top Rated
          </Link>
        </ul>
      </nav>
      <Portal>{loading && <Loading />}</Portal>
    </div>
  );
};

export default MainNavagation;
