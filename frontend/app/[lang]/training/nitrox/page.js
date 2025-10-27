import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

export async function generateMetadata() {
    const getOurBoatData = await getTrainingPagesData("nitrox");

    return {
        title: getOurBoatData?.data[0]?.title || "",
        description: getOurBoatData?.data[0]?.description || "",
    };
}

export default async function NitroxPage() {
    const getNitroxData = await getTrainingPagesData("nitrox");

    return (
        <main>
            <PageHeader data={getNitroxData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={getNitroxData?.data[0]?.blocks[1]?.gallery_image}
            />
            <TourDetailContent
                overviewFeatures={getNitroxData?.data[0]?.blocks[2]}
            />
        </main>
    );
}
