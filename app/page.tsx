import React, { type ReactElement, Suspense } from "react";

import Loading from "@/app/Loading";
import Slider from "@/app/Slider";
import Link from "next/link";
import getEnvVar from "@/utils/getEnvVer";
import Search from "@/Components/Search/Search";

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

const fetchTrendingMoviesToday = async (): Promise<moviesObj> => {
  const data = await fetch(
    `${API_URL}trending/movie/day?language=en-US`,
    options,
  );

  const movies = await data.json();

  return movies;
};

export default async function Index(): Promise<ReactElement> {
  const movies = await fetchTrendingMoviesToday();
  return (
    <main className="flex min-h-full w-screen flex-col px-20">
      <Search />
      <div className="mx-auto my-12 flex h-full w-full justify-center space-x-3.5">
        <div className="h-full rounded-3xl bg-gradient-to-r from-slate-300 to-slate-500 shadow-lg ">
          <Link href="/topRated">
            <h1 className="-skew-y-6 skew-x-6 p-10 font-mono text-2xl font-extrabold uppercase text-neutral-50 transition hover:skew-x-0 hover:skew-y-0 hover:scale-150 xl:p-11">
              top Rated
            </h1>
          </Link>
        </div>
        <div className="h-full rounded-3xl bg-gradient-to-r from-slate-500 to-slate-800 shadow-lg ">
          <Link href="/popular">
            <h1 className="-skew-x-6 skew-y-6 p-10 font-mono text-2xl font-extrabold uppercase text-neutral-50 transition hover:skew-x-0 hover:skew-y-0 hover:scale-150 xl:p-11">
              Popular
            </h1>
          </Link>
        </div>
        <div className="h-full rounded-3xl bg-gradient-to-l from-slate-900 to-slate-700 shadow-lg ">
          <Link href="/category">
            <h1 className="-skew-y-12 skew-x-12 p-10 font-mono text-2xl font-extrabold uppercase text-neutral-50 transition hover:skew-x-0 hover:skew-y-0 hover:scale-150 xl:p-11">
              Category
            </h1>
          </Link>
        </div>
      </div>
      <div>
        <h1 className="mb-4 text-2xl font-semibold">Trending Today</h1>
        <Suspense fallback={<Loading />}>
          <Slider items={movies.results} />
        </Suspense>
      </div>
    </main>
  );
}
