import React from "react";
import Image from "next/image";
import getImageUrl from "@/utils/getImageUrl";
interface Props {
  movieStatus: string;
  src: string;
  title: string;
}

export default function Poster({
  movieStatus,
  src,
  title,
}: Props): React.JSX.Element {
  const BadgeVariants: Record<string, string> = {
    Released: 'before:content-["Released"]',
    "In Production": 'before:content-["Production"]',
  };
  return (
    <div
      className={
        " poster before:posterBadge hover:before:hidden " +
        BadgeVariants[movieStatus]
      }
    >
      <Image
        src={getImageUrl("original", src)}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw,
          (max-width: 1280px) 50vw,
          (max-width: 1536px) 33vw,
          25vw"
        loading="eager"
        className="flex-none object-cover"
        priority
      />
    </div>
  );
}
