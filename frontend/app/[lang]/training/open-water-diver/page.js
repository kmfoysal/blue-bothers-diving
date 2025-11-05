import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

export async function generateMetadata() {
    const getMetaData = await getTrainingPagesData("open-water-diver");

    return {
        title: getMetaData?.data[0]?.title || "",
        description: getMetaData?.data[0]?.description || "",
    };
}

export default async function OpenWaterDiverPage() {
    const getOpenWaterDriveData = await getTrainingPagesData(
        "open-water-diver"
    );

    return (
        <main>
            <PageHeader data={getOpenWaterDriveData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={
                    getOpenWaterDriveData?.data[0]?.blocks[1]?.gallery_image
                }
            />

            <TourDetailContent
                overviewFeatures={getOpenWaterDriveData?.data[0]?.blocks[2]}
            />
        </main>
    );
}
