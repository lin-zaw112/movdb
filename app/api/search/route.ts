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
export async function GET(req: NextRequest): Promise<NextResponse<moviesObj>> {
  const query = req.nextUrl.searchParams.get("query") ?? "";
  const data = await fetch(
    `${API_URL}search/movie?query=${query}&include_adult=false&language=en-US&page=${1}`,
    options,
  );

  const movies = await data.json();

  return NextResponse.json(movies);
}
