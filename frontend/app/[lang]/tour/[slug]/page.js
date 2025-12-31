import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getSingleTourData } from "@/data/single-tour-loader";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const metaData = await getSingleTourData(slug);
  return {
    title: metaData?.data[0]?.meta_title || "Tour Details",
    description: metaData?.data[0]?.meta_description || "Book your trip.",
  };
}

export default async function SingleTour({ params }) {
  const { slug } = await params;
  const singleTourData = await getSingleTourData(slug);

  // Safety check
  const tourData = singleTourData?.data?.[0];

  console.log(tourData);

  if (!tourData) return <div>Tour Not Found</div>;

  return (
    <main>
      <SubPageBanner bannerContent={tourData.page_banner} />
      {/* ✅ FIXED: Pass full 'tourData' object */}
      <TourDetailContent
        overviewFeatures={tourData.blocks[0]}
        tourData={tourData}
      />
      <TourGallery tourGallery={tourData.blocks[1]?.gallery_image} />
    </main>
  );
}
