import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getSingleTourData } from "@/data/single-tour-loader";
import { generateSeo } from "@/utils/seo-helper";

export async function generateMetadata({ params }) {
  const { slug, lang } = params;

  const singleTourData = await getSingleTourData(slug);

  const tour = singleTourData?.data?.[0];

  // Use the helper
  return generateSeo({
    seo: tour?.seo,
    slug: slug,
    path: "tour",
  });
}

export default async function SingleTour({ params }) {
  const { slug } = await params;
  const singleTourData = await getSingleTourData(slug);

  // Safety check
  const tourData = singleTourData?.data?.[0];

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
