"use client";

import { subscribeAction } from "@/utils/action";
import Image from "next/image";
import { useActionState } from "react";

const INITIAL_STATE = {
    zodErrors: null,
    strapiErrors: null,
    errorMessage: null,
    successMessage: null,
};

export default function CallToAction() {
    const [formState, formAction] = useActionState(
        subscribeAction,
        INITIAL_STATE
    );

    console.log(
        formState,
        "This is our form state coming from the server action"
    );

    const zodErrors = formState?.zodErrors?.email?.[0];
    const strapiErrors = formState?.strapiErrors?.[0]?.message;
    const errorMessage = strapiErrors || zodErrors || formState?.errorMessage;
    const successMessage = formState?.successMessage;

    return (
        <section className="section-padding grid grid-cols-12 items-center relative">
            <Image
                src="/images/cta-section-bg.avif"
                alt="Call to Action Image"
                fill
                className="w-full min-h-[280px] sm:h-full object-cover"
            />
            {/* Overlay */}
            <div className="before:absolute before:content-[''] before:w-full before:h-full before:inset-0 before:bg-blue-1000/70 before:z-10"></div>
            <div className="container z-10 col-span-12 md:col-span-8 xl:col-span-6 md:col-start-3 xl:col-start-4 flex flex-col justify-center">
                <div className=" ">
                    <div className="max-w-[696px] mx-auto text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-50 leading-ml sm:leading-xl tracking-xs mb-3">
                            Subscribe Our Newsletter
                        </h3>
                        <p className="text-2xs sm:text-sm leading-3xs sm:leading-md font-medium text-neutral-50 mb-6 sm:mb-12">
                            Stay updated with our latest dive trips, course
                            offers, and Red Sea news straight to your inbox.
                        </p>

                        {/* Newsletter Form */}
                        <form
                            action={formAction}
                            className="flex flex-col sm:flex-row justify-start sm:items-center gap-3 sm:gap-6"
                        >
                            <input
                                name="email"
                                type="text"
                                placeholder={
                                    errorMessage ||
                                    successMessage ||
                                    "Enter your email"
                                }
                                className={`flex-1 pl-6 pe-4 py-2 rounded-full border text-neutral-50  bg-transparent focus:outline-none focus-within:outline-none   min-h-12 sm:h-[58px] text-2xs leading-sm tracking-md font-medium ${
                                    errorMessage
                                        ? "placeholder:text-red-400 border-red-400"
                                        : successMessage
                                        ? "placeholder:text-green-300 border-green-300"
                                        : "placeholder:text-neutral-50 border-neutral-200"
                                }`}
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-neutral-50 text-blue-700 rounded-full border border-neutral-50 hover:bg-blue-700 hover:text-neutral-50 hover:border-blue-700 transition-colors duration-200 h-12 sm:h-[58px] text-xs sm:text-sm leading-sm"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
