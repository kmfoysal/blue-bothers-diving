import FacilitiesFleet from "@/components/FacilitiesFleet/FacilitiesFleet";
import GoogleMap from "@/components/GoogleMap/GoogleMap";
import GridImageGallery from "@/components/GridImageGallery/GridImageGallery";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

const FacilitiesFleetData = {
    isSectionImageRight: true,
    title: "About the Facility",
    content:
        "Since 1997, our dive center has been a trusted name in the diving community. With spacious indoor classrooms, secure equipment storage, and direct beach access, we’re built to support divers of every level.",
    imgUrl: "/images/dive-center-facility-img.jpg",
    listItems: [
        {
            id: 1,
            content:
                "Fully air-conditioned classrooms with multimedia equipment",
        },
        {
            id: 2,
            content: "Clean changing rooms, hot showers, and personal lockers",
        },
        {
            id: 3,
            content: "Freshwater rinse tanks and equipment drying area",
        },
        {
            id: 4,
            content: "Comfortable outdoor lounge area",
        },
        {
            id: 5,
            content: "Free Wi-Fi access",
        },
        {
            id: 6,
            content: "On-site retail corner with diving essentials",
        },
        {
            id: 7,
            content: "Nitrox available for certified divers",
        },
    ],
    buttonLabel: "Learn More",
    buttonUrl: "/",
    isBorderBottom: false,
};

export async function generateMetadata() {
    const getOurBoatData = await getAboutPagesData("our-dive-center");

    return {
        title: getOurBoatData?.data[0]?.meta_title || "",
        description: getOurBoatData?.data[0]?.meta_description || "",
    };
}

export default async function OurDiveCenterPage() {
    // Testimonial section heading data fetch
    const getOurDiveCenterData = await getAboutPagesData("our-dive-center");

    const filterContent =
        getOurDiveCenterData?.data[0]?.blocks[2]?.gallery_image;

    return (
        <main>
            <SubPageBanner
                bannerContent={getOurDiveCenterData?.data[0]?.page_banner}
            />
            <FacilitiesFleet {...FacilitiesFleetData} />

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
