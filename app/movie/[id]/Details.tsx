import React from "react";
import formatminuts from "@/utils/formatminuts";
import Link from "next/link";

interface Props {
  title: string;
  genres: genre[];
  releaseDate: Date;
  runTime: number;
  description: string;
}

export default function Details({
  title,
  genres,
  releaseDate,
  runTime,
  description,
}: Props): React.JSX.Element {
  const releaseYear = new Date(releaseDate).getFullYear();
  const runTimeHr = formatminuts(runTime);
  return (
    <div className="m-9">
      <h1>
        <span className="text-3xl font-medium">{title}</span>
        <span className="">
          ({releaseYear}) {runTimeHr}
        </span>
        <ul className="flex flex-row space-x-2">
          {genres.map(function (genre): React.JSX.Element | any {
            return (
              <li key={genre.id} className="underline underline-offset-4">
                <Link href={`/category/${genre.id}`}>{genre.name}</Link>
              </li>
            );
          })}
        </ul>
      </h1>
      <p className="my-9 max-w-2xl text-base/loose">
        <span className=" flow-root font-mono opacity-40">description :</span>
        {description}
      </p>
    </div>
  );
}
