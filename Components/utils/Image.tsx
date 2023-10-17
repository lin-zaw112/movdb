import React from "react";
import Image from "next/image";
import getImageUrl from "@/utils/getImageUrl";
export default async function GET({
  className,
  src,
  quality,
  alt,
}: {
  className: string;
  src: string;
  quality: "original" | "w300" | "w780" | "w1280";
  alt: string;
}): Promise<React.JSX.Element> {
  return (
    <div className={`relative ${className} overflow-hidden rounded-lg`}>
      <Image
        src={getImageUrl(quality, src)}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw,
        (max-width: 1280px) 50vw,
        (max-width: 1536px) 33vw,
        25vw"
        className="rounded-lg object-cover object-top text-center"
      />
    </div>
  );
}
