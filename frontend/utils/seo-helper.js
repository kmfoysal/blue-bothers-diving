import { getStrapiURL } from "./get-strapi-url";

export function generateSeo({ seo, slug, path }) {
  // Default values (Fallback)
  const siteName = "Blue Brothers Diving";
  const defaultImage = "/images/call-to-action-img.webp";

  if (!seo) return { title: siteName };

  // Resolve Image URL
  const metaImageUrl = seo?.metaImage?.data?.attributes?.url
    ? getStrapiURL() + seo?.metaImage.data.attributes.url
    : defaultImage;

  const canonicalUrl = seo?.canonicalURL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/${seo?.canonicalURL}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/${path}/${slug || ""}`;

  return {
    title: {
      default: `${seo?.metaTitle} | ${siteName}`,
      template: `%s | ${siteName}`,
    },
    description: seo?.metaDescription,
    keywords: seo?.keywords,
    robots: seo?.metaRobots || "index, follow",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      url: canonicalUrl,
      siteName: siteName,
      images: [
        {
          url: metaImageUrl,
          width: 1200,
          height: 630,
          alt: seo?.metaTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      images: [metaImageUrl],
    },
    // Inject JSON-LD Schema if present
    other: {
      ...(seo?.structuredData && {
        "script:ld+json": JSON?.stringify(seo?.structuredData),
      }),
    },
  };
}
