"use client";
import React, { useCallback, useState, useEffect, Fragment } from "react";
import getImageUrl from "@/utils/getImageUrl";
import Card from "@/Components/utils/Card";
import CardSkelaton from "@/Components/utils/Skelaton/Card";

const initialData: React.JSX.Element[] = [];
for (let i = 0; i <= 20; i++) {
  initialData.push(<CardSkelaton key={i} />);
}
export default function TopRated(): React.JSX.Element {
  const [content, setContent] = useState<React.JSX.Element>();
  const [status, setStatus] = useState<"success" | "failed" | "init">("init");
  const [movies, setMovies] = useState<moviesObj>();
  const [Currentpage, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const newLimit = useCallback((): void => {
    setPage((prev) =>
      movies?.page !== undefined
        ? prev === movies.page
          ? prev + 1
          : prev
        : prev + 1,
    );
  }, [movies]);

  const fetchVideos = useCallback(async (page: number): Promise<void> => {
    const res = await fetch(`/api/movies/topRated?page=${page}`);
    if (!res.ok) setError(res.statusText);

    const data: moviesObj = await res.json();
    setMovies(function (prev) {
      if (prev === undefined) {
        setStatus("success");
        return { ...data };
      } else {
        setStatus("success");
        return {
          ...data,
          results:
            prev.results[0].id === data.results[0].id
              ? [...prev.results]
              : [...prev.results, ...data.results],
        };
      }
    });
  }, []);

  useEffect(() => {
    if (error !== null) throw new Error(error);
  }, [error]);

  useEffect(() => {
    void fetchVideos(Currentpage);
  }, [Currentpage, fetchVideos]);
  useEffect(() => {
    if (status === "init") setContent(<Fragment>{initialData}</Fragment>);
    if (status === "success") {
      if (movies !== undefined) {
        const items = movies.results.map((movie, index, arr) => (
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
        ));
        setContent(<Fragment>{items}</Fragment>);
      }
    }
  }, [movies, newLimit, status]);
  return (
    <div className={`m-4 flex flex-wrap justify-around gap-2`}>{content}</div>
  );
}
