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

    const singleCourseData = await getSingleCoursesData(slug);

    console.log("Single page", singleCourseData);

    return (
        <main>
            <PageHeader data={singleCourseData?.data[0]?.blocks[0]} />

            <TourGallery
                tourGallery={
                    singleCourseData?.data[0]?.blocks[1]?.gallery_image
                }
            />
            <TourDetailContent
                overviewFeatures={singleCourseData?.data[0]?.blocks[2]}
                priceCart={singleCourseData?.data[0]}
            />
        </main>
    );
}
