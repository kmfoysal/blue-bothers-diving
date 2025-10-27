import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

export default async function Wreck() {
    const getWreckData = await getTrainingPagesData("wreck");

    return (
        <main>
            <PageHeader data={getWreckData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={getWreckData?.data[0]?.blocks[1]?.gallery_image}
            />

            <TourDetailContent
                overviewFeatures={getWreckData?.data[0]?.blocks[2]}
            />
        </main>
    );
}
