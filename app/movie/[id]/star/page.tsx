import React, { Suspense } from "react";
import Loading from "@/app/movie/[id]/Loading";
import getEnvVar from "@/utils/getEnvVer";
import CardXs from "@/Components/utils/CardXs";

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
const fetchStars = async (id: string): Promise<star[]> => {
  const data = await fetch(`${API_URL}movie/${id}/credits`, options);

  const starsList = await data.json();
  const stars: star[] = starsList.cast.filter(
    (star: { known_for_department: string }) =>
      star.known_for_department === "Acting",
  );

  return stars;
};

export default async function StarList(
  props: Props,
): Promise<React.JSX.Element> {
  const stars = await fetchStars(props.params.id);
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-row space-x-4 overflow-hidden overflow-x-scroll bg-neutral-100 px-16 dark:bg-neutral-900">
        {stars.slice(0, 7).map((star) => (
          <CardXs
            image={star.profile_path}
            key={star.id}
            id={star.id}
            name={star.name}
            character={star.character}
          />
        ))}
      </div>
    </Suspense>
  );
}
