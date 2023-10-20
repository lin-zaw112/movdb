import Image from "@/Components/utils/Image";
import React from "react";
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

async function fetchImages(id: number): Promise<imageObj["backdrops"]> {
  const data = await fetch(`${API_URL}movie/${id}/images`, options);

  const images: imageObj = await data.json();

  return images.backdrops.slice(0, 5);
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
      <Image
        src={images.at(0)?.file_path ?? ""}
        alt={title}
        className="h-3/5 w-full shadow-lg "
        quality="w1280"
      />
      <blockquote className="py-4 text-center text-base">{quote}</blockquote>
      <div className="flex h-24 flex-row space-x-2 ">
        {images
          .map((image, i) => (
            <Image
              key={i}
              src={image.file_path ?? ""}
              alt={title}
              className="h-full w-full shadow-lg "
              quality="w300"
            />
          ))
          .slice(1)}
      </div>
    </div>
  );
}
