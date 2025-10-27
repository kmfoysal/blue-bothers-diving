import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getAboutPagesData } from "@/data/about-us-loaders";

export default async function DivingDayTrip() {
    const getDivingDayTripData = await getAboutPagesData("diving-day-trip");

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
