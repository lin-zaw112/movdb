import React from "react";
import getEnvVar from "@/utils/getEnvVer";
import MainImage from "@/Components/Gallery/MainImage";
import OtherImage from "@/Components/Gallery/Image";

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
      <MainImage movie={id} image={images?.at(0)?.file_path ?? ""} />
      <blockquote className="py-4 text-center text-base">{quote}</blockquote>
      <div className="flex h-24 flex-row space-x-2 ">
        {images
          .slice(1, 6)
          .map((image, i) => (
            <OtherImage movie={id} image={image?.file_path ?? ""} key={i} />
          ))
          .slice(1)}
      </div>
    </div>
  );
}
