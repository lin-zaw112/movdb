"use client";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Results from "./SearchResultList";
import Loading from "@/app/movie/[id]/Loading";

export default function Search(): React.JSX.Element {
  const [shouldFetch, shouldFetchNow] = useState(false);
  const query = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useSWR<moviesObj>(
    shouldFetch && query.current !== null
      ? `/api/search?query=${query.current.value}`
      : null,
    fetcher,
  );
  const handleSearch = (
    event: any,
  ): React.FormEventHandler<HTMLFormElement> | undefined => {
    shouldFetchNow(false);
    event.preventDefault();
    shouldFetchNow(true);
    return undefined;
  };

  return (
    <form onSubmit={handleSearch} className=" relative m-10 w-2/4 self-center">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search for Movies by name...."
        ref={query}
        className="absolute left-0 top-0 h-8 w-full rounded-full p-6 ring-1 dark:bg-neutral-800 dark:ring-0 dark:placeholder:text-neutral-400"
      />
      <button
        onClick={handleSearch}
        className="absolute right-0 top-0 z-10 rounded-full bg-neutral-950 px-6 py-3 text-center text-neutral-50 transition hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 hover:dark:bg-neutral-950 hover:dark:text-neutral-50"
      >
        search
      </button>
      {isLoading && (
        <div className="absolute top-14 z-10 h-96 w-full">
          <div className="flex h-4/6 flex-col overflow-scroll backdrop-blur-xl dark:bg-neutral-950/50">
            <Loading />
          </div>
        </div>
      )}

      {!isLoading && data !== undefined && <Results results={data.results} />}
    </form>
  );
}
