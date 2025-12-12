import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";
import { cache } from "react";

// Courses Data fetching functionality .......
export const getSingleTourData = cache(async (slug) => {
    const tourQuery = qs.stringify({
        filters: {
            slug: {
                $eq: slug,
            },
        },
        fields: [
            "title",
            "description",
            "slug",
            "price",
            "offer_price",
            "duration",
        ],
        populate: {
            page_banner: {
                populate: {
                    background: {
                        fields: ["url", "alternativeText"],
                    },
                },
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

    const path = "/api/tours";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = tourQuery;

    return await fetchAPI(url.href, { method: "GET" });
});
