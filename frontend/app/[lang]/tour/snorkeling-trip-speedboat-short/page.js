import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTourPagesData } from "@/data/tour-loaders";

export async function generateMetadata() {
  const getMetaData = await getTourPagesData("snorkeling-trip-speedboat-short");

  return {
    title: getMetaData?.data[0]?.title || "",
    description: getMetaData?.data[0]?.description || "",
  };
}

export default async function SnorkelingTripSpeedboatShort() {
  const response = await getTourPagesData("snorkeling-trip-speedboat-short");
  const tourData = response?.data?.[0];

  if (!tourData) return null;

  return (
    <main>
      <SubPageBanner bannerContent={tourData.page_banner} />
      {/* ✅ FIXED */}
      <TourDetailContent
        overviewFeatures={tourData.blocks[0]}
        tourData={tourData}
      />
      <TourGallery tourGallery={tourData.blocks[1]?.gallery_image} />
    </main>
  );
}
