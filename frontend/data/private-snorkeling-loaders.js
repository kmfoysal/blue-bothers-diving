import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

export async function getSnorkelingTourPagesData(slug) {
    const aboutPagesQuery = qs.stringify({
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: {
            blocks: {
                on: {
                    "blocks.sub-banner": {
                        populate: {
                            background: {
                                fields: ["url", "alternativeText"],
                            },
                        },
                    },
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
            "name",
            "description",
            "slug",
            "excerpt",
            "price",
            "offer_price",
            "duration",
        ],
    });

    const path = "/api/private-snorkeling-collections";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = aboutPagesQuery;

    return await fetchAPI(url.href, { method: "GET" });
}

// New function to get private snorkeling card data
export async function getPrivateSnorkelingCardData() {
    const aboutPagesQuery = qs.stringify({
        populate: {
            blocks: {
                on: {
                    "blocks.sub-banner": {
                        populate: {
                            background: {
                                fields: ["url", "alternativeText"],
                            },
                        },
                    },
                },
            },
        },
    });

    const path = "/api/private-snorkeling-collections";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = aboutPagesQuery;

    return await fetchAPI(url.href, { method: "GET" });
}

// const privateSnorkelingCardData = qs.stringify({
//     populate: {
//         blocks: {
//             on: {
//                 "blocks.sub-banner": {
//                     populate: {
//                         background: {
//                             fields: ["url", "alternativeText"],
//                         },
//                     },
//                 },
//             },
//         },
//     },
// });

// export async function getPrivateSnorkelingCardData() {
//     const path = "/api/private-snorkeling-collections";
//     const BASE_URL = getStrapiURL();

//     const url = new URL(path, BASE_URL);

//     url.search = privateSnorkelingCardData;

//     return await fetchAPI(url.href, { method: "GET" });
// }
