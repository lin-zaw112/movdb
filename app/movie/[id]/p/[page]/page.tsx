import getImageUrl from "@/utils/getImageUrl";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import OriginalPhoto from "./OriginalPhoto";

interface Props {
  params: { id: string; page: string };
}

export default function page({ params }: Props): React.JSX.Element {
  return (
    <Fragment>
      <Link
        href={`/movie/${params.id}`}
        className="absolute top-0 z-30 h-full w-full scale-150"
      >
        <div className={`relative h-full w-full blur-sm`}>
          <Image
            src={getImageUrl("w300", `/${params.page}?lqip`)}
            alt="backdrop"
            fill
            sizes="300px"
            quality={30}
            priority
            unoptimized
            className="object-cover object-center"
          />
        </div>
      </Link>
      <div className="absolute left-1/2 top-1/2 z-40 h-5/6 w-10/12 -translate-x-1/2 -translate-y-1/2">
        <Link
          href={`/movie/${params.id}`}
          className="absolute z-50 m-1 rounded-full bg-neutral-700/30 p-2 text-sm backdrop-blur-lg"
        >
          <XMarkIcon className=" h-5 w-5 text-neutral-50" />
        </Link>
        <OriginalPhoto image={params.page} />
      </div>
    </Fragment>
  );
}
