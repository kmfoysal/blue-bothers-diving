import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

export default async function FirstAidCPRPage() {
    const getFirstAidCprData = await getTrainingPagesData("first-aid-cpr");

    return (
        <main>
            <PageHeader data={getFirstAidCprData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={
                    getFirstAidCprData?.data[0]?.blocks[1]?.gallery_image
                }
            />
            <TourDetailContent
                overviewFeatures={getFirstAidCprData?.data[0]?.blocks[2]}
            />
        </main>
    );
}
