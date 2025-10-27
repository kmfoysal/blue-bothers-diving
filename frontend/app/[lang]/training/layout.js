import Testimonials from "@/components/Testimonial/Testimonial";
import { getTestimonialsData } from "@/data/loaders";

export default async function TrainingLayout({ children }) {

    // Testimonial data fetch
    const getTestimonials = await getTestimonialsData();
    const testimonialsData =
        getTestimonials?.data?.sort((a, b) => b.priority - a.priority) || [];

    return (
        <section>
            {children}
            <Testimonials testimonials={testimonialsData} sectionBgColor="bg-blue-50" cardBg="bg-white" />
        </section>
    );
}
