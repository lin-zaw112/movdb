import React, { Fragment } from "react";
import MovieNavagation from "./MovieNavagation";
import getEnvVar from "@/utils/getEnvVer";
import Image from "@/Components/utils/Image";

import Details from "@/app/movie/[id]/Details";
import Gallery from "@/app/movie/[id]/Gallery";

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
const BadgeVariants: Record<string, string> = {
  Released: 'before:content-["Released"]',
  "In Production": 'before:content-["Production"]',
};

async function getMovie(id: string): Promise<movie | undefined> {
  const data = await fetch(`${API_URL}movie/${id}`, options);
  const movie = await data.json();
  return movie;
}
async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}): Promise<React.JSX.Element> {
  const movie = await getMovie(params.id);

  return (
    <Fragment>
      <title>{movie?.title}</title>
      {movie !== undefined && (
        <div className=" flex p-6 pb-0">
          <Image
            src={
              movie.poster_path ??
              movie.belongs_to_collection?.poster_path ??
              movie.backdrop_path ??
              movie.belongs_to_collection?.backdrop_path ??
              ""
            }
            quality="original"
            className={`before:badge relative m-5 h-80 w-52 flex-none overflow-hidden hover:before:hidden ${
              BadgeVariants[movie.status]
            }`}
          />
          <Details
            title={movie.original_title}
            genres={movie.genres}
            releaseDate={movie.release_date}
            runTime={movie.runtime}
            description={movie.overview}
          />
          <Gallery id={movie.id} quote={movie.tagline} title={movie.title} />
        </div>
      )}
      <MovieNavagation id={params.id} />
      {children}
    </Fragment>
  );
}

export default layout;
