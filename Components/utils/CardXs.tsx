import React, { Suspense } from "react";
import Image from "./Image";
interface props {
  image: string;
  id: number;
  name: string;
  character: string;
}
export default function CardXs({
  image,
  name,
  character,
}: props): React.JSX.Element {
  return (
    <div className=" group m-2 flex h-52 w-fit flex-row rounded-lg transition-all duration-700  hover:bg-neutral-200 dark:hover:bg-neutral-950 ">
      <Suspense
        fallback={<div className="h-full animate-pulse bg-neutral-500 " />}
      >
        <Image
          className="z-10 h-full w-32"
          src={image}
          quality="original"
          alt={name}
        />
      </Suspense>
      <h2 className="relative -top-1/3  h-full w-0 -translate-x-32 translate-y-1/2 text-lg leading-relaxed opacity-0 transition duration-500 group-hover:w-2/4 group-hover:-translate-x-0 group-hover:opacity-100">
        {name}
        <span className="flow-root font-semibold text-white">
          As a {character}
        </span>
      </h2>
    </div>
  );
}
