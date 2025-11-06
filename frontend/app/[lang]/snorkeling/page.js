import { BannerSlide } from "@/components/BannerSlide/BannerSlide";
import CallToAction from "@/components/CallToAction/CallToAction";
import Features from "@/components/Features/Features";
import Questions from "@/components/Questions/Questions";
import Testimonials from "@/components/Testimonial/Testimonial";
import ToursActivities from "@/components/ToursActivities/ToursActivities";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import { getCategoryWiseCoursesData } from "@/data/courses-loaders";
import {
    getSnorkelingBanner,
    getSnorkelingChooseUsData,
    getSnorkelingCoursesHeadingData,
    getSnorkelingFAQData,
    getSnorkelingFAQSecHeadingData,
    getSnorkelingFeaturesData,
    getSnorkelingTestimonialsData,
    getSnorkelingTestimonyHeadingData,
} from "@/data/loaders";
import { getDictionary } from "../dictionaries/dictionaries";

export default async function Snorkeling({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    // Banner data fetch
    const snorkelingSlider = await getSnorkelingBanner();
    const bannerData = snorkelingSlider.data?.blocks?.[0];

    // Professional Courses data fetch
    const getSnorkelingCoursesHeading = await getSnorkelingCoursesHeadingData();
    const snorkelingCoursesHeading =
        getSnorkelingCoursesHeading?.data?.blocks[0];

    // FAQ section heading data fetch
    const getSnorkelingFaqSecHeading = await getSnorkelingFAQSecHeadingData();
    const snorkelingFaqSecHeadingData =
        getSnorkelingFaqSecHeading?.data?.blocks[0];

    // FAQ data fetch
    const getSnorkelingFaqData = await getSnorkelingFAQData();
    const snorkelingFaq =
        getSnorkelingFaqData?.data?.sort((a, b) => b.priority - a.priority) ||
        [];

    // Testimonial Section Heading data fetch
    const getSnorkelingTestimonySecHeading =
        await getSnorkelingTestimonyHeadingData();
    const testimonialSecHeading =
        getSnorkelingTestimonySecHeading?.data?.blocks[0];

    // Testimonial data fetch
    const getSnorkelingTestimonials = await getSnorkelingTestimonialsData();
    const snorkelingTestimonials =
        getSnorkelingTestimonials?.data?.sort(
            (a, b) => b.priority - a.priority
        ) || [];

    // Diving Courses data fetch
    const getSnorkelingCoursesData = await getCategoryWiseCoursesData(
        "snorkeling"
    );
    const coursesData = getSnorkelingCoursesData?.data;

    // Why choose us data fetch
    const getWhyChooseUsData = await getSnorkelingChooseUsData();
    const whyChooseUsData = getWhyChooseUsData?.data?.blocks[0];

    // Features data fetch
    const getFeaturesData = await getSnorkelingFeaturesData();
    const featuresData = getFeaturesData?.data?.blocks[0];

    return (
        <main>
            {/* Banner component */}
            <BannerSlide data={bannerData} dict={dict} />

            <WhyChooseUs data={whyChooseUsData} />
            <Features data={featuresData} />
            <ToursActivities
                data={snorkelingCoursesHeading}
                coursesData={coursesData}
            />
            <Questions
                heading={snorkelingFaqSecHeadingData}
                faqData={snorkelingFaq}
            />
            <Testimonials
                heading={testimonialSecHeading}
                testimonials={snorkelingTestimonials}
            />
            <CallToAction />
        </main>
    );
}
