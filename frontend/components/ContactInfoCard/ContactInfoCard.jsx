import Link from "next/link";
import ContactForm from "../Forms/ContactForm/ContactForm";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function ContactInfoCard({ contactInfo }) {
    const { title, description, info_item } = contactInfo || {};

    console.log("Contact Info Items:", info_item);

    return (
        <section className="section-padding">
            <div className="container grid grid-cols-12 gap-6 sm:gap-8">
                <div className="col-span-full md:col-span-6 xl:col-span-5">
                    <div className="">
                        <h2 className="text-ml md:text-lg text-neutral-900 font-bold leading-ml md:leading-lg tracking-xs">
                            {title}
                        </h2>
                        <p className="text-xs md:text-sm leading-sm md:leading-md text-neutral-500 py-3.5 ">
                            {description}
                        </p>

                        <ul>
                            {info_item?.map((item) => (
                                <li
                                    key={item.id}
                                    className="border-t border-blue-950/80 py-6 flex gap-4 group"
                                >
                                    <div className="shrink-0">
                                        <StrapiImage
                                            src={item.icon?.url}
                                            alt={
                                                item.icon?.alternativeText ||
                                                "Contact Icon"
                                            }
                                            width={52}
                                            height={52}
                                            className="w-[52px] h-[52px]"
                                        />
                                    </div>
                                    <div className="">
                                        <span className="text-xs leading-xs text-neutral-500 mb-1 block">
                                            {item?.label}
                                        </span>
                                        {item?.isLink ? (
                                            <Link
                                                href={item?.info_link[0]?.href}
                                                className="text-sm leading-md tracking-xs font-semiBold text-neutral-900 transition-colors duration-200 hover:text-blue-700 hover:underline hover:underline-offset-4"
                                            >
                                                {item?.info}
                                            </Link>
                                        ) : (
                                            <p className="text-sm leading-md tracking-xs font-semiBold text-neutral-900">
                                                {item?.info}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-full md:col-span-6 xl:col-span-7">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
