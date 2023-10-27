import Link from "next/link";
import React, { useState } from "react";
import Portal from "../utils/Potal";
import Loading from "@/app/LoadingOverlay";

interface Props {
  results: moviesObj["results"];
}

export default function Results({ results }: Props): React.JSX.Element {
  const [isLoading, setLoading] = useState(false);
  return (
    <div className="absolute top-14 z-10 h-96 w-full overflow-hidden">
      <div className="flex h-4/6 flex-col overflow-scroll backdrop-blur-xl dark:bg-neutral-950/50">
        {results.map((movie) => (
          <div key={movie.id}>
            <Link
              href={`/movie/${movie.id}`}
              className="flex flex-row justify-between p-8 px-20 shadow-sm hover:bg-neutral-950/60"
              onClick={() => {
                setLoading(true);
              }}
            >
              <h1 className="text-ellipsis text-lg font-semibold">
                {movie.title}
              </h1>
              <span className="text-neutral-600">
                {Number.isNaN(new Date(movie.release_date).getFullYear())
                  ? ""
                  : new Date(movie.release_date).getFullYear()}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <Portal>{isLoading && <Loading />}</Portal>
    </div>
  );
}
