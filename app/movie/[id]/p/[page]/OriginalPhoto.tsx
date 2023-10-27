import getImageUrl from "@/utils/getImageUrl";
import Image from "next/image";
import React from "react";

interface Props {
  image: string;
}
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
export default async function OriginalPhoto({
  image,
}: Props): Promise<React.JSX.Element> {
  const alt = await generateImageAlt(getImageUrl("w780", `/${image}`));

  return (
    <div className={`relative h-full w-full `}>
      <Image
        src={getImageUrl("original", `/${image}?original?trace`)}
        alt={alt}
        fill
        sizes="100vw"
        placeholder="blur"
        priority
        blurDataURL={getImageUrl("w300", `/${image}?lqip?inline?trace`)}
        quality={100}
        className="object-cover object-center"
      />
    </div>
  );
}
