import Image from "next/image";
import BlueButton from "../Buttons/BlueButton";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function WhyChooseUs({ data }) {
    const { cta, heading, section_img } = data;

    return (
        <section className="section-padding">
            <div className="container grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="col-span-1 md:col-span-5">
                    {/* section heading */}
                    <div className="mx-auto">
                        <span className="text-blue-700 text-2xs sm:text-sm font-medium leading-3xs sm:leading-md tracking-xl mb-[2px]">
                            {heading?.sub_title}
                        </span>
                        <h2 className="text-lg sm:text-xl text-neutral-950 leading-ml sm:leading-xl font-bold tracking-xs mb-2">
                            {heading?.title}
                        </h2>
                        <div className="text-xs sm:text-sm font-medium text-neutral-500 leading-sm sm:leading-md">
                            {/* <span
                                dangerouslySetInnerHTML={{
                                    __html: heading?.description,
                                }}
                            /> */}

                            {heading?.description.split("\n").map((line, i) => (
                                <p key={i} className="mb-8 last:mb-0">
                                    {line}
                                </p>
                            ))}
                        </div>

                        <div className="mt-6 sm:mt-8 flex ">
                            <BlueButton label={cta?.label} href={cta?.href} />
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-6 md:col-start-7 bg-white">
                    <StrapiImage
                        src={section_img?.url}
                        alt={section_img?.alternativeText || "Why Choose Us"}
                        width={743}
                        height={614}
                        className="w-full rounded-lg"
                    />
                </div>
            </div>
        </section>
    );
}
