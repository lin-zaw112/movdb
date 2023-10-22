import React from "react";
import Image from "next/image";
import getImageUrl from "@/utils/getImageUrl";
async function generateImageAlt(url: string): Promise<string> {
  try {
    const res = await fetch(
      `https://alt-text-generator.vercel.app/api/generate?imageUrl=${url}`,
    );
    const text = await res.json();
    return text;
  } catch (error) {
    return "Just a Photo";
  }
}
export default async function GET({
  className,
  src,
  quality,
}: {
  className: string;
  src: string;
  quality: "original" | "w300" | "w780" | "w1280";
}): Promise<React.JSX.Element> {
  const alt = await generateImageAlt(getImageUrl(quality, src));
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={getImageUrl(quality, src)}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw,
        (max-width: 1280px) 50vw,
        (max-width: 1536px) 33vw,
        25vw"
        className="object-cover object-top text-center"
      />
    </div>
  );
}
