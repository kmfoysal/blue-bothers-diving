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
                title: "Training materials:",
                list: [
                    {
                        id: crypto.randomUUID(),
                        title: "PADI Learning Materials",
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
                title: "Training materials:",
                lists: [
                    {
                        id: crypto.randomUUID(),
                        title: "PADI Learning Materials",
                    },
                ],
            },
        ],
    },
    expensesNotIncluded: {
        id: crypto.randomUUID(),
        title: "What is not included in the price",
        content: "",
        category: [
            {
                id: crypto.randomUUID(),
                title: "Diving days: ",
                lists: [
                    {
                        id: crypto.randomUUID(),
                        title: "As with all Specialties, diving days (tour on the boat) are not included",
                    },
                ],
            },
        ],
        service: [
            {
                id: crypto.randomUUID(),
                title: "Diving – Your Perfect Diving Day in El Gouna",
                currentPrice: 99,
                regularPrice: 119,
                img: "/images/service-diving-sm-img.png",
            },
        ],
    },
    conditions: {
        title: "Conditions",
        lists: [
            {
                id: crypto.randomUUID(),
                title: "Minimum age: 12 years or older",
                icon: "/icons/condition-list.svg",
            },
            {
                id: crypto.randomUUID(),
                title: "Prerequisites:  Course (Junior) Open Water Diver or equivalent certification.",
                icon: "/icons/condition-list.svg",
            },
            {
                id: crypto.randomUUID(),
                title: "Total time required: 1 Day",
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

export default async function NitroxPage() {
    const getNitroxData = await getTrainingPagesData("nitrox");

    return (
        <main>
            <PageHeader data={getNitroxData?.data[0]?.blocks[0]} />
            <TourGallery
                tourGallery={getNitroxData?.data[0]?.blocks[1]?.gallery_image}
            />
            <TourDetailContent
                overviewFeatures={getNitroxData?.data[0]?.blocks[2]}
            />
        </main>
    );
}
