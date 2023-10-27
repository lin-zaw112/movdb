import Image from "@/Components/utils/Image";
import React from "react";
import getEnvVar from "@/utils/getEnvVer";
import Link from "next/link";
// import Portal from "@/Components/utils/Potal";

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

async function fetchImages(id: number): Promise<imageObj["backdrops"]> {
  const data = await fetch(`${API_URL}movie/${id}/images`, options);

  const images: imageObj = await data.json();

  return images.backdrops;
}

export default async function Gallery({
  id,
  quote,
  title,
}: {
  id: number;
  quote: string;
  title: string;
}): Promise<React.JSX.Element> {
  const images = await fetchImages(id);
  return (
    <div className=" w-3/6">
      <Link href={`/movie/${id}/p${images.at(0)?.file_path ?? ""}`}>
        <Image
          src={images.at(0)?.file_path ?? ""}
          className="h-3/5 w-full shadow-lg "
          quality="w1280"
        />
      </Link>
      <blockquote className="py-4 text-center text-base">{quote}</blockquote>
      <div className="flex h-24 flex-row space-x-2 ">
        {images
          .slice(1, 6)
          .map((image, i) => (
            <Link
              href={`/movie/${id}/p${image.file_path ?? ""}`}
              key={i}
              className="h-full w-full shadow-lg "
            >
              <Image
                src={image.file_path ?? ""}
                className="h-full w-full"
                quality="w300"
              />
            </Link>
          ))
          .slice(1)}
      </div>
    </div>
  );
}
