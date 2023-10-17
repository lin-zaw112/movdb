import React, { Fragment, Suspense } from "react";
import Loading from "@/app/Loading";
import MovieNavagation from "./MovieNavagation";
import getEnvVar from "@/utils/getEnvVer";

import CardXl from "@/Components/utils/CardXl";

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
      <Suspense fallback={<Loading />}>
        {movie !== undefined && <CardXl movie={movie} />}
      </Suspense>
      <MovieNavagation id={params.id} />
      {children}
    </Fragment>
  );
}

export default layout;
