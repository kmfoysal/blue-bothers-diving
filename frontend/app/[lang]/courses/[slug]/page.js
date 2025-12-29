import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getSingleCoursesData } from "@/data/courses-loaders";

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const metaData = await getSingleCoursesData(slug);

  return {
    title: metaData?.data[0]?.meta_title || "Set your meta title.",
    description:
      metaData?.data[0]?.meta_description || "Set your meta description",
  };
}

export default async function SingleCourse({ params }) {
  const { slug } = await params;

  // 1. Fetch the data (Ensure your loader fetches 'pricingMode' & 'pricingPeriods')
  const singleCourseData = await getSingleCoursesData(slug);

  // 2. Extract the course object for cleaner access
  const courseData = singleCourseData?.data?.[0];

  // 3. Safety Check
  if (!courseData) {
    return <div className="container py-20 text-center">Course Not Found</div>;
  }

  return (
    <main>
      {/* Header Block */}
      <PageHeader data={courseData.blocks?.[0]} />

      {/* Gallery Block */}
      <TourGallery tourGallery={courseData.blocks?.[1]?.gallery_image} />

      {/* Content & Booking Block 
               ✅ UPDATE: Pass 'tourData' prop instead of 'priceCart'.
               This passes the pricing logic to the Booking Form.
            */}
      <TourDetailContent
        overviewFeatures={courseData.blocks?.[2]}
        tourData={courseData}
      />
    </main>
  );
}
