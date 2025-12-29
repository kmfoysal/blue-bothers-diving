import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

export async function getAllActivities(lang = "en") {
  // 1. Target your new custom endpoint
  const url = new URL("/api/activities", getStrapiURL());

  // 2. Pass the locale to the backend
  const query = qs.stringify({
    locale: lang,
  });
  url.search = query;

  try {
    // 3. Fetch the unified list directly
    const response = await fetchAPI(url.href, { method: "GET" });

    // 4. Return the array (The backend already formatted it perfectly)
    return response || [];
  } catch (error) {
    console.error("Error fetching activities from custom endpoint:", error);
    return [];
  }
}
