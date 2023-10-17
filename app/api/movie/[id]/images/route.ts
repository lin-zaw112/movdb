import "server-only";
import { type NextRequest, NextResponse } from "next/server";
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

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
): Promise<imageObj | any> {
  try {
    const movieId = context.params.id;

    const data = await fetch(`${API_URL}movie/${movieId}/images`, options);

    const images: imageObj = await data.json();

    return NextResponse.json({ backdrops: images.backdrops.slice(0, 5) });
  } catch (error) {
    console.log(error);
  }
}
