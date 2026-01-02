import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

export async function getTourPagesData(slug) {
  const aboutPagesQuery = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    categories: { fields: ["name"] },
    populate: {
      page_banner: {
        populate: {
          background: {
            fields: ["url", "alternativeText"],
          },
        },
      },
      // ✅ NEW: Populate the pricing periods and nested tiers
      pricingPeriods: {
        populate: {
          sessionPricingTiers: true,
        },
      },
      blocks: {
        on: {
          "blocks.about-content": {
            populate: true,
          },
          "blocks.features-overview": {
            populate: {
              feature_list: {
                populate: {
                  icon: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
              package_inclusions: {
                populate: {
                  feature_part: {
                    populate: {
                      feature: {
                        populate: true,
                      },
                    },
                  },
                },
              },
              condition: {
                populate: {
                  list: {
                    populate: {
                      icon: {
                        fields: ["url", "alternativeText"],
                      },
                    },
                  },
                },
              },
              other_info_content: {
                populate: {
                  list: {
                    populate: true,
                  },
                },
              },
            },
          },
          "blocks.gallery": {
            populate: {
              gallery_image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          "blocks.map": {
            populate: true,
          },
        },
      },
    },
    fields: [
      "title",
      "description",
      "slug",
      // ❌ REMOVED: "price", "offer_price" (They no longer exist)
      // ✅ ADDED: New Pricing Fields
      "pricingMode",
      "currency",
      "vatRatePercent",
      "vatIncluded",
      "duration",
    ],
  });

  const path = "/api/tours";
  const BASE_URL = getStrapiURL();

  const url = new URL(path, BASE_URL);

  url.search = aboutPagesQuery;

  return await fetchAPI(url.href, { method: "GET" });
}
