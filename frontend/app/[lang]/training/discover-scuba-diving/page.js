import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

export async function generateMetadata() {
    const getMetaData = await getTrainingPagesData("discover-scuba-diving");

    return {
        title: getMetaData?.data[0]?.title || "",
        description: getMetaData?.data[0]?.description || "",
    };
}

export default async function DiscoverScubaDivingPage() {
    const getDiscoverScubaDivingData = await getTrainingPagesData(
        "discover-scuba-diving"
    );

    return (
        <>
            <PageHeader data={getDiscoverScubaDivingData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={
                    getDiscoverScubaDivingData?.data[0]?.blocks[1]
                        ?.gallery_image
                }
            />
            <TourDetailContent
                overviewFeatures={
                    getDiscoverScubaDivingData?.data[0]?.blocks[2]
                }
            />
        </>
    );
}
