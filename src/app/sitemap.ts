import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://theibc.de";
  return [
    { url: base,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/menu`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/catering`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/branch`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
  ];
}
