import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

export async function generateMetadata() {
    const getMetaData = await getTrainingPagesData("scuba-diver");

    return {
        title: getMetaData?.data[0]?.title || "",
        description: getMetaData?.data[0]?.description || "",
    };
}

export default async function scubaDiverPage() {
    const getScubaDiverData = await getTrainingPagesData("scuba-diver");

    return (
        <>
            <PageHeader data={getScubaDiverData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={
                    getScubaDiverData?.data[0]?.blocks[1]?.gallery_image
                }
            />
            <TourDetailContent
                overviewFeatures={getScubaDiverData?.data[0]?.blocks[2]}
            />
        </>
    );
}
