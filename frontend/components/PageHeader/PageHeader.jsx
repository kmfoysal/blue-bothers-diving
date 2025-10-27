import Image from "next/image";
import { StrapiImage } from "../StrapiImage/StrapiImage";

const titleAndFeatureData = {
    subTitle: "Try Scuba",
    title: "PADI Try Scuba Diving – Safe, Fun, and Unforgettable",
    featureContent:
        "Want to find out what diving is like before you decide to get your PADI Open Water Diver certification? A Discover Scuba® Diving experience is your first time diving in a pool or calm water environment.",
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
};

export default function  PageHeader({ data }) {
    const { sub_title, title, description, feature_list } = data;

    return (
        <section className="section-padding">
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                    <div className="">
                        <span className="text-2xs md:text-xs leading-sm text-neutral-900 py-1.5 px-3 md:px-4 rounded-sm bg-blue-50 mb-2 inline-flex">
                            {sub_title || "Default Sub Title"}
                        </span>
                        <h1 className="text-ml md:text-lg xl:text-xl text-neutral-900 leading-ml sm:leading-xl font-bold tracking-xs">
                            {title || "Default Title"}
                        </h1>
                    </div>
                </div>
                <div className="col-span-1">
                    {description.split("\n\n").map((content, index) => (
                        <p key={index} className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500 mb-7 last:mb-0">
                            {content || "Default Content"}
                        </p>
                    ))}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-y-6 gap-x-10 mt-6 md:mt-8">
                        {feature_list?.map((featureItem) => (
                            <div
                                key={featureItem?.id}
                                className="flex gap-4 items-center max-w-full"
                            >
                                <StrapiImage
                                    src={
                                        featureItem?.icon?.url ||
                                        "/icons/professional-guides.svg"
                                    }
                                    alt="Icon"
                                    width={24}
                                    height={24}
                                    className="w-[22px] md:w-6 h-[22px] md:h-6 inline-block"
                                />
                                <span className="text-2xs md:text-xs font-semiBold leading-2xs md:leading-xs text-neutral-950 shrink-0 max-w-full">
                                    {featureItem?.text || "Default Title"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
