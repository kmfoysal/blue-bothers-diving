import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

// Global data - Header & Footer
const globalSectionQuery = qs.stringify({
    populate: {
        header: {
            populate: {
                logo: {
                    populate: {
                        image: {
                            fields: ["alternativeText", "url"],
                        },
                    },
                },

                navItems: true,
                cta: true,
            },
        },
        footer: {
            populate: {
                logo: {
                    populate: {
                        image: {
                            fields: ["alternativeText", "url"],
                        },
                    },
                },
                linkWidget: {
                    populate: {
                        navItem: true,
                    },
                },
                footerBottomLinks: true,
            },
        },
    },
});

export async function getGlobalSection() {
    const path = "/api/global";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = globalSectionQuery;

    return await fetchAPI(url.href, { method: "GET" });
}

/* * Start Home page data fetching */

// Home page data - [Banner, Slider,]
const bannerSlider = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.banner-slider": {
                    populate: {
                        button: true,
                        slideImage: {
                            fields: [
                                "url",
                                "alternativeText",
                                "width",
                                "height",
                            ],
                        },
                    },
                },
            },
        },
    },
});

export async function getHomeBanner() {
    const path = "/api/home-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = bannerSlider;

    return await fetchAPI(url.href, { method: "GET" });
}

// Home page data - [Adventures Escapes]
const advEscapesData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.adventures-escapes": {
                    populate: {
                        first_image: {
                            fields: ["alternativeText", "url"],
                        },
                        second_image: {
                            fields: ["alternativeText", "url"],
                        },
                        third_image: {
                            fields: ["alternativeText", "url"],
                        },
                        about_left_image: {
                            fields: ["alternativeText", "url"],
                        },
                        about_right_image: {
                            fields: ["alternativeText", "url"],
                        },
                        cta: true,
                        about_cta: true,
                    },
                },
            },
        },
    },
});

export async function getAdvEscapesData() {
    const path = "/api/home-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = advEscapesData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Global data - [Discover Scuba]
const discoverScubaData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.discover-scuba": {
                    populate: {
                        discover_scuba_img: {
                            populate: {
                                image: {
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

export async function getDiscoverScubaData() {
    const path = "/api/home-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = discoverScubaData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Home page data - [Underwater Adventure]
const underwaterAdvData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.underwater-adventure": {
                    populate: {
                        highlight_content: {
                            populate: {
                                cta: true,
                            },
                        },
                        right_content: {
                            populate: {
                                cta: true,
                            },
                        },
                    },
                },
            },
        },
    },
});

export async function getUnderwaterAdvData() {
    const path = "/api/home-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = underwaterAdvData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Home page data - [Home FAQ section heading]
const homeFAQSecHeadingData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.home-faq": {
                    populate: {
                        section_image: {
                            fields: ["url", "alternativeText"],
                        },
                        section_heading: {
                            populate: true,
                        },
                    },
                },
            },
        },
    },
});

export async function getHomeFAQSecHeadingData() {
    const path = "/api/home-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = homeFAQSecHeadingData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Home page data - [Home FAQ ]
const homeFAQData = qs.stringify({
    filters: {
        categories: {
            name: {
                $eqi: "home",
            },
        },
    },
    populate: {
        categories: {
            fields: ["name"],
        },
    },
    fields: ["title", "description", "priority"],
});

export async function getHomeFAQData() {
    const path = "/api/faqs";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = homeFAQData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Home page data - [Testimonial section heading]
const testimonialSectionHeadingData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.testimonial": {
                    populate: {
                        section_heading: true,
                    },
                },
            },
        },
    },
});

export async function getTestimonialsSectionHeadingData() {
    const path = "/api/home-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = testimonialSectionHeadingData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Home page data - [Testimonial data]
const testimonialsData = qs.stringify({
    filters: {
        categories: {
            name: {
                $eqi: "home",
            },
        },
    },
    populate: {
        categories: {
            fields: ["name"],
        },
    },
    fields: ["rating", "name", "content", "designation", "priority"],
});

export async function getTestimonialsData() {
    const path = "/api/testimonials";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = testimonialsData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Home page data - [Professional Courses section title]
const professionalCoursesHeading = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.professional-courses": {
                    populate: {
                        section_heading: true,
                    },
                },
            },
        },
    },
});

