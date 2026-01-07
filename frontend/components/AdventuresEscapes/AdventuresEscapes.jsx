import BlueButton from "../Buttons/BlueButton";
import { getStrapiMedia, StrapiImage } from "../StrapiImage/StrapiImage";

export default function AdventuresEscapes({ data }) {
    return (
        <section className="section-padding">
            <div className="container flex flex-col gap-12 sm:gap-[120px]">
                <div className=" text-center">
                    <h2 className="text-lg sm:text-xl text-neutral-950 font-bold leading-ml sm:leading-xl tracking-xs mb-8 sm:mb-12 max-w-[1199px] mx-auto">
                        <span>{data?.first_title}</span>
                        <StrapiImage
                            width={72}
                            height={44}
                            src={getStrapiMedia(data?.first_image?.url)}
                            alt={
                                data?.first_image?.alternativeText ||
                                "Default alt"
                            }
                            className="max-w-full w-16 sm:w-[72px] h-auto sm:h-11 inline-block mx-2.5"
                        />
                        <span>{data?.second_title}</span>
                        <StrapiImage
                            width={72}
                            height={44}
                            src={getStrapiMedia(data?.second_image?.url)}
                            alt={
                                data?.second_image?.alternativeText ||
                                "Default alt"
                            }
                            className="max-w-full w-14 sm:w-[72px] h-auto sm:h-11 inline-block mx-2.5"
                        />
                        <span>{data?.third_title}</span>
                        <StrapiImage
                            width={72}
                            height={44}
                            src={getStrapiMedia(data?.third_image?.url)}
                            alt={
                                data?.second_image?.alternativeText ||
                                "Default alt"
                            }
                            className="max-w-full w-16 sm:w-[72px] h-auto sm:h-11 inline-block mx-2.5"
                        />
                        <span>{data?.fourth_title}</span>
                    </h2>
                    <BlueButton
                        label={data?.cta?.label}
                        href={data?.cta?.href}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 ">
                    <div className="col-span-1 sm:col-span-5 order-2 sm:order-1">
                        <StrapiImage
                            width={615}
                            height={332}
                            src={data?.about_left_image?.url}
                            alt={
                                data?.about_left_image?.alternativeText ||
                                "Default alt"
                            }
                            className="max-w-full w-full rounded-lg mb-6 sm:mb-8"
                        />
                        <p className="text-xs sm:text-sm font-medium leading-sm sm:leading-md text-neutral-500 mb-8">
                            {data?.about_content}
                        </p>
                        <BlueButton
                            label={data?.about_cta?.label}
                            href={data?.about_cta?.href}
                        />
                    </div>
                    <div className="col-span-1 sm:col-span-6 sm:col-start-7 order-1 sm:order-2">
                        <StrapiImage
                            width={785}
                            height={614}
                            src={data?.about_right_image?.url}
                            alt={
                                data?.about_right_image?.alternativeText ||
                                "Default alt"
                            }
                            className="max-w-full w-full rounded-lg mb-8"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
