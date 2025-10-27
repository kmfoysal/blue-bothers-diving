import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getSnorkelingTourPagesData } from "@/data/private-snorkeling-loaders";
export default async function SinglePrivateSnorkeling({ params }) {
    const { slug } = await params;

    const snorkelingTourPagesData = await getSnorkelingTourPagesData(slug);


    return (
        <main>
            <SubPageBanner
                bannerContent={snorkelingTourPagesData?.data[0]?.blocks[0]}
            />
            <TourDetailContent
                overviewFeatures={snorkelingTourPagesData?.data[0]?.blocks[1]}
            />
            <TourGallery
                tourGallery={
                    snorkelingTourPagesData?.data[0]?.blocks[2]?.gallery_image
                }
            />
        </main>
    );
}
