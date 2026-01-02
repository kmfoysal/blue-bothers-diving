import { StrapiImage } from "../StrapiImage/StrapiImage";



export default function  PageHeader({ data }) {
    const { sub_title, title, description, feature_list } = data;

    console.log(data);

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
