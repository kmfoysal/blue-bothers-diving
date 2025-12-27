import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getAboutPagesData } from "@/data/about-us-loaders";

export async function generateMetadata() {
    const getOurBoatData = await getAboutPagesData("diving-day-trip");

    return {
        title: getOurBoatData?.data[0]?.meta_title || "",
        description: getOurBoatData?.data[0]?.meta_description || "",
    };
}

export default async function DivingDayTrip() {
    const getDivingDayTripData = await getAboutPagesData("diving-day-trip");

    console.log(getDivingDayTripData);

    return (
        <main>
            <SubPageBanner
                bannerContent={getDivingDayTripData?.data[0]?.page_banner}
            />
            <TourDetailContent
                overviewFeatures={getDivingDayTripData?.data[0]?.blocks[0]}
            />
            <TourGallery
                tourGallery={
                    getDivingDayTripData?.data[0]?.blocks[1]?.gallery_image
                }
            />
        </main>
    );
}
