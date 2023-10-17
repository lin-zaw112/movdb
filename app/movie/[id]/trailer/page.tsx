import Loading from "@/app/movie/[id]/Loading";
import React, { Suspense } from "react";
import YouTubeFrame from "@/Components/utils/YouTubeFrame";
import getEnvVar from "@/utils/getEnvVer";

interface Props {
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
};

const fetchVideos = async (id: string): Promise<videos> => {
  const data = await fetch(`${API_URL}movie/${id}/videos`, options);
  const videos: videos = await data.json();
  return videos;
};

const Trailer = async function (props: Props): Promise<React.JSX.Element> {
  const videos = await fetchVideos(props.params.id);

  return (
    <div className="flex h-72 flex-row space-x-4 overflow-y-hidden overflow-x-scroll bg-neutral-100 p-5 dark:bg-neutral-900">
      <Suspense fallback={<Loading />}>
        {videos.results.map((video) => (
          <YouTubeFrame
            key={video.id}
            video={video.key}
            width="24rem"
            height="100%"
            className="relative h-60 w-96 flex-none cursor-pointer"
            thumbnailQuality="hqdefault"
          />
        ))}
      </Suspense>
    </div>
  );
};

export default Trailer;
