import BlockRendererClient from "../BlockRendererClient/BlockRendererClient";
import BlueButton from "../Buttons/BlueButton";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function FacilitiesFleet({ data }) {
    const { content, section_image, title, is_right, cta, isBorderBottom } =
        data;

    console.log("FacilitiesFleet data:", data);

    return (
        <section>
            <div className="container section-padding grid grid-cols-1 md:grid-cols-12 items-center gap-6 sm:gap-8 md:gap-0">
                <div
                    className={`md:col-span-6 ${
                        is_right ? "order-1 md:order-2" : "order-1"
                    }`}
                >
                    <StrapiImage
                        src={section_image?.url}
                        alt={section_image?.alternativeText}
                        width={500}
                        height={300}
                        quality={60}
                        className="object-cover w-full rounded-lg"
                    />
                </div>
                <div
                    className={`md:col-span-6 ${
                        is_right
                            ? "order-2 md:order-1 md:pl-0 md:pe-20"
                            : "order-2 md:pl-20"
                    }`}
                >
                    <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-ml sm:leading-xl tracking-xs mb-6 md:mb-8">
                        {title || "Title"}
                    </h2>

                    <BlockRendererClient content={content} />

                    <BlueButton
                        label={cta?.label}
                        href={cta?.href}
                        className="mt-6 md:mt-8"
                    />
                </div>
            </div>
            {isBorderBottom && (
                <div className="container">
                    <div className="border-b border-neutral-200"></div>
                </div>
            )}
        </section>
    );
}
