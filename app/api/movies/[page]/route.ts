import "server-only";
import { NextResponse, type NextRequest } from "next/server";

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
async function getPopularMovie(page: string): Promise<NextResponse<moviesObj>> {
  const data = await fetch(`${API_URL}movie/popular?page=${page}`, options);

  const movies = await data.json();

  return NextResponse.json(movies);
}

async function getTopRatedMovies(
  page: string,
): Promise<NextResponse<moviesObj>> {
  const data = await fetch(`${API_URL}movie/top_rated?page=${page}`, options);

  const movies = await data.json();

  return NextResponse.json(movies);
}

async function getUpComingMovie(
  page: string,
): Promise<NextResponse<moviesObj>> {
  const data = await fetch(`${API_URL}movie/upcoming?page=${page}`, options);

  const movies = await data.json();

  return NextResponse.json(movies);
}

async function NowPlaying(): Promise<NextResponse<moviesObj>> {
  const data = await fetch(`${API_URL}movie/now_playing`, options);

  const movies = await data.json();

  return NextResponse.json(movies);
}
interface errorObj extends Error {
  message: string;
}
export async function GET(
  req: NextRequest,
): Promise<NextResponse<moviesObj | errorObj>> {
  const page = req.nextUrl.searchParams.get("page") ?? "1";

  try {
    if (req.nextUrl.pathname === "/api/movies/popular")
      return await getPopularMovie(page);
    if (req.nextUrl.pathname === "/api/movies/upcoming")
      return await getUpComingMovie(page);
    if (req.nextUrl.pathname === "/api/movies/topRated")
      return await getTopRatedMovies(page);
    return await NowPlaying();
  } catch (error: any) {
    const err: errorObj = { ...error };
    if (error.cause.code === "ENOTFOUND")
      err.message =
        "Can't connect to Movies DataBase. Please Check you internet Connection.";
    console.error(err);

    return NextResponse.json(err, { status: 404, statusText: err.message });
  }
}
