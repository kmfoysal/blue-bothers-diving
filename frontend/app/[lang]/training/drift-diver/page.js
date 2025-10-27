import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

export default async function DriftDiverPage() {
    const getDriftDiverData = await getTrainingPagesData("drift-diver");

    return (
        <main>
            <PageHeader data={getDriftDiverData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={
                    getDriftDiverData?.data[0]?.blocks[1]?.gallery_image
                }
            />

            <TourDetailContent
                overviewFeatures={getDriftDiverData?.data[0]?.blocks[2]}
            />
        </main>
    );
}
