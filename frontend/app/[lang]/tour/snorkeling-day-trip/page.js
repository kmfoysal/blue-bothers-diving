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

  // Safety check to ensure data exists
  const tourData = getSnorkelingDayTripData?.data?.[0];

  if (!tourData) {
    return <div>Tour not found</div>; // Handle missing data gracefully
  }
  
  console.log("tourData:",tourData);

  return (
    <main>
      <SubPageBanner bannerContent={tourData.page_banner} />
      {/* ✅ UPDATE: Pass the FULL tourData object.
               The Booking Form inside this component needs 'pricingPeriods', 'pricingMode', etc.
            */}
      <TourDetailContent
        overviewFeatures={tourData.blocks[0]}
        tourData={tourData}
      />
      <TourGallery tourGallery={tourData.blocks[1]?.gallery_image} />
    </main>
  );
}
