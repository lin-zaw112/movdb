"use client";
import Loading from "@/Components/template/Loading";
import Image from "@/Components/utils/Image";
import React, { useCallback, useEffect, useState } from "react";

export default function Gallery({
  id,
  quote,
  title,
}: {
  id: number;
  quote: string;
  title: string;
}): React.JSX.Element {
  const [content, setContent] = useState(<Loading />);
  const [status, setStatus] = useState<"load" | "success" | "failed">("load");
  const [images, setImages] = useState<image[]>();

  const fetchImages = useCallback(async (): Promise<void> => {
    setStatus("load");

    const data = await fetch(`/api/movie/${id}/images`);
    const images: imageObj = await data.json();
    setStatus("success");
    setImages(images.backdrops);
  }, [id]);

  useEffect(() => {
    void fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (status === "load") setContent(<Loading />);
    if (images !== undefined) {
      setContent(
        <div className=" w-3/6">
          <Image
            src={images.at(0)?.file_path ?? ""}
            alt={title}
            className="h-3/5 w-full shadow-lg "
            quality="w1280"
          />
          <blockquote className="py-4 text-center text-base">
            {quote}
          </blockquote>
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
        </div>,
      );
    }
    if (status === "success" && images === undefined)
      setContent(<div>Failed to fetch image</div>);
  }, [images, status, quote, title]);
  return content;
}
