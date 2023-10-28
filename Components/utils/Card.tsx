"use client";
import Image from "next/image";
import React, { type ReactElement, useEffect, useRef, useState } from "react";
import Portal from "./Potal";
import Loading from "@/app/LoadingOverlay";
import Link from "next/link";

interface Props {
  image: string;
  title: string;
  id: number;
  isLast?: boolean | undefined;
  newLimit?: any | undefined;
  className?: string;
  blur: string;
}
const Card = ({
  isLast,
  newLimit,
  blur,
  image,
  title,
  id,
  className,
}: Props): ReactElement => {
  const cardRef = useRef<null | HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoading] = useState(false);

  useEffect(() => {
    if (cardRef.current === null) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast !== undefined && isLast && entry.isIntersecting) {
        if (cardRef?.current !== null) newLimit();

        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast, newLimit]);

  return (
    <div
      className={`group relative m-2 h-72 w-44 cursor-pointer overflow-hidden rounded-lg shadow-xl dark:bg-neutral-950 dark:hover:bg-neutral-900 ${
        className != null && className
      }`}
      ref={cardRef}
    >
      <Image
        src={image}
        alt={title}
        placeholder="blur"
        blurDataURL={blur}
        className="h-full w-full transition group-hover:scale-110"
        fill
        unoptimized
        style={{ transform: "translate3d(0, 0, 0)" }}
        sizes="(max-width: 640px) 100vw,
          (max-width: 1280px) 50vw,
          (max-width: 1536px) 33vw,
          25vw"
        loading="eager"
        onLoadingComplete={() => {
          setImgLoading(true);
        }}
      />
      <Link
        href={`/movie/${id}`}
        prefetch={false}
        className={`absolute left-0 top-0 grid h-full w-full place-items-center rounded-xl text-center text-5xl font-bold drop-shadow-md transition hover:opacity-100 ${
          !imgLoaded
            ? "animate-pulse bg-neutral-900/10 opacity-100 dark:bg-neutral-50/10"
            : "bg-neutral-950/50 opacity-0"
        } `}
        onClick={() => {
          setLoading(true);
        }}
      >
        {image === "/placeholder.svg" && imgLoaded ? "404 not found" : ""}
      </Link>

      <Portal>{loading && <Loading />}</Portal>
    </div>
  );
};

export default Card;
