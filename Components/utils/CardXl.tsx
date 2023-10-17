import React, { type ReactElement } from "react";

import Poster from "./Poster";
import Details from "../template/Details";
import Gallery from "../template/Gallery";
interface props {
  movie: movie;
}
export default function CardXl({ movie }: props): ReactElement {
  return (
    <div className=" flex p-6 pb-0">
      <Poster
        movieStatus={movie.status}
        src={
          movie.poster_path ?? movie.belongs_to_collection?.poster_path ?? ""
        }
        title={movie.title}
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
  );
}