export async function getProfessionalCoursesHeadingData() {
    const path = "/api/home-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = professionalCoursesHeading;

    return await fetchAPI(url.href, { method: "GET" });
}

//Home page data - [Courses data]
const coursesData = qs.stringify({
    populate: {
        courses_list: {
            populate: {
                featured_image: {
                    fields: ["url", "alternativeText"],
                },
                book_now_cta: {
                    populate: true,
                },
            },
        },
    },
});

export async function getCoursesData() {
    const path = "/api/courses-collections";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = coursesData;

    return await fetchAPI(url.href, { method: "GET" });
}
/* * End Home page data fetching */

/* ******* Start Snorkeling page data fetching */

// Snorkeling page data - [Banner Slider]
const snorkelingBanner = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.banner-slider": {
                    populate: {
                        button: true,
                        slideImage: {
                            fields: [
                                "url",
                                "alternativeText",
                                "width",
                                "height",
                            ],
                        },
                    },
                },
            },
        },
    },
});

export async function getSnorkelingBanner() {
    const path = "/api/snorkeling-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = snorkelingBanner;

    return await fetchAPI(url.href, { method: "GET" });
}

// Snorkeling page data - [Courses Heading]
const snorkelingCoursesHeading = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.professional-courses": {
                    populate: {
                        section_heading: true,
                    },
                },
            },
        },
    },
});

export async function getSnorkelingCoursesHeadingData() {
    const path = "/api/snorkeling-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = snorkelingCoursesHeading;

    return await fetchAPI(url.href, { method: "GET" });
}

// Snorkeling page data - [FAQ's section heading]
const snorkelingFAQSecHeadingData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.home-faq": {
                    populate: {
                        section_image: {
                            fields: ["url", "alternativeText"],
                        },
                        section_heading: {
                            populate: true,
                        },
                    },
                },
            },
        },
    },
});

export async function getSnorkelingFAQSecHeadingData() {
    const path = "/api/snorkeling-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = snorkelingFAQSecHeadingData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Snorkeling faq data - [Home FAQ ]https://desktop.postman.com/?desktopVersion=11.70.2&userId=36134268&teamId=0&region=us
const snorkelingFAQData = qs.stringify({
    filters: {
        categories: {
            name: {
                $eqi: "snorkeling",
            },
        },
    },
    populate: {
        categories: {
            fields: ["name"],
        },
    },
    fields: ["title", "description", "priority"],
});

export async function getSnorkelingFAQData() {
    const path = "/api/faqs";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = snorkelingFAQData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Snorkeling page data - [Testimonials section heading]
const snorkelingTestimonySecHeading = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.testimonial": {
                    populate: {
                        section_heading: true,
                    },
                },
            },
        },
    },
});

export async function getSnorkelingTestimonyHeadingData() {
    const path = "/api/snorkeling-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = snorkelingTestimonySecHeading;

    return await fetchAPI(url.href, { method: "GET" });
}

// Snorkeling page data - [Testimonial data]
const snorkelingTestimonialsData = qs.stringify({
    filters: {
        categories: {
            name: {
                $eqi: "snorkeling",
            },
        },
    },
    populate: {
        categories: {
            fields: ["name"],
        },
    },
    fields: ["rating", "name", "content", "designation", "priority"],
});

export async function getSnorkelingTestimonialsData() {
    const path = "/api/testimonials";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = snorkelingTestimonialsData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Snorkeling page data - [Why choose us]
const snorkelingChooseUsData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.why-choose-us": {
                    populate: {
                        heading: true,
                        cta: true,
                        section_img: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
    },
});

export async function getSnorkelingChooseUsData() {
    const path = "/api/snorkeling-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = snorkelingChooseUsData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Snorkeling page data - [Features Data]
const snorkelingFeaturesData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.features": {
                    populate: {
                        heading: true,
                        features_card: {
                            populate: {
                                image: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                        },
                        cta: true,
                    },
                },
            },
        },
    },
});

