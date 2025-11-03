import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTourPagesData } from "@/data/tour-loaders";

export async function generateMetadata() {
    const getMetaData = await getTourPagesData("snorkeling-day-trip");

    return {
        title: getMetaData?.data[0]?.title || "",
        description: getMetaData?.data[0]?.description || "",
    };
}

export default async function SnorkelingDayTripPage() {
    const getSnorkelingDayTripData = await getTourPagesData(
        "snorkeling-day-trip"
    );

    console.log("Snorkeling Day Trip Data:", getSnorkelingDayTripData);

    return (
        <main>
            <SubPageBanner
                bannerContent={getSnorkelingDayTripData?.data[0]?.page_banner}
            />
            <TourDetailContent
                overviewFeatures={getSnorkelingDayTripData?.data[0]?.blocks[0]}
            />
            <TourGallery
                tourGallery={
                    getSnorkelingDayTripData?.data[0]?.blocks[1]?.gallery_image
                }
            />
        </main>
    );
}
