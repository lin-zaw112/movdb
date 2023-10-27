"use client";

import Image from "@/Components/utils/Image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Portal from "../utils/Potal";
import Loading from "@/app/LoadingOverlay";
import { usePathname } from "next/navigation";

export default function MainImage({
  movie,
  image,
}: {
  movie: number;
  image: string;
}): React.JSX.Element {
  "use client";

  const [loading, setLoading] = useState(false);
  const path = usePathname();
  useEffect(() => {
    setLoading(false);
  }, [path]);
  return (
    <Link
      href={`/movie/${movie}/p${image}`}
      onClick={() => {
        setLoading(true);
      }}
    >
      <Image
        alt="main image"
        src={image}
        className="h-3/5 w-full shadow-lg "
        quality="w1280"
      />
      <Portal>{loading && <Loading />}</Portal>
    </Link>
  );
}
