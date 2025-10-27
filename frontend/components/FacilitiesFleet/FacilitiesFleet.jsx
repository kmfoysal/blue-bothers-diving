import Image from "next/image";
import BlueButton from "../Buttons/BlueButton";

export default function FacilitiesFleet({
    isSectionImageRight,
    title,
    content,
    imgUrl,
    listItems,
    buttonLabel,
    buttonUrl,
    isBorderBottom,
}) {
    return (
        <section>
            <div className="container section-padding grid grid-cols-1 md:grid-cols-12 items-center gap-6 sm:gap-8 md:gap-0">
                <div className={`md:col-span-6 ${isSectionImageRight ? "order-1 md:order-2" : "order-1"}`}>
                    <Image
                        src={imgUrl || "/images/dive-center-facility-img.jpg"}
                        alt={title || "Dive Center Facility"}
                        width={500}
                        height={300}
                        quality={60}
                        className="object-cover w-full rounded-lg"
                    />
                </div>
                <div className={`md:col-span-6 ${isSectionImageRight ? "order-2 md:order-1 md:pl-0 md:pe-20" : "order-2 md:pl-20"}`}>
                    <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-ml sm:leading-xl tracking-xs mb-6 md:mb-8">
                        {title || "Title"}
                    </h2>
                    <p className="text-xs md:text-sm leading-sm md:leading-md text-neutral-500 mb-4">
                        {content || "Content"}
                    </p>

                    <ul className="text-xs md:text-sm leading-sm md:leading-md font-medium text-neutral-500 mt-4 md:mt-8 flex flex-col gap-1 md:gap-2 pl-6 md:pl-8">
                        {listItems?.map((item) => (
                            <li
                                key={item.id}
                                className="relative before:absolute before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-neutral-500 before:-left-4 before:top-1/2 before:-translate-y-1/2"
                            >
                                {item.content}
                            </li>
                        ))}
                    </ul>

                    <BlueButton
                        label={buttonLabel || "Button Label"}
                        href={buttonUrl || "/"}
                        className="mt-6 md:mt-8"
                    />
                </div>
            </div>

            {isBorderBottom ? (
                <div className="container">
                    <div className="border-b border-neutral-200"></div>
                </div>
            ) : null}
        </section>
    );
}
