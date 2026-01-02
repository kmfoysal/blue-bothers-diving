import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";
import { cache } from "react";

// Shared Populate Logic for Consistency
const coursePopulateLogic = {
  populate: {
    fields: ["slug", "meta_title", "pricingMode", "currency", "type"], // Updated fields
    categories: { fields: ["name"] },
    og_image: { fields: ["url", "alternativeText"] },
    // ✅ NEW: Populate Pricing
    pricingPeriods: {
      populate: { sessionPricingTiers: true },
    },
    blocks: {
      on: {
        "blocks.sub-header": {
          populate: {
            feature_list: {
              populate: { icon: { fields: ["url", "alternativeText"] } },
            },
          },
        },
        "blocks.gallery": {
          populate: { gallery_image: { fields: ["url", "alternativeText"] } },
        },
        "blocks.features-overview": {
          populate: {
            feature_list: {
              populate: { icon: { fields: ["url", "alternativeText"] } },
            },
            package_inclusions: {
              populate: {
                feature_part: { populate: { feature: { populate: true } } },
              },
            },
            condition: {
              populate: {
                list: {
                  populate: { icon: { fields: ["url", "alternativeText"] } },
                },
              },
            },
            other_info_content: { populate: { list: { populate: true } } },
          },
        },
      },
    },
  },
};

// 1. Get All Courses
const allCoursesData = qs.stringify({
  ...coursePopulateLogic,
  // Add logic-specific sorting or filtering if needed here
});

export async function getAllCoursesData() {
  const path = "/api/courses-collections";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  url.search = allCoursesData;
  return await fetchAPI(url.href, { method: "GET" });
}

// 2. Get Single Course
export const getSingleCoursesData = cache(async (slug) => {
  const coursesQuery = qs.stringify({
    filters: { slug: { $eq: slug } },
    ...coursePopulateLogic, // Reuse populate logic
    fields: [
      "meta_title",
      "meta_description",
      "slug",
      // ❌ Removed: price, offerPrice
      // ✅ Added:
      "pricingMode",
      "currency",
      "type",
      "vatRatePercent",
      "vatIncluded",
    ],
  });

  const path = "/api/courses-collections";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  url.search = coursesQuery;

  return await fetchAPI(url.href, { method: "GET" });
});

// 3. Get Category Wise
export async function getCategoryWiseCoursesData(categoryName) {
  const categoryWiseCoursesData = qs.stringify({
    filters: {
      categories: { name: { $eqi: categoryName } },
    },
    ...coursePopulateLogic,
  });

  const path = "/api/courses-collections";
  const BASE_URL = getStrapiURL();
  const url = new URL(path, BASE_URL);
  url.search = categoryWiseCoursesData;
  return await fetchAPI(url.href, { method: "GET" });
}
