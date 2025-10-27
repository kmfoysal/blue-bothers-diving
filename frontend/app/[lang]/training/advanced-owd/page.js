import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

export async function generateMetadata() {
    const getOurBoatData = await getTrainingPagesData("advanced-owd");

    return {
        title: getOurBoatData?.data[0]?.title || "",
        description: getOurBoatData?.data[0]?.description || "",
    };
}

export default async function AdvancedOWDPage() {
    const getAdvancedOwdData = await getTrainingPagesData("advanced-owd");

    console.log("Advanced OWD Data:", getAdvancedOwdData?.data[0]?.blocks[2]);

    return (
        <main>
            <PageHeader data={getAdvancedOwdData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={
                    getAdvancedOwdData?.data[0]?.blocks[1]?.gallery_image
                }
            />
            <TourDetailContent
                overviewFeatures={getAdvancedOwdData?.data[0]?.blocks[2]}
            />
        </main>
    );
}
