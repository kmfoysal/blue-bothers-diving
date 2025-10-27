import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTourPagesData } from "@/data/tour-loaders";

export async function generateMetadata() {
    const getOurBoatData = await getTourPagesData(
        "snorkeling-trip-speedboat-short"
    );

    return {
        title: getOurBoatData?.data[0]?.meta_title || "",
        description: getOurBoatData?.data[0]?.meta_description || "",
    };
}

export default async function SnorkelingTripSpeedboatShort() {
    const getSnorkelingTripSpeedboatShortData = await getTourPagesData(
        "snorkeling-trip-speedboat-short"
    );

    return (
        <main>
            <SubPageBanner
                bannerContent={
                    getSnorkelingTripSpeedboatShortData?.data[0]?.page_banner
                }
            />
            <TourDetailContent
                overviewFeatures={
                    getSnorkelingTripSpeedboatShortData?.data[0]?.blocks[0]
                }
            />
            <TourGallery
                tourGallery={
                    getSnorkelingTripSpeedboatShortData?.data[0]?.blocks[1]
                        ?.gallery_image
                }
            />
        </main>
    );
}
