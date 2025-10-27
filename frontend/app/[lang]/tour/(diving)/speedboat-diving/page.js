import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TourDetailContent from "@/components/TourDetailContent/TourDetailContent";
import TourGallery from "@/components/TourGallery/TourGallery";
import { getAboutPagesData } from "@/data/about-us-loaders";


const snorkelingContent = {
    overview: {
        title: "Overview",
        content:
            "Looking for a more personalized and time-efficient diving experience? Our Speedboat Diving option is perfect for certified divers who want to explore incredible dive sites in a small group, without the full-day commitment of a regular boat trip. The speedboat gets you to the dive site quickly, giving you more time in the water and greater flexibility in your schedule. Ideal for experienced divers, early morning adventures, or anyone wanting to maximize their Red Sea exploration in less time.",
        featureList: [
            {
                id: 1,
                title: "Fast access to nearby dive sites",
                icon: "/icons/professional-guides.svg",
            },
            {
                id: 2,
                title: "Small group (max 4 divers)",
                icon: "/icons/boat-crew.svg",
            },
            {
                id: 3,
                title: "1–2 guided dives",
                icon: "/icons/equipment.svg",
            },
            {
                id: 4,
                title: "Flexible start times",
                icon: "/icons/group.svg",
            },
            {
                id: 5,
                title: "Ideal for repeat or refresher dives",
                icon: "/icons/taxes.svg",
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
        categorys: [
            {
                id: crypto.randomUUID(),
                title: "Boat trip:",
                lists: [
                    {
                        id: crypto.randomUUID(),
                        title: "Trip by boat to the snorkel reefs",
                    },
                ],
            },
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
            {
                id: crypto.randomUUID(),
                title: "Private guide",
                content:
                    "For 55 euros per day, you can book a private guide for you and your family or friends. Please report this early so that we can organize it.",
            },
        ],
    },
};

export default async function SpeedboatDiving() {
    const getSpeedboatDivingData = await getAboutPagesData("speedboat-diving");

    console.log("getSpeedboatDivingData:", getSpeedboatDivingData?.data[0]?.blocks[0]);

    return (
        <main>
            <SubPageBanner
                bannerContent={getSpeedboatDivingData?.data[0]?.page_banner}
            />
            <TourDetailContent data={snorkelingContent} overviewFeatures={getSpeedboatDivingData?.data[0]?.blocks[0]} />
            <TourGallery tourGallery={getSpeedboatDivingData?.data[0]?.blocks[1]?.gallery_image} />
        </main>
    );
}
