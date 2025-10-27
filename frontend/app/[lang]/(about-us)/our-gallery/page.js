import OurGallery from "@/components/OurGallery/OurGallery";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

// Dynamic Metadata Generate
export async function generateMetadata() {
    const getOurBoatData = await getAboutPagesData("our-gallery");

    return {
        title: getOurBoatData?.data[0]?.meta_title || "",
        description: getOurBoatData?.data[0]?.meta_description || "",
    };
}

export default async function OurGalleryPage() {
    const getOurGalleryData = await getAboutPagesData("our-gallery");

    return (
        <main>
            <SubPageBanner
                bannerContent={getOurGalleryData?.data[0]?.page_banner}
            />

            {/* Gallery Section */}
            <OurGallery
                ourGallery={
                    getOurGalleryData?.data[0]?.blocks[0]?.gallery_image
                }
            />
        </main>
    );
}
