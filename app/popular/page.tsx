"use client";
import React, { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import getImageUrl from "@/utils/getImageUrl";
import Card from "@/Components/utils/Card";
import CardSkelaton from "@/Components/utils/Skelaton/Card";
import fetcher from "@/utils/fetcher";

const initialData: React.JSX.Element[] = [];

for (let i = 0; i <= 20; i++) {
  initialData.push(<CardSkelaton key={i} />);
}

export default function Popular(): React.JSX.Element {
  const { data, isLoading, size, setSize } = useSWRInfinite<moviesObj>(
    (pageIndex) => `/api/movies/popular?page=${pageIndex + 1}`,
    fetcher,
    { revalidateFirstPage: false, revalidateAll: false, initialSize: 1 },
  );
  const isLoadingMore =
    isLoading ||
    (size > 0 && data != null && typeof data[size - 1] === "undefined");
  const newLimit = useCallback((): void => {
    if (!isLoadingMore) void setSize(size + 1);
  }, [isLoadingMore]);

  if (isLoading || data === null || data === undefined)
    return (
      <div className="className={`m-4 flex flex-wrap justify-around gap-2`}">
        {initialData}
      </div>
    );

  return (
    <div className={`m-4 flex flex-wrap justify-around gap-2`}>
      {data.map((movies) =>
        movies.results.map((movie, index, arr) => (
          <Card
            image={getImageUrl(
              "original",
              movie.poster_path ??
                movie.belongs_to_collection?.poster_path ??
                movie.backdrop_path ??
                movie.belongs_to_collection?.backdrop_path ??
                "",
            )}
            blur={getImageUrl(
              "w300",
              movie.poster_path ??
                movie.belongs_to_collection?.poster_path ??
                movie.backdrop_path ??
                movie.belongs_to_collection?.backdrop_path ??
                "",
            )}
            key={movie.id}
            id={movie.id}
            title={movie.title}
            isLast={index === arr.length - 1}
            newLimit={newLimit}
          />
        )),
      )}
    </div>
  );
}
