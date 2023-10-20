"use client";
import getImageUrl from "@/utils/getImageUrl";
import React from "react";
import Ticker from "../Components/Ticker";
import Card from "../Components/utils/Card";

interface Props {
  items: movie[];
}

export default function Slider({ items }: Props): React.JSX.Element {
  return (
    <div className="h-72 w-full">
      <Ticker>
        {items.map((movie) => {
          return (
            <Card
              key={movie.id}
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
              id={movie.id}
              className="m-2"
            />
          );
        })}
      </Ticker>
    </div>
  );
}
