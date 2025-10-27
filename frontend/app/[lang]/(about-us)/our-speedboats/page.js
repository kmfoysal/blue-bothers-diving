import FacilitiesFleet from "@/components/FacilitiesFleet/FacilitiesFleet";
import GridImageGallery from "@/components/GridImageGallery/GridImageGallery";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

const boatBlueBrothersData = {
    isSectionImageRight: false,
    title: "About the boat of Blue Brothers 1",
    content:
        "At Blue Brothers Diving, your diving experience starts the moment you step on board. Our boats are custom-built for divers, offering the perfect blend of comfort, functionality, and safety — ensuring every day at sea is as enjoyable as the dives themselves.",
    imgUrl: "/images/boat-blue-brother-section-img.jpg",
    listItems: [
        {
            id: 1,
            content: "Length: 6.1m",
        },
        {
            id: 2,
            content: "Space for guests: up to 6",
        },
        {
            id: 3,
            content: "Year of manufacture: 2023",
        },
        {
            id: 4,
            content: "Engine: 150 Horsepower",
        },
    ],
    buttonLabel: "Book Now",
    buttonUrl: "/",
    isBorderBottom: false,
};

const boatBlueSistersData = {
    isSectionImageRight: true,
    title: "About the boat of Blue Sister",
    content:
        "At Blue Brothers Diving, your diving experience starts the moment you step on board. Our boats are custom-built for divers, offering the perfect blend of comfort, functionality, and safety — ensuring every day at sea is as enjoyable as the dives themselves.",
    imgUrl: "/images/boat-blue-sister-section-img.jpg",
    listItems: [
        {
            id: 1,
            content: "Length: 10.5m",
        },
        {
            id: 2,
            content: "Space for guests: 8 snorkelers or 7 divers (or mixed)",
        },
        {
            id: 3,
            content: "Year of manufacture: 2024",
        },
        {
            id: 4,
            content: "Engines: 2x 250 Horsepower",
        },
        {
            id: 5,
            content: "Toilet & Shower",
        },
    ],
    buttonLabel: "Book Now",
    buttonUrl: "/",
    isBorderBottom: false,
};

export async function generateMetadata() {
    const getOurBoatData = await getAboutPagesData("our-speedboats");

    return {
        title: getOurBoatData?.data[0]?.meta_title || "",
        description: getOurBoatData?.data[0]?.meta_description || "",
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
            <FacilitiesFleet {...boatBlueBrothersData} />
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
            <FacilitiesFleet {...boatBlueSistersData} />

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
