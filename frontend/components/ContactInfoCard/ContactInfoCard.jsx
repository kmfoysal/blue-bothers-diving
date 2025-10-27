import Image from "next/image";
import Link from "next/link";
import ContactForm from "../Forms/ContactForm/ContactForm";

export default function ContactInfoCard() {
    return (
        <section className="section-padding">
            <div className="container grid grid-cols-12 gap-6 sm:gap-8">
                <div className="col-span-full md:col-span-6 xl:col-span-5">
                    <div className="">
                        <h2 className="text-ml md:text-lg text-neutral-900 font-bold leading-ml md:leading-lg tracking-xs">
                            Get in touch
                        </h2>
                        <p className="text-xs md:text-sm leading-sm md:leading-md text-neutral-500 py-3.5 ">
                            If you have any questions about the trip or are not
                            sure which plan is right for you, contact our team
                            and let’s schedule a call. contact our team and
                            let’s schedule a call.
                        </p>

                        <ul>
                            <li className="border-t border-blue-950/80 py-6 flex gap-4">
                                <div className="shrink-0">
                                    <Image
                                        src="/images/location-icon-contact.svg"
                                        alt="Location Icon"
                                        width={52}
                                        height={52}
                                        className="w-[52px] h-[52px]"
                                    />
                                </div>
                                <div className="">
                                    <span className="text-xs leading-xs text-neutral-500 mb-1 block">
                                        Location
                                    </span>
                                    <p className="text-sm leading-md tracking-xs font-semiBold text-neutral-900">
                                        Cook's Club - El Gouna Red Sea - Egypt
                                    </p>
                                </div>
                            </li>
                            <li className="border-t border-blue-950/80 py-6 flex gap-4 group">
                                <div className="shrink-0">
                                    <Image
                                        src="/images/phone-icon-contact.svg"
                                        alt="Location Icon"
                                        width={52}
                                        height={52}
                                        className="w-[52px] h-[52px]"
                                    />
                                </div>
                                <div className="">
                                    <span className="text-xs leading-xs text-neutral-500 mb-1 block">
                                        Phone Number
                                    </span>
                                    <Link
                                        href="tel:+201066654101"
                                        className="text-sm leading-md tracking-xs font-semiBold text-neutral-900 transition-colors duration-200 hover:text-blue-700 hover:underline hover:underline-offset-4"
                                    >
                                        +20 10 666 54 101
                                    </Link>
                                </div>
                            </li>
                            <li className="border-t border-blue-950/80 py-6 flex gap-4 group">
                                <div className="shrink-0">
                                    <Image
                                        src="/images/email-icon-contact.svg"
                                        alt="Location Icon"
                                        width={52}
                                        height={52}
                                        className="w-[52px] h-[52px]"
                                    />
                                </div>
                                <div className="">
                                    <span className="text-xs leading-xs text-neutral-500 mb-1 block">
                                        Email
                                    </span>
                                    <Link
                                        href="mailto:basis@bluebrothersdiving.de"
                                        className="text-sm leading-md tracking-xs font-semiBold text-neutral-900 transition-colors duration-200 hover:text-blue-700 hover:underline hover:underline-offset-4"
                                    >
                                        basis@bluebrothersdiving.de
                                    </Link>
                                </div>
                            </li>
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
