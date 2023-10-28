"use client";
import Image from "next/image";
import getImageUrl from "@/utils/getImageUrl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useSpring, motion } from "framer-motion";
interface Props {
  movie: string;
  images: image[];
}
export default function SmallImages({
  images,
  movie,
}: Props): React.JSX.Element {
  const path = usePathname();
  const x = useSpring(0);
  const imageWidth = 68;
  useEffect(() => {
    const activeImg = images.findIndex(
      (image) => path === `/movie/${movie}/p${image.file_path}`,
    );
    const halfwindow = window.innerWidth / 2;
    x.set(halfwindow - imageWidth * (activeImg + 1));
  }, [path]);

  return (
    <div className="absolute bottom-0 z-40 h-28 w-screen translate-y-1/2 justify-center overflow-scroll">
      <motion.div
        style={{ x }}
        className="absolute flex h-12 w-screen translate-x-1/2 flex-row flex-nowrap space-x-1"
      >
        {images.map((el, i) => {
          const link = `/movie/${movie}/p${el.file_path}`;
          return (
            <Link href={link} key={i} replace scroll={false}>
              <div
                className={`relative h-12 w-16 cursor-pointer overflow-hidden shadow-lg  ${
                  path === link
                    ? "ring ring-indigo-950"
                    : "ring-indigo-600 hover:ring"
                }`}
              >
                <Image
                  src={getImageUrl("w300", el.file_path)}
                  alt={""}
                  fill
                  sizes="(max-width: 640px) 100vw,
        (max-width: 1280px) 50vw,
        (max-width: 1536px) 33vw,
        25vw"
                  unoptimized
                  className="object-cover object-top text-center"
                />
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
