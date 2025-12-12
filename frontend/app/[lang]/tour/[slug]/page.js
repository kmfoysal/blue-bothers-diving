import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getSingleTourData } from "@/data/single-tour-loader";


// Dynamic Metadata
export async function generateMetadata({ params }) {
    const { slug } = await params;

    const metaData = await getSingleTourData(slug);

    return {
        title: metaData?.data[0]?.meta_title || "Set your meta title.",
        description:
            metaData?.data[0]?.meta_description || "Set your meta description",
    };
}

export default async function SingleTour({ params }) {
    const { slug } = await params;

    const singleTourData = await getSingleTourData(slug);

    return (
        <main>
            <SubPageBanner
                bannerContent={singleTourData?.data[0]?.page_banner}
            />
            <TourDetailContent
                overviewFeatures={singleTourData?.data[0]?.blocks[0]}
            />
            <TourGallery
                tourGallery={singleTourData?.data[0]?.blocks[1]?.gallery_image}
            />
        </main>
    );
}
