import React, { type ReactNode } from "react";
import Nav from "./nav";
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

async function getGenres(): Promise<genre[]> {
  const data = await fetch(`${API_URL}genre/movie/list`, options);

  const { genres } = await data.json();

  return genres;
}

export default async function Layout({
  children,
}: {
  children: ReactNode;
}): Promise<React.JSX.Element> {
  const genres = await getGenres();

  return (
    <div className="flex h-screen w-screen flex-row overflow-hidden ">
      <Nav items={genres} />

      {children}
    </div>
  );
}
