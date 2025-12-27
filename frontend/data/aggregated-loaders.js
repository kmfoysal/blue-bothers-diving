import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

export async function getAllActivities(lang = "en") {
    
    // 1. QUERY FOR TOURS
    // Tours usually have 'title' and 'categories'
    const tourQuery = qs.stringify({
        locale: lang,
        populate: {
            page_banner: { 
                populate: { background: { fields: ["url", "alternativeText"] } } 
            },
            categories: { fields: ["name", "slug"] }, // ✅ Keep categories for Tours
            pricingPeriods: { 
                populate: { sessionPricingTiers: true } 
            },
        },
        fields: ["title", "slug", "pricingMode", "currency"], 
        pagination: { limit: 100 },
    });

    // 2. QUERY FOR COURSES
    // ⚠️ REMOVED 'categories' from populate to fix the 400 Error
    // ⚠️ REMOVED 'fields' restriction to fix the 'title' Error
    const courseQuery = qs.stringify({
        locale: lang,
        populate: {
            page_banner: { 
                populate: { background: { fields: ["url", "alternativeText"] } } 
            },
            // ❌ categories removed here
            pricingPeriods: { 
                populate: { sessionPricingTiers: true } 
            },
        },
        pagination: { limit: 100 },
    });

    // 3. Define Endpoints
    const tourUrl = new URL("/api/tours", getStrapiURL());
    // ⚠️ Double check if this is "courses" or "courses-collections" in your Strapi
    const courseUrl = new URL("/api/courses", getStrapiURL()); 

    tourUrl.search = tourQuery;
    courseUrl.search = courseQuery;

    console.log(tourUrl);

    try {
        const [toursRes, coursesRes] = await Promise.all([
            fetchAPI(tourUrl.href, { method: "GET" }),
            fetchAPI(courseUrl.href, { method: "GET" })
        ]);

        // 4. Normalize TOURS
        const tours = (toursRes?.data || []).map(item => ({
            ...item,
            id: item.id,
            title: item.title || "Untitled Tour",
            categories: item.categories || [], // Use actual categories
            type: "tour",
            link: `/tours/${item.slug}`, 
            startingPrice: item.pricingPeriods?.[0]?.pricePerParticipant || 0
        }));

        // 5. Normalize COURSES
        const courses = (coursesRes?.data || []).map(item => ({
            ...item,
            id: item.id,
            // Fallback for title/name
            title: item.title || item.name || "Untitled Course",
            // ⚠️ Manually assign a "Course" category since the DB doesn't have it
            categories: [{ name: "PADI Course", slug: "padi-course" }], 
            type: "course",
            link: `/courses/${item.slug}`, 
            startingPrice: item.pricingPeriods?.[0]?.pricePerParticipant || 0
        }));

        return [...tours, ...courses];

    } catch (error) {
        console.error("Error fetching aggregated activities:", error);
        return [];
    }
}