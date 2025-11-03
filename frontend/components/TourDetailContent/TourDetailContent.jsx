import BlockRendererClient from "../BlockRendererClient/BlockRendererClient";
import TourBookingForm from "../Forms/TourBookingForm/TourBookingForm";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function TourDetailContent({ data, overviewFeatures }) {
    const {
        isOverview,
        feature_list,
        package_inclusions,
        condition,
        is_others_info,
        others_info_title,
        other_info_content,
        isWhatToExpect,
        what_to_expect_title,
        what_to_expect_content,
    } = overviewFeatures || {};

    return (
        <section className="section-padding">
            <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 xl:gap-16">
                <div className="col-span-full md:col-span-6 xl:col-span-7 relative before:absolute before:content-[''] before:w-full md:before:w-[1px] before:h-[1px] md:before:h-full before:left-0 md:before:left-auto md:before:-right-6 xl:before:-right-8 before:-bottom-6 md:before:top-0 before:bg-neutral-300">
                    {isOverview && (
                        <>
                            <h2 className="text-lg md:text-xl leading-ml md:leading-xl text-neutral-950 font-bold tracking-xs mb-3 md:mb-6">
                                {overviewFeatures?.title || "Default Title"}
                            </h2>
                            {overviewFeatures?.description
                                .split("\n\n")
                                .map((content, index) => (
                                    <p
                                        key={index}
                                        className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500 mb-7 last:mb-0"
                                    >
                                        {content || "Default Content"}
                                    </p>
                                ))}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-y-4 gap-x-10 my-6 md:my-8 border-b border-neutral-100 pb-6 md:pb-8">
                                {feature_list?.map((featureItem) => (
                                    <div
                                        key={featureItem?.id}
                                        className="flex gap-4 items-center"
                                    >
                                        <StrapiImage
                                            src={
                                                featureItem?.icon?.url ||
                                                "/icons/professional-guides.svg"
                                            }
                                            alt={
                                                featureItem?.icon
                                                    ?.alternativeText
                                            }
                                            width={24}
                                            height={24}
                                            className="w-[22px] md:w-6 h-[22px] md:h-6 inline-block"
                                        />
                                        <span className="text-2xs md:text-xs font-semiBold leading-2xs md:leading-xs text-neutral-950 shrink-0">
                                            {featureItem?.text ||
                                                "Default Title"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Package Inclusions */}
                    {package_inclusions &&
                        package_inclusions?.map((dataItem) => (
                            <div
                                key={dataItem?.id}
                                className="pb-6 md:pb-8 mb-8 border-b border-neutral-100"
                            >
                                <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                                    {dataItem?.main_title || "Default Title"}
                                </h4>
                                {dataItem?.feature_part?.map((featureItem) => (
                                    <div key={featureItem?.id} className="mt-4">
                                        {featureItem?.title && (
                                            <h5 className="text-neutral-950 leading-xs font-semiBold mb-1">
                                                {featureItem?.title ||
                                                    "Default Title"}
                                            </h5>
                                        )}

                                        {featureItem?.isContent ? (
                                            <>
                                                {featureItem?.content
                                                    .split("\n\n")
                                                    .map((content, index) => (
                                                        <p
                                                            key={index}
                                                            className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500 mb-7 last:mb-0"
                                                        >
                                                            {content ||
                                                                "Default Content"}
                                                        </p>
                                                    ))}
                                            </>
                                        ) : (
                                            <ul className="pl-6 flex flex-col gap-1.5">
                                                {featureItem?.feature?.map(
                                                    (item) => (
                                                        <li
                                                            key={item?.id}
                                                            className="leading-xs relative text-neutral-500 before:absolute before:content-[''] before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full before:top-1/2 before:-translate-y-1/2 before:-left-3.5"
                                                        >
                                                            {item?.text_list_item ||
                                                                "List content"}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}

                    {/* Conditions */}
                    <div className="pb-6 md:pb-8">
                        <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                            {condition?.title || "Default Content"}
                        </h4>
                        <div className="mt-4">
                            {condition?.isConditionContent ? (
                                <>
                                    <BlockRendererClient
                                        content={condition?.condition_content}
                                    />
                                </>
                            ) : (
                                <ul className="flex flex-col gap-3">
                                    {condition?.list?.map((listItem) => (
                                        <li
                                            key={listItem?.id}
                                            className="flex gap-3 items-center"
                                        >
                                            <StrapiImage
                                                src={
                                                    listItem?.icon?.url ||
                                                    "/icons/condition-list.svg"
                                                }
                                                alt={
                                                    listItem?.icon
                                                        ?.alternativeText ||
                                                    "Icon"
                                                }
                                                width={24}
                                                height={24}
                                                className="w-[22px] md:w-6 h-[22px] md:h-6 inline-block"
                                            />
                                            <span className="leading-xs text-neutral-500 flex gap-1.5">
                                                <strong className="text-neutral-950 font-semiBold">
                                                    {listItem?.sub_title ||
                                                        "Default Sub Title"}
                                                </strong>
                                                {listItem?.title ||
                                                    "Default Title"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* What to expect */}
                    {isWhatToExpect && (
                        <>
                            <div className="pb-6 md:pb-8 border-t border-neutral-100 pt-6">
                                <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                                    {what_to_expect_title || "Default Content"}
                                </h4>

                                <div className="mt-4 flex flex-col gap-2.5">
                                    <BlockRendererClient
                                        content={what_to_expect_content}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Others Info */}
                    {is_others_info && (
                        <div className=" border-t border-neutral-100 pt-6">
                            <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                                {others_info_title || "Default Content"}
                            </h4>
                            <div className="mt-4 flex flex-col gap-5">
                                {other_info_content?.map((item) => (
                                    <div key={item?.id}>
                                        <h5 className="text-2xs sm:text-xs font-semiBold leading-2xs sm:leading-xs text-neutral-950 mb-1.5">
                                            {item?.title || "Set Title"}
                                        </h5>
                                        {item?.list?.map((contentItem) => (
                                            <p
                                                key={contentItem?.id}
                                                className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500 mb-4"
                                            >
                                                {contentItem?.text_list_item ||
                                                    "Set Content"}
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-full md:col-span-6 xl:col-span-5">
                    <TourBookingForm />
                </div>
            </div>
        </section>
    );
}
