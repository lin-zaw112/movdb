"use client";
import { PlayIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useRef } from "react";

interface Props {
  video: string;
  width: string;
  height: string;
  className: string;

  thumbnailQuality: "default" | "hqdefault" | "mqdefault" | "sddefault";
}

export default function YouTubeFrame({
  video,
  width,
  height,
  className,
  thumbnailQuality,
}: Props): React.JSX.Element {
  const divRef = useRef<HTMLDivElement | null>(null);

  const onClick = (): void => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    );
    iframe.style.width = width;
    iframe.style.height = height;
    iframe.setAttribute(
      "src",
      `https://www.youtube.com/embed/${video}?rel=0&showinfo=1&autoplay=1`,
    );
    if (divRef.current !== null) {
      divRef.current.innerHTML = "";
      divRef.current.appendChild(iframe);
    }
  };

  return (
    <div onClick={onClick} ref={divRef} className={className}>
      <PlayIcon className=" absolute left-2/4 top-2/4 z-50 h-10 w-16 border-spacing-32 -translate-x-2/4 -translate-y-2/4 rounded-lg border border-transparent bg-red-600 py-1 text-center text-neutral-50 focus:ring" />
      <Image
        onClick={onClick}
        loading="lazy"
        src={`https://img.youtube.com/vi/${video}/${thumbnailQuality}.jpg`}
        alt="YouTube Video Thumbnail"
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}
