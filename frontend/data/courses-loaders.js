import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";
import { cache } from "react";

// All Courses Data fetching functionality .......
const allCoursesData = qs.stringify({
    populate: {
        fields: ["slug", "price", "meta_title"],
        categories: {
            fields: ["name"],
        },
        og_image: {
            fields: ["url", "alternativeText"],
        },
        blocks: {
            on: {
                "blocks.sub-header": {
                    populate: {
                        feature_list: {
                            populate: {
                                icon: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                        },
                    },
                },
            },
        },
    },
});

export async function getAllCoursesData() {
    const path = "/api/courses-collections";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = allCoursesData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Courses Data fetching functionality .......
export const getSingleCoursesData = cache(async (slug) => {
    const coursesQuery = qs.stringify({
        filters: {
            slug: {
                $eq: slug,
            },
        },
        fields: ["meta_title", "meta_description", "slug", "price"],
        populate: {
            blocks: {
                on: {
                    "blocks.sub-header": {
                        populate: {
                            feature_list: {
                                populate: {
                                    icon: {
                                        fields: ["url", "alternativeText"],
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
                                                fields: [
                                                    "url",
                                                    "alternativeText",
                                                ],
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
                },
            },
        },
    });

    const path = "/api/courses-collections";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = coursesQuery;

    return await fetchAPI(url.href, { method: "GET" });
});


// Get category wise fetching courses
export async function getCategoryWiseCoursesData(categoryName) {
    const categoryWiseCoursesData = qs.stringify({
        filters: {
            categories: {
                name: {
                    $eqi: categoryName, // Dynamic parameter
                },
            },
        },
        populate: {
            fields: ["slug", "price", "meta_title"],
            categories: {
                fields: ["name"],
            },
            og_image: {
                fields: ["url", "alternativeText"],
            },
            blocks: {
                on: {
                    "blocks.sub-header": {
                        populate: {
                            feature_list: {
                                populate: {
                                    icon: {
                                        fields: ["url", "alternativeText"],
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    const path = "/api/courses-collections";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = categoryWiseCoursesData;

    return await fetchAPI(url.href, { method: "GET" });
}
