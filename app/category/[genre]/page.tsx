import Card from "@/Components/utils/Card";
import getImageUrl from "@/utils/getImageUrl";
import React from "react";
import Paginate from "../Paginate";
import getEnvVar from "@/utils/getEnvVer";

const API_URL = getEnvVar("NEXT_PUBLIC_API_URL")?.replace(
  "{API_VERSION}",
  `${getEnvVar("NEXT_PUBLIC_API_VERSION")}`,
);
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${getEnvVar("API_ACCESS_KEY")}`,
  },
};

async function getMovies(genre: string, page: string): Promise<moviesObj> {
  const date = new Intl.DateTimeFormat("en-CA", {
    dateStyle: "short",
  }).format(new Date());

  const data = await fetch(
    `${API_URL}discover/movie?language=en-US&with_release_type=2|3&release_date.lte=${date}&page=1&with_genres=${genre}&page=${page}`,
    options,
  );

  const movies = await data.json();

  return movies;
}

export default async function genre({
  params,
  searchParams,
}: {
  params: { genre: string };
  searchParams: { page: string };
}): Promise<React.JSX.Element> {
  const page = searchParams.page ?? "1";
  if (Number(page) > 500) {
    return (
      <div className="m-auto grid place-items-center">
        <h1>
          Page NO.{page} isn&apos;t vaild page (page must be less than or equal
          to 500)
        </h1>
      </div>
    );
  }
  const movies = await getMovies(params.genre, page);

  return (
    <div className="relative mb-20 flex flex-wrap justify-around gap-x-10 gap-y-7 overflow-y-scroll px-10">
      {movies.results?.map((movie) => {
        if (movie.poster_path === "") return "";

        return (
          <Card
            id={movie.id}
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
            title={movie.title}
            key={movie.id}
          />
        );
      })}
      <Paginate movie={movies} />
    </div>
  );
}
