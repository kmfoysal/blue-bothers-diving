import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";
import { cache } from "react";

// Global data - Header & Footer
const teamMembersQuery = qs.stringify({
    populate: {
        image: {
            fields: ["url", "alternativeText"],
        },
        languages: {
            fields: ["language"],
        },
        social_link: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
            },
            fields: ["label", "href", "isExternal"],
        },
        fields: ["name", "designation"],
    },
});

export async function getTeamMembers() {
    const path = "/api/team-members";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = teamMembersQuery;

    return await fetchAPI(url.href, { method: "GET" });
}

// About pages Data fetching functionality .......
export const getAboutPagesData = cache(async (slug) => {
    const aboutPagesQuery = qs.stringify({
        filters: {
            slug: {
                $eq: slug,
            },
        },
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
        fields: ["meta_title", "meta_description", "slug"],
    });

    const path = "/api/pages";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = aboutPagesQuery;

    return await fetchAPI(url.href, { method: "GET" });
});
