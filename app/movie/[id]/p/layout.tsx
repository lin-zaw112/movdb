import getEnvVar from "@/utils/getEnvVer";
import React, { type ReactNode } from "react";
import SmallImages from "./SmallImages";
interface Props {
  children: ReactNode;
  params: { id: string };
}

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
  next: { revalidate: 3600 },
};

async function fetchImages(id: string): Promise<imageObj["backdrops"]> {
  const data = await fetch(`${API_URL}movie/${id}/images`, options);

  const images: imageObj = await data.json();

  return images.backdrops;
}

export default async function layout({
  children,
  params,
}: Props): Promise<React.JSX.Element> {
  const images = await fetchImages(params.id);
  return (
    <div className="absolute left-0 top-0 z-40 h-screen w-screen overflow-hidden backdrop-blur-md">
      {children}
      <SmallImages images={images} movie={params.id} />;
    </div>
  );
}
