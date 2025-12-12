import AdventuresEscapes from "@/components/AdventuresEscapes/AdventuresEscapes";
import { BannerSlide } from "@/components/BannerSlide/BannerSlide";
import CallToAction from "@/components/CallToAction/CallToAction";
import DiscoverScuba from "@/components/DiscoverScuba/DiscoverScuba";
import Questions from "@/components/Questions/Questions";
import Testimonials from "@/components/Testimonial/Testimonial";
import UnderwaterAdventure from "@/components/UnderwaterAdventure/UnderwaterAdventure";
import {
  getAdvEscapesData,
  getDiscoverScubaData,
  getHomeBanner,
  getHomeFAQData,
  getHomeFAQSecHeadingData,
  getProfessionalCoursesHeadingData,
  getTestimonialsData,
  getTestimonialsSectionHeadingData,
  getUnderwaterAdvData,
} from "@/data/loaders";
import { getDictionary } from "./dictionaries/dictionaries";

// Main component
export default async function Home({ params }) {
  const awaitedParams = await params;

   const lang = awaitedParams?.lang ?? "en";

  const dict = await getDictionary(lang);

  // Banner data fetch
  const bannerSlider = await getHomeBanner(lang);
  const bannerData = bannerSlider.data?.blocks?.[0];

  console.log(lang);

  // Adventures Escapes data fetch
  const advEscapes = await getAdvEscapesData();
  const advEscapesData = advEscapes.data?.blocks?.[0];

  // Discover Scuba data fetch
  const getDiscoverScuba = await getDiscoverScubaData();
  const discoverScubaData =
    getDiscoverScuba.data?.blocks?.[0]?.discover_scuba_img;

  // Underwater Adventure data fetch
  const getUnderwaterAdv = await getUnderwaterAdvData();
  const underwaterAdvData = getUnderwaterAdv?.data?.blocks[0];

  // FAQ section heading fetch
  const getHomeFaqSecHeading = await getHomeFAQSecHeadingData();
  const homeFaqSecHeadingData = getHomeFaqSecHeading?.data?.blocks[0];

  // FAQ data fetch
  const homeFaqResponse = await getHomeFAQData();
  const homeFaq =
    homeFaqResponse?.data?.sort((a, b) => b.priority - a.priority) || [];

  // Testimonial section heading data fetch
  const getTestimonialSecHeading = await getTestimonialsSectionHeadingData();
  const testimonialSecHeadingData = getTestimonialSecHeading?.data?.blocks[0];

  // Testimonial data fetch
  const getTestimonials = await getTestimonialsData();
  const testimonialsData =
    getTestimonials?.data?.sort((a, b) => b.priority - a.priority) || [];

  // Professional Courses data fetch
  const getProfessionalCourses = await getProfessionalCoursesHeadingData();
  const professionalCoursesHeading = getProfessionalCourses?.data?.blocks[0];

  // Courses data fetch
  // const getHomeCoursesData = await getCoursesData();
  // const coursesData = getHomeCoursesData?.data[0]?.courses_list;

  return (
    <section className="home-section">
      {/* Banner component */}
      <BannerSlide data={bannerData} dict={dict} />
      <AdventuresEscapes data={advEscapesData} />
      <DiscoverScuba data={discoverScubaData} />
      <UnderwaterAdventure data={underwaterAdvData} />
      {/* <ProfessionalCourses
                data={professionalCoursesHeading}
                coursesData={coursesData}
            /> */}
      <Questions heading={homeFaqSecHeadingData} faqData={homeFaq} />
      <Testimonials
        heading={testimonialSecHeadingData}
        testimonials={testimonialsData}
      />
      <CallToAction />
    </section>
  );
}
