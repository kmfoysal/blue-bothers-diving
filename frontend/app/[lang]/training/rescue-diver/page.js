import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

export async function generateMetadata() {
    const getOurBoatData = await getTrainingPagesData("rescue-diver");

    return {
        title: getOurBoatData?.data[0]?.title || "",
        description: getOurBoatData?.data[0]?.description || "",
    };
}

export default async function rescueDiverPage() {
    const getRescueDiverData = await getTrainingPagesData("rescue-diver");

    return (
        <main>
            <PageHeader data={getRescueDiverData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={
                    getRescueDiverData?.data[0]?.blocks[1]?.gallery_image
                }
            />

            <TourDetailContent
                overviewFeatures={getRescueDiverData?.data[0]?.blocks[2]}
            />
        </main>
    );
}
