import PageHeader from "@/components/PageHeader/PageHeader";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getTrainingPagesData } from "@/data/training-loaders";

const snorkelingContent = {
    overview: {
        title: "Overview",
        content:
            "The underwater world is not only for divers. On the contrary, especially the upper parts of the reef are full of life. Thanks to the good incidence of light and ample opportunities to hide, you will find here many of the inhabitants of the Red Sea and colorful corals. The Red Sea is one of the most biodiverse seas in the world, with more than 3300 species, of which about 10% are endemic, that is, only found here in the Red Sea. The water temperature is pleasant all year round between 22-27° C, and never drops below 19° C even in winter.",
        featureList: [
            {
                id: 1,
                title: "Professional snorkel guides",
                icon: "/icons/professional-guides.svg",
            },
            {
                id: 2,
                title: "Experienced boat's crew",
                icon: "/icons/boat-crew.svg",
            },
            {
                id: 3,
                title: "Rental equipment included",
                icon: "/icons/equipment.svg",
            },
            {
                id: 4,
                title: "Small groups",
                icon: "/icons/group.svg",
            },
            {
                id: 5,
                title: "All fees and taxes included",
                icon: "/icons/taxes.svg",
            },
            {
                id: 6,
                title: "Transfer from hotel and back",
                icon: "/icons/car.svg",
            },
        ],
    },
    yourBenefits: {
        title: "What is included in the price",
        benefitsList: [
            {
                id: crypto.randomUUID(),
                title: "Boat trip:",
                list: [
                    {
                        id: crypto.randomUUID(),
                        title: "Snorkeling trip in the Red Sea",
                    },
                ],
            },
            {
                id: crypto.randomUUID(),
                title: "Rental equipment:",
                list: [
                    {
                        id: crypto.randomUUID(),
                        title: "Mask, snorkel, wetsuit, fins – everything you need",
                    },
                ],
            },
            {
                id: crypto.randomUUID(),
                title: "Transportation: ",
                list: [
                    {
                        id: crypto.randomUUID(),
                        title: "Round trip from the hotel (within El Gouna).",
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "Port and boat fees",
                    },
                ],
            },
        ],
    },
    packageIncludes: {
        title: "What is included in the price",
        category: [
            {
                id: crypto.randomUUID(),
                title: "Rental equipment:",
                lists: [
                    {
                        id: crypto.randomUUID(),
                        title: "Mask, snorkel, wetsuit, fins – everything you need",
                    },
                ],
            },
            {
                id: crypto.randomUUID(),
                title: "Transportation:",
                lists: [
                    {
                        id: crypto.randomUUID(),
                        title: "Round trip from the hotel (within El Gouna).",
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "Port and boat fees",
                    },
                ],
            },
        ],
    },
    expensesNotIncluded: {
        id: crypto.randomUUID(),
        title: "What is not included in the price",
        content:
            "Lunch and drinks are paid daily on the boat. Our crew on the boat strives daily to cook us excellent food. Through direct billing, the chefs can purchase more flexibly and the earnings go directly to the crew.",
    },
    conditions: {
        title: "Conditions",
        lists: [
            {
                id: crypto.randomUUID(),
                title: "Minimum age: 10 years or older",
                icon: "/icons/condition-list.svg",
            },
            {
                id: crypto.randomUUID(),
                title: "Prerequisites: You must be able to swim",
                icon: "/icons/condition-list.svg",
            },
            {
                id: crypto.randomUUID(),
                title: "Total time required: 1 day",
                icon: "/icons/condition-list.svg",
            },
        ],
    },
    otherInfo: {
        title: "Other info",
        lists: [
            {
                id: crypto.randomUUID(),
                title: "Times",
                content:
                    "We always start at 8 o’clock in the morning and are back at the hotel at 5 o’clock at the latest.",
            },
        ],
    },
};

export async function generateMetadata() {
    const getOurBoatData = await getTrainingPagesData("open-water-diver");

    return {
        title: getOurBoatData?.data[0]?.title || "",
        description: getOurBoatData?.data[0]?.description || "",
    };
}

export default async function OpenWaterDiverPage() {
    const getOpenWaterDriveData = await getTrainingPagesData(
        "open-water-diver"
    );

    return (
        <main>
            <PageHeader data={getOpenWaterDriveData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={
                    getOpenWaterDriveData?.data[0]?.blocks[1]?.gallery_image
                }
            />

            <TourDetailContent
                data={snorkelingContent}
                overviewFeatures={getOpenWaterDriveData?.data[0]?.blocks[2]}
            />
        </main>
    );
}
