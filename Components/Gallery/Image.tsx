"use client";
import Image from "@/Components/utils/Image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Portal from "../utils/Potal";
import Loading from "@/app/LoadingOverlay";
import { usePathname } from "next/navigation";

export default function OtherImage({
  movie,
  image,
}: {
  movie: number;
  image: string;
}): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  useEffect(() => {
    setLoading(false);
  }, [path]);
  return (
    <Link
      href={`/movie/${movie}/p${image}`}
      className="h-full w-full shadow-lg "
      onClick={() => {
        setLoading(true);
      }}
    >
      <Image
        alt="other image"
        src={image}
        className="h-full w-full"
        quality="w300"
      />
      <Portal>{loading && <Loading />}</Portal>
    </Link>
  );
}
