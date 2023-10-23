/**
 * @param quality quality of the image
 * @param url image path from Api
 * @returns full link of image url
 */
export default function getImageUrl(
  quality: "original" | "w300" | "w780" | "w1280",
  url: string,
): string {
  const imgPath = `${process.env.NEXT_PUBLIC_API_IMAGE_URL}${quality}${url}?resize`;
  if (url === "" || url === null) return "/placeholder.svg";
  return imgPath;
}
