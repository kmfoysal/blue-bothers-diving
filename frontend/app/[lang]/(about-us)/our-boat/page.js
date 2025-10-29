import FacilitiesFleet from "@/components/FacilitiesFleet/FacilitiesFleet";
import GridImageGallery from "@/components/GridImageGallery/GridImageGallery";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

const FacilitiesFleetData = {
    title: "About the boat of Vienna",
    content:
        "At Blue Brothers Diving, your diving experience starts the moment you step on board. Our boats are custom-built for divers, offering the perfect blend of comfort, functionality, and safety — ensuring every day at sea is as enjoyable as the dives themselves.",
    imgUrl: "/images/our-boat-about-img.jpg",
    listItems: [
        {
            id: 1,
            content: "Length: 25.5m",
        },
        {
            id: 2,
            content: "Width: 6.85m",
        },
        {
            id: 3,
            content: "Crew: 4 people",
        },
        {
            id: 4,
            content: "Space for guests: 36",
        },
        {
            id: 5,
            content: "Year of manufacture: 2004",
        },
        {
            id: 6,
            content: "Crew experience: 10 - 20 years",
        },
        {
            id: 7,
            content: "Safety: 60 life jackets",
        },
    ],
    buttonLabel: "Book Now",
    buttonUrl: "/",
    isBorderBottom: true,
};

// Dynamic Metadata Generate
export async function generateMetadata() {
    const getOurBoatData = await getAboutPagesData("our-boat");

    return {
        title: getOurBoatData?.data[0]?.meta_title || "",
        description: getOurBoatData?.data[0]?.meta_description || "",
    };
}

// Page Component
export default async function OurBoatPage() {
    
    const getOurBoatData = await getAboutPagesData("our-boat");

    return (
        <main>
            <SubPageBanner
                bannerContent={getOurBoatData?.data[0]?.page_banner}
            />
            <FacilitiesFleet {...FacilitiesFleetData} />
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
