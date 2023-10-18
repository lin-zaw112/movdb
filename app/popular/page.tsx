"use client";
import React, { useCallback, useState, useEffect, Fragment } from "react";
import getImageUrl from "@/utils/getImageUrl";
import Card from "@/Components/utils/Card";
import Error from "./error";
import CardSkelaton from "@/Components/utils/Skelaton/Card";

const initialData: React.JSX.Element[] = [];
for (let i = 0; i <= 20; i++) {
  initialData.push(<CardSkelaton />);
}
function Popular(): React.JSX.Element {
  const [content, setContent] = useState<React.JSX.Element>();
  const [status, setStatus] = useState<"success" | "failed" | "init">("init");
  const [movies, setMovies] = useState<moviesObj>();
  const [Currentpage, setPage] = useState<number>(1);

  function newLimit(): void {
    setPage((prev) => prev + 1);
  }
  const fetchVideos = useCallback(async (page: number): Promise<void> => {
    const res = await fetch(`/api/movies/popular?page=${page}`);

    const moviesObj: moviesObj = await res.json();

    setMovies(function (prev) {
      if (prev === undefined) {
        setStatus("success");
        return { ...moviesObj };
      } else {
        setStatus("success");
        return {
          ...moviesObj,
          results:
            prev.results[0].id === moviesObj.results[0].id
              ? [...prev.results]
              : [...prev.results, ...moviesObj.results],
        };
      }
    });
  }, []);

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
      } else {
        setContent(<Error />);
      }
    }
  }, [movies, status]);
  return (
    <div className={`m-4 flex flex-wrap justify-around gap-2`}>{content}</div>
  );
}

export default Popular;
