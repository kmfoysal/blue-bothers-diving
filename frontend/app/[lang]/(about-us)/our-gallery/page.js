import OurGallery from "@/components/OurGallery/OurGallery";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

export default async function OurGalleryPage() {
    const getOurGalleryData = await getAboutPagesData("our-gallery");

    return (
        <main>
            <SubPageBanner
                bannerContent={getOurGalleryData?.data[0]?.page_banner}
            />

            {/* Gallery Section */}
            <OurGallery ourGallery={getOurGalleryData?.data[0]?.blocks[0]?.gallery_image} />
        </main>
    );
}
