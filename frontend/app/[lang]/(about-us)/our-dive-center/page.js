import FacilitiesFleet from "@/components/FacilitiesFleet/FacilitiesFleet";
import GoogleMap from "@/components/GoogleMap/GoogleMap";
import GridImageGallery from "@/components/GridImageGallery/GridImageGallery";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

export async function generateMetadata() {
    const getMetaData = await getAboutPagesData("our-dive-center");

    return {
        title: getMetaData?.data[0]?.meta_title || "",
        description: getMetaData?.data[0]?.meta_description || "",
    };
}

export default async function OurDiveCenterPage() {
    // Testimonial section heading data fetch
    const getOurDiveCenterData = await getAboutPagesData("our-dive-center");


    return (
        <main>
            <SubPageBanner
                bannerContent={getOurDiveCenterData?.data[0]?.page_banner}
            />
            <FacilitiesFleet data={getOurDiveCenterData?.data[0]?.blocks[0]} />

            {/* Google Map */}
            <GoogleMap
                location={getOurDiveCenterData?.data[0]?.blocks[1]?.map_link}
            />
            {/* Gallery */}
            <section className="section-padding">
                <div className="container">
                    <GridImageGallery
                        imagesData={
                            getOurDiveCenterData?.data[0]?.blocks[2]
                                ?.gallery_image
                        }
                    />
                </div>
            </section>
        </main>
    );
}
