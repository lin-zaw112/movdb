import React from "react";
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
    <div className="group relative h-64 w-60 ">
      <div className="absolute left-1/2 top-1/2 h-64 w-56 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-lg bg-neutral-800 shadow-md transition-all duration-500">
        <div className="absolute left-0 top-0 z-20 h-full w-full duration-500 group-hover:-translate-y-20 group-hover:transition-all group-hover:duration-700">
          <Image
            className="h-full w-full group-hover:opacity-40 group-hover:duration-500"
            src={image}
            quality="original"
            alt={name}
          />
        </div>
        <div className="absolute bottom-0 left-0 z-10 h-20 w-full p-2 text-lg leading-relaxed">
          <h2 className="mx-8 whitespace-nowrap text-center">
            {name}
            <span className="flow-root text-base font-light text-neutral-700 dark:text-neutral-300">
              As a {character}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
