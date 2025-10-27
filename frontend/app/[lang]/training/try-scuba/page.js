import FeatureContentPrice from "@/components/FeatureContentPrice/FeatureContentPrice";
import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

export async function generateMetadata() {
    const getOurBoatData = await getTrainingPagesData("try-scuba");

    return {
        title: getOurBoatData?.data[0]?.title || "",
        description: getOurBoatData?.data[0]?.description || "",
    };
}

export default async function TryScubaPage() {
    const getTryScubaData = await getTrainingPagesData("try-scuba");

    return (
        <main>
            <PageHeader data={getTryScubaData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={getTryScubaData?.data[0]?.blocks[1]?.gallery_image}
            />
            <TourDetailContent
                            overviewFeatures={getTryScubaData?.data[0]?.blocks[2]}
                        />
        </main>
    );
}
