import BlockRendererClient from "@/components/BlockRendererClient/BlockRendererClient";
import CallToAction from "@/components/CallToAction/CallToAction";
import { StrapiImage } from "@/components/StrapiImage/StrapiImage";
import { getAboutPagesData } from "@/data/about-us-loaders";

export async function generateMetadata() {
    const getMetaData = await getAboutPagesData("shabaha-two");

    return {
        title: getMetaData?.data[0]?.meta_title || "",
        description: getMetaData?.data[0]?.meta_description || "",
    };
}

export default async function Shabaha() {
    const getShabahaTwoData = await getAboutPagesData("shabaha-two");

    const { page_banner } = getShabahaTwoData?.data[0] || {};
    const features = getShabahaTwoData?.data[0]?.blocks[0] || {};

    return (
        <div className="md:pt-28 pt-10">
            <div className=" text-neutral-950 max-w-[990px] w-full mx-auto px-4 text-center md:pb-28 pb-6">
                <h1 className=" md:text-xl text-ml font-bold leading-xl tracking-xs md:mb-3 mb-1">
                    {page_banner?.title}
                </h1>
                <p className=" text-neutral-500 text-xs md:text-sm font-medium">
                    {page_banner?.content}
                </p>
            </div>
            <div>
                <StrapiImage
                    src={page_banner?.background?.url}
                    alt="Icon"
                    width={1920}
                    height={1437}
                    className=" inline-block h-full w-full object-cover"
                />
            </div>

            <div className="md:py-28 py-7 container">
                <div className="flex flex-col md:gap-6 gap-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 mb-6 gap-8 md:gap-16">
                        {features?.content?.map((item) =>
                            item?.isDescription ? (
                                <div key={item?.id} className="col-span-2">
                                    <div className="flex items-center gap-3">
                                        <StrapiImage
                                            src={item?.icon?.url}
                                            alt={
                                                item?.icon?.alternativeText ||
                                                "Icon"
                                            }
                                            width={24}
                                            height={24}
                                            className="inline-block shrink-0"
                                        />
                                        <h4 className=" text-sm leading-md font-semiBold text-neutral-900">
                                            {item?.title}
                                        </h4>
                                    </div>
                                    {/* Divider */}
                                    <div className=" my-4 w-full h-[1px] bg-neutral-300"></div>
                                    {/* Divider */}
                                    {item?.description ? (
                                        <BlockRendererClient
                                            content={item?.description}
                                        />
                                    ) : (
                                        <p className=" text-neutral-500 text-xs leading-xs">
                                            {item?.content}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div key={item?.id} className="col-span-1">
                                    <div className="flex items-center gap-3">
                                        <StrapiImage
                                            src={item?.icon?.url}
                                            alt={
                                                item?.icon?.alternativeText ||
                                                "Icon"
                                            }
                                            width={24}
                                            height={24}
                                            className="inline-block shrink-0"
                                        />
                                        <h4 className=" text-sm leading-md font-semiBold text-neutral-900">
                                            {item?.title}
                                        </h4>
                                    </div>
                                    {/* Divider */}
                                    <div className=" my-4 w-full h-[1px] bg-neutral-300"></div>
                                    {/* Divider */}
                                    <p className=" text-neutral-500 text-xs leading-xs">
                                        {item?.content}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <CallToAction />
        </div>
    );
}
