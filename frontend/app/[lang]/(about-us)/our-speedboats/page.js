import FacilitiesFleet from "@/components/FacilitiesFleet/FacilitiesFleet";
import GridImageGallery from "@/components/GridImageGallery/GridImageGallery";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

const bannerContent = {
    title: "Our Speedboats",
    content:
        "At Blue Brothers Diving, your diving experience starts the moment you step on board. Our boats are custom-built for divers, offering the perfect blend of comfort.",
    image: "/images/our-speedboat-banner-bg.jpg",
};

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

const blueBrotherImages = [
    {
        id: 1,
        url: "/images/boat-blue-brother-1.jpg",
        alt: "Boat Blue Brother Image 1",
    },
    {
        id: 2,
        url: "/images/boat-blue-brother-2.jpg",
        alt: "Boat Blue Brother Image 2",
    },
    {
        id: 3,
        url: "/images/boat-blue-brother-3.jpg",
        alt: "Boat Blue Brother Image 3",
    },
    {
        id: 4,
        url: "/images/boat-blue-brother-4.jpg",
        alt: "Boat Blue Brother Image 4",
    },
    {
        id: 5,
        url: "/images/boat-blue-brother-5.jpg",
        alt: "Boat Blue Brother Image 5",
    },
    {
        id: 6,
        url: "/images/boat-blue-brother-6.jpg",
        alt: "Boat Blue Brother Image 6",
    },
    {
        id: 7,
        url: "/images/boat-blue-brother.jpg",
        alt: "Boat Blue Brother Image 7",
    },
];

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

const blueSisterImages = [
    {
        id: 1,
        url: "/images/boat-blue-sister-1.jpg",
        alt: "Boat Blue Brother Image 1",
    },
    {
        id: 2,
        url: "/images/boat-blue-sister-2.jpg",
        alt: "Boat Blue Sister Image 2",
    },
    {
        id: 3,
        url: "/images/boat-blue-sister-3.jpg",
        alt: "Boat Blue Sister Image 3",
    },
    {
        id: 4,
        url: "/images/boat-blue-sister-4.jpg",
        alt: "Boat Blue Sister Image 4",
    },
    {
        id: 5,
        url: "/images/boat-blue-sister.jpg",
        alt: "Boat Blue Sister Image 5",
    },
];

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
