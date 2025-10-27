import { BannerSlide } from "@/components/BannerSlide/BannerSlide";
import CallToAction from "@/components/CallToAction/CallToAction";
import Features from "@/components/Features/Features";
import ProfessionalCourses from "@/components/ProfessionalCourses/ProfessionalCourses";
import Questions from "@/components/Questions/Questions";
import Testimonials from "@/components/Testimonial/Testimonial";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import {
    getCoursesData,
    getDivingBanner,
    getDivingChooseUsData,
    getDivingCoursesHeadingData,
    getDivingFAQData,
    getDivingFAQSecHeadingData,
    getDivingFeaturesData,
    getDivingTestimonialsData,
    getDivingTestimonialSecHeadingData,
} from "@/data/loaders";
import { getDictionary } from "../dictionaries/dictionaries";

export default async function Diving({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    // Banner data fetch
    const divingSlider = await getDivingBanner();
    const bannerData = divingSlider.data?.blocks?.[0];

    // Professional Courses data fetch
    const getDivingCoursesHeading = await getDivingCoursesHeadingData();
    const divingCoursesHeading = getDivingCoursesHeading?.data?.blocks[0];

    // FAQ Section heading data fetch
    const getDivingFaqSecHeading = await getDivingFAQSecHeadingData();
    const divingFaqSecHeading = getDivingFaqSecHeading?.data?.blocks[0];

    // FAQ data fetch    
    const getDivingFaqData = await getDivingFAQData();
    const divingFaq = getDivingFaqData?.data?.sort((a, b) => b.priority - a.priority) || [];

    // Testimonial section heading data fetch
    const getDivingTestimonySecHeading =
        await getDivingTestimonialSecHeadingData();
    const divingTestimonySectionHeading =
        getDivingTestimonySecHeading?.data?.blocks[0];

    // Testimonial data fetch
    const getDivingTestimonials = await getDivingTestimonialsData();
    const divingTestimonials = getDivingTestimonials?.data?.sort((a, b) => b.priority - a.priority) || [];

    // Courses data fetch
    const getHomeCoursesData = await getCoursesData();
    const coursesData = getHomeCoursesData?.data[0]?.courses_list;

    // Why choose us data fetch
    const getWhyChooseUsData = await getDivingChooseUsData();
    const whyChooseUsData = getWhyChooseUsData?.data?.blocks[0];

    // Features data fetch
    const getFeaturesData = await getDivingFeaturesData();
    const featuresData = getFeaturesData?.data?.blocks[0];

    return (
        <main>
            {/* Banner component */}
            <BannerSlide data={bannerData} dict={dict} />

            <WhyChooseUs data={whyChooseUsData} />
            <Features data={featuresData} />
            <ProfessionalCourses
                data={divingCoursesHeading}
                coursesData={coursesData}
            />
            <Questions heading={divingFaqSecHeading} faqData={divingFaq} />
            <Testimonials
                heading={divingTestimonySectionHeading}
                testimonials={divingTestimonials}
            />
            <CallToAction />
        </main>
    );
}
