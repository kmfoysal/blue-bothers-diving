import FacilitiesFleet from "@/components/FacilitiesFleet/FacilitiesFleet";
import GridImageGallery from "@/components/GridImageGallery/GridImageGallery";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

export async function generateMetadata() {
    const getMetaData = await getAboutPagesData("our-speedboats");

    return {
        title: getMetaData?.data[0]?.meta_title || "",
        description: getMetaData?.data[0]?.meta_description || "",
    };
}

export default async function OurSpeedboatsPage() {
    const getOurSpeedboatsData = await getAboutPagesData("our-speedboats");

    return (
        <main>
            <SubPageBanner
                bannerContent={getOurSpeedboatsData?.data[0]?.page_banner}
            />
            {/* Boat of Blue Brothers */}
            <FacilitiesFleet data={getOurSpeedboatsData?.data[0]?.blocks[0]} />
            {/* Gallery of Blue Brothers */}
            <div className="container pb-12 md:pb-[120px]">
                <GridImageGallery
                    imagesData={
                        getOurSpeedboatsData?.data[0]?.blocks[1]?.gallery_image
                    }
                />
            </div>

            {/* Divider */}
            <div className="container">
                <div className="border-b border-neutral-200"></div>
            </div>
            {/* Divider */}

            {/* Boat of Blue Sisters */}
            <FacilitiesFleet data={getOurSpeedboatsData?.data[0]?.blocks[2]} />

            {/* Gallery of Blue Brothers */}
            <div className="container pb-12 md:pb-[120px]">
                <GridImageGallery
                    imagesData={
                        getOurSpeedboatsData?.data[0]?.blocks[3]?.gallery_image
                    }
                />
            </div>
        </main>
    );
}
