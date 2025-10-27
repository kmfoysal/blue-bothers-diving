import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function FeatureCard({ featuresData }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 mt-6 sm:mt-12">
            {featuresData?.map((feature) => (
                <div
                    key={feature?.id}
                    className="col-span-1 sm:col-span-6 md:col-span-4 xl:col-span-3 bg-white rounded-lg px-7 pt-7 pb-8"
                >
                    <StrapiImage
                        src={feature?.image?.url}
                        alt={feature?.image?.alternativeText || "Feature Icon"}
                        width={96}
                        height={96}
                    />
                    <h3 className="text-md sm:text-ml text-neutral-900 font-semiBold leading-sm sm:leading-ml tracking-xs mb-5 mt-12">
                        {feature?.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-neutral-500 leading-sm sm:leading-md">
                        {feature?.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
