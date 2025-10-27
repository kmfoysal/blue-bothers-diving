import BorderButton from "../Buttons/BorderButton";
import FeatureCard from "../FeatureCard/FeatureCard";

const featuresData = [
    {
        id: 1,
        icon: "/images/snorkeling-features-icon-1.svg",
        alternativeText: "features",
        title: "Small Groups & Private Tours",
        description:
            "Sail in comfort without the crowds, giving you space to explore and truly connect with the beauty of the Red Sea.",
    },
    {
        id: 2,
        icon: "/images/snorkeling-features-icon-2.svg",
        alternativeText: "features",
        title: "Expert Local Guides",
        description:
            "Our knowledgeable guides ensure a safe and enriching experience, sharing insights about the marine ecosystem.",
    },
    {
        id: 3,
        icon: "/images/snorkeling-features-icon-3.svg",
        alternativeText: "features",
        title: "Small Groups & Private Tours",
        description:
            "Sail in comfort without the crowds, giving you space to explore and truly connect with the beauty of the Red Sea.",
    },
    {
        id: 4,
        icon: "/images/snorkeling-features-icon-4.svg",
        alternativeText: "features",
        title: "Small Groups & Private Tours",
        description:
            "Sail in comfort without the crowds, giving you space to explore and truly connect with the beauty of the Red Sea.",
    },
];

export default function Features({ data }) {

    const { heading, features_card, starting_price, cta } = data;

    return (
        <section className="section-padding bg-blue-1000">
            <div className="container">
                {/* section heading */}
                <div className="text-center max-w-[918px] mx-auto">
                    <span className="text-neutral-50 text-2xs sm:text-sm font-medium leading-3xs sm:leading-md tracking-xl mb-[2px]">
                        {heading?.sub_title}
                    </span>
                    <h2 className="text-lg sm:text-xl text-neutral-50 leading-ml sm:leading-xl font-bold tracking-xs mb-[2px]">
                        {heading?.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-neutral-300 leading-sm sm:leading-md">
                        {heading?.description}
                    </p>
                </div>

                {/* Features Card */}

                <FeatureCard featuresData={features_card} />

                <div className="mt-8 sm:mt-12 flex flex-col items-center">
                    <p className="text-xs sm:text-sm font-medium text-neutral-300 leading-sm sm:leading-md mb-2.5">
                        {starting_price}
                    </p>
                    <BorderButton label={cta?.label} href={cta?.href} className="text-neutral-100 border-neutral-100 hover:bg-blue-700 hover:border-blue-700" />
                </div>
            </div>
        </section>
    );
}
