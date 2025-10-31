import FacilitiesFleet from "@/components/FacilitiesFleet/FacilitiesFleet";
import GridImageGallery from "@/components/GridImageGallery/GridImageGallery";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

// Dynamic Metadata Generate
export async function generateMetadata() {
    const getMetaData = await getAboutPagesData("our-boat");

    return {
        title: getMetaData?.data[0]?.meta_title || "",
        description: getMetaData?.data[0]?.meta_description || "",
    };
}

// Page Component
export default async function OurBoatPage() {
    
    const getOurBoatData = await getAboutPagesData("our-boat");
    console.log("FacilitiesFleet:", getOurBoatData?.data[0]?.blocks[0]);

    return (
        <main>
            <SubPageBanner
                bannerContent={getOurBoatData?.data[0]?.page_banner}
            />
            <FacilitiesFleet data={getOurBoatData?.data[0]?.blocks[0]} />
            <section className="section-padding container">
                <GridImageGallery
                    imagesData={
                        getOurBoatData?.data[0]?.blocks[1]?.gallery_image
                    }
                />
            </section>
        </main>
    );
}
