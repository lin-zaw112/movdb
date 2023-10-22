import getEnvVar from "@/utils/getEnvVer";
import Image from "@/Components/utils/Image";
import React, { type ReactNode } from "react";
import Link from "next/link";
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
    <div className="absolute left-0 top-0 z-40 h-screen w-screen backdrop-blur-md">
      {children}
      <div className="absolute bottom-0 z-40 h-20 w-screen translate-y-1/3 justify-center overflow-scroll">
        <div className="absolute flex h-12 w-fit flex-row flex-nowrap">
          {images.map((el, i) => {
            return (
              <Link
                href={`/movie/${params.id}/p${el.file_path}`}
                key={i}
                prefetch
                replace
                scroll={false}
              >
                <Image
                  src={el.file_path}
                  quality="w300"
                  className="h-12 w-16 cursor-pointer rounded-none shadow-lg hover:-translate-y-1 hover:scale-y-105"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
