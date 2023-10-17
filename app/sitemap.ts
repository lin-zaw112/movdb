import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://movdatabase.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: "https://movdatabase.vercel.app/popular",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://movdatabase.vercel.app/topRated",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://movdatabase.vercel.app/category",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
