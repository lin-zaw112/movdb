/* eslint-disable jsx-a11y/alt-text */
import getImageUrl from "@/utils/getImageUrl";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

interface Props {
  params: { id: string; page: string };
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
export default async function page({
  params,
}: Props): Promise<React.JSX.Element> {
  const alt = await generateImageAlt(getImageUrl("w780", `/${params.page}`));

  return (
    <Fragment>
      <Link
        href={`/movie/${params.id}`}
        className="absolute top-0 z-30 h-full w-full scale-150"
      >
        <div className={`relative h-full w-full blur-sm`}>
          <Image
            src={getImageUrl("w300", `/${params.page}`)}
            alt="backdrop"
            fill
            placeholder="blur"
            blurDataURL={getImageUrl("w300", `/${params.page}`)}
            sizes="300px"
            quality={30}
            priority
            className="object-cover object-center"
          />
        </div>
      </Link>
      <div className="absolute left-1/2 top-1/2 z-40 h-5/6 w-10/12 -translate-x-1/2 -translate-y-1/2">
        <Link
          href={`/movie/${params.id}`}
          className="absolute z-50 m-1 rounded-full p-2 text-sm backdrop-blur-lg backdrop-sepia"
        >
          <XMarkIcon className=" h-5 w-5 text-neutral-50" />
        </Link>
        <div className={`relative h-full w-full`}>
          <Image
            src={getImageUrl("original", `/${params.page}`)}
            alt={alt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={getImageUrl("w300", `/${params.page}`)}
            quality={100}
            priority
            className="object-cover object-center "
          />
        </div>
      </div>
    </Fragment>
  );
}
