import Image from "next/image";
import TourBookingForm from "../Forms/TourBookingForm/TourBookingForm";

export default function FeatureContentPrice({ data }) {
    return (
        <section className="section-padding">
            <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 xl:gap-16">
                <div className="col-span-full md:col-span-6 xl:col-span-7 relative before:absolute before:content-[''] before:w-full md:before:w-[1px] before:h-[1px] md:before:h-full before:left-0 md:before:left-auto md:before:-right-6 xl:before:-right-8 before:-bottom-6 md:before:top-0 before:bg-neutral-300">
                    {/* Package included */}
                    <div className="pb-6 ">
                        <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                            {data?.packageIncludes?.title || "Default Title"}
                        </h4>
                        {data?.packageIncludes?.category?.map((category) => (
                            <div key={category?.id} className="mt-4">
                                <h5 className="text-neutral-950 leading-xs font-semiBold mb-1">
                                    {category?.title || "Default Title"}
                                </h5>
                                <ul className="pl-6 flex flex-col gap-1.5">
                                    {category?.lists?.map((item) => (
                                        <li
                                            key={item?.id}
                                            className="leading-xs relative text-neutral-500 before:absolute before:content-[''] before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full before:top-1/2 before:-translate-y-1/2 before:-left-3.5"
                                        >
                                            {item?.title || "List content"}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* What is not included in the price */}
                    <div className="py-6 border-t border-neutral-100">
                        <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                            {data?.expensesNotIncluded?.title ||
                                "Default Title"}
                        </h4>
                        <div className="mt-4">
                            {data?.expensesNotIncluded?.content && (
                                <p className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500">
                                    {data?.expensesNotIncluded?.content ||
                                        "Default Content"}
                                </p>
                            )}

                            {data?.expensesNotIncluded?.category?.map(
                                (category) => (
                                    <div key={category?.id} className="mt-4">
                                        <h5 className="text-neutral-950 leading-xs font-semiBold mb-1">
                                            {category?.title || "Default Title"}
                                        </h5>
                                        <ul className="pl-6 flex flex-col gap-1.5">
                                            {category?.lists?.map((item) => (
                                                <li
                                                    key={item?.id}
                                                    className="leading-xs relative text-neutral-500 before:absolute before:content-[''] before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full before:top-1/2 before:-translate-y-1/2 before:-left-3.5"
                                                >
                                                    {item?.title ||
                                                        "List content"}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Service */}

                        {data?.expensesNotIncluded?.service?.map((item) => (
                            <div
                                key={item?.id}
                                className="flex gap-4 items-center mt-4"
                            >
                                <Image
                                    src={
                                        item?.img ||
                                        "/images/service-diving-sm-img.png"
                                    }
                                    alt="Service"
                                    width={47}
                                    height={47}
                                    className="w-[47px] h-[47px] inline-block rounded-full"
                                />
                                <div className="">
                                    <h5 className="text-xs font-semiBold leading-xs text-neutral-500">
                                        {item?.title || "Default Title."}
                                    </h5>
                                    {/* Price */}
                                    <div className="mt-1 flex gap-3 items-center">
                                        <p className="text-sm leading-md font-semiBold text-neutral-900 tracking-xs">
                                            {item?.currentPrice || "00"} €
                                        </p>
                                        <p className="text-2xs leading-3xs text-neutral-500 tracking-md font-medium mt-0.5 line-through">
                                            {item?.regularPrice || "00"} €
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Conditions */}
                    <div className="py-6 border-t border-neutral-100">
                        <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                            {data?.conditions?.title || "Default Content"}
                        </h4>
                        <div className="mt-4">
                            <ul className="flex flex-col gap-3">
                                {data?.conditions?.lists?.map((listItem) => (
                                    <li
                                        key={listItem?.id}
                                        className="flex gap-3 items-center"
                                    >
                                        <Image
                                            src={
                                                listItem?.icon ||
                                                "/icons/condition-list.svg"
                                            }
                                            alt="Icon"
                                            width={24}
                                            height={24}
                                            className="w-[22px] md:w-6 h-[22px] md:h-6 inline-block"
                                        />
                                        <span className="leading-xs text-neutral-500 ">
                                            <strong className="text-neutral-950 font-semiBold">
                                                {listItem?.title ||
                                                    "Default Title"}
                                            </strong>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Others Info */}
                    <div className=" border-t border-neutral-100 pt-6">
                        <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                            {data?.otherInfo?.title || "Default Content"}
                        </h4>
                        <div className="mt-4 flex flex-col gap-5">
                            {data?.otherInfo?.lists?.map((item) => (
                                <div key={item?.id} className="">
                                    <h5 className="text-2xs sm:text-xs font-semiBold leading-2xs sm:leading-xs text-neutral-950 mb-1.5">
                                        {item?.title || "Set Title"}
                                    </h5>
                                    <p className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500">
                                        {item?.content || "Set Content"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-full md:col-span-6 xl:col-span-5">
                    <TourBookingForm />
                </div>
            </div>
        </section>
    );
}
