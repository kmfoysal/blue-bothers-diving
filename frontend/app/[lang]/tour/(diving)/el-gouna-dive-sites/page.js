import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getAboutPagesData } from "@/data/about-us-loaders";

export async function generateMetadata() {
    const getOurBoatData = await getAboutPagesData("el-gouna-dive-sites");

    return {
        title: getOurBoatData?.data[0]?.meta_title || "",
        description: getOurBoatData?.data[0]?.meta_description || "",
    };
}

export default async function ElGounaDiveSites() {
    const getElGounaDiveData = await getAboutPagesData("el-gouna-dive-sites");

    return (
        <main>
            <SubPageBanner
                bannerContent={getElGounaDiveData?.data[0]?.page_banner}
            />
            <TourDetailContent
                overviewFeatures={getElGounaDiveData?.data[0]?.blocks[0]}
            />
            <TourGallery
                tourGallery={
                    getElGounaDiveData?.data[0]?.blocks[1]?.gallery_image
                }
            />
        </main>
    );
}