export async function getSnorkelingFeaturesData() {
    const path = "/api/snorkeling-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = snorkelingFeaturesData;

    return await fetchAPI(url.href, { method: "GET" });
}
/* ******* End Snorkeling page data fetching */

/* ******* Start Diving page data fetching */

// Diving page data - [Banner Slider]
const divingBanner = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.banner-slider": {
                    populate: {
                        button: true,
                        slideImage: {
                            fields: [
                                "url",
                                "alternativeText",
                                "width",
                                "height",
                            ],
                        },
                    },
                },
            },
        },
    },
});

export async function getDivingBanner() {
    const path = "/api/diving-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = divingBanner;

    return await fetchAPI(url.href, { method: "GET" });
}

// Diving page data - [Courses Heading]
const divingCoursesHeading = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.professional-courses": {
                    populate: {
                        section_heading: true,
                    },
                },
            },
        },
    },
});

export async function getDivingCoursesHeadingData() {
    const path = "/api/diving-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = divingCoursesHeading;

    return await fetchAPI(url.href, { method: "GET" });
}

/* Diving page data - [Home FAQ's section heading] */
const divingFAQSecHeadingData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.home-faq": {
                    populate: {
                        section_image: {
                            fields: ["url", "alternativeText"],
                        },
                        section_heading: {
                            populate: true,
                        },
                    },
                },
            },
        },
    },
});

export async function getDivingFAQSecHeadingData() {
    const path = "/api/diving-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = divingFAQSecHeadingData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Diving faq data - [Diving FAQ ]
const divingFAQData = qs.stringify({
    filters: {
        categories: {
            name: {
                $eqi: "diving",
            },
        },
    },
    populate: {
        categories: {
            fields: ["name"],
        },
    },
    fields: ["title", "description", "priority"],
});

export async function getDivingFAQData() {
    const path = "/api/faqs";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = divingFAQData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Diving page data - [Testimonial section heading]
const divingTestimonialSecHeadingData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.testimonial": {
                    populate: {
                        section_heading: true,
                    },
                },
            },
        },
    },
});

export async function getDivingTestimonialSecHeadingData() {
    const path = "/api/diving-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = divingTestimonialSecHeadingData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Diving page data - [Testimonial data]
const divingTestimonialsData = qs.stringify({
    filters: {
        categories: {
            name: {
                $eqi: "diving",
            },
        },
    },
    populate: {
        categories: {
            fields: ["name"],
        },
    },
    fields: ["rating", "name", "content", "designation", "priority"],
});

export async function getDivingTestimonialsData() {
    const path = "/api/testimonials";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = divingTestimonialsData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Diving page data - [Why choose us]
const divingChooseUsData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.why-choose-us": {
                    populate: {
                        heading: true,
                        cta: true,
                        section_img: {
                            fields: ["url", "alternativeText"],
                        },
                    },
                },
            },
        },
    },
});

export async function getDivingChooseUsData() {
    const path = "/api/diving-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = divingChooseUsData;

    return await fetchAPI(url.href, { method: "GET" });
}

// Diving page data - [Features Data]
const divingFeaturesData = qs.stringify({
    populate: {
        blocks: {
            on: {
                "blocks.features": {
                    populate: {
                        heading: true,
                        features_card: {
                            populate: {
                                image: {
                                    fields: ["url", "alternativeText"],
                                },
                            },
                        },
                        cta: true,
                    },
                },
            },
        },
    },
});

export async function getDivingFeaturesData() {
    const path = "/api/diving-page";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = divingFeaturesData;

    return await fetchAPI(url.href, { method: "GET" });
}

/* ******* End Diving page data fetching */

// Navigation Data fetch

// Diving page data - [Features Data]
export async function getNavigationData(menuSlug = "main-menu") {
    const path = `/api/navigation/render/${menuSlug}`;
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);
    url.searchParams.append("type", "TREE");

    //
    // url.searchParams.append("fields", "id,title,order,path");

    return await fetchAPI(url.href, { method: "GET" });
}
