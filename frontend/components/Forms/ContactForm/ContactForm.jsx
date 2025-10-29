"use client";

import { contactFormAction } from "@/utils/contactAction";
import { useActionState } from "react";

const INITIAL_STATE = {
    zodErrors: null,
    strapiErrors: null,
    errorMessage: null,
    successMessage: null,
};

export default function ContactForm() {
    const [formState, formAction] = useActionState(
        contactFormAction,
        INITIAL_STATE
    );

    console.log(formState, "Contact form state");

    // Extract errors
    const firstNameError = formState?.zodErrors?.first_name?.[0];
    const lastNameError = formState?.zodErrors?.last_name?.[0];
    const emailError = formState?.zodErrors?.email?.[0];
    const messageError = formState?.zodErrors?.message?.[0];
    const privacyError = formState?.zodErrors?.agree_privacy_policy?.[0];
    const strapiErrors = formState?.strapiErrors?.[0]?.message;
    const errorMessage = formState?.errorMessage;
    const successMessage = formState?.successMessage;

    return (
        <div className="lg:pl-20">
            <form
                action={formAction}
                className="px-3 py-8 xl:p-8 bg-neutral-50 rounded-lg shadow-[0_4px_40px_0_rgba(40,40,40,0.10)]"
            >
                <div className="">
                    <h2 className="text-ml md:text-lg text-neutral-900 font-bold leading-ml md:leading-lg tracking-xs">
                        Send us a message
                    </h2>
                    <p className="text-2xs md:text-xs xl:text-sm leading-3xs md:leading-sm xl:leading-md text-neutral-500 tracking-md py-1 md:py-3.5 ">
                        We will get back to you quickly
                    </p>

                    {/* Error Messages Only */}
                    {(errorMessage || strapiErrors) && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                            {errorMessage || strapiErrors}
                        </div>
                    )}

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
                        {/* First name */}
                        <div className="sm:col-span-3">
                            <fieldset
                                className={`border rounded-full ${
                                    firstNameError
                                        ? "border-red-400"
                                        : "border-neutral-200"
                                }`}
                            >
                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                    First name:
                                </legend>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    placeholder="Your First Name"
                                    className={`w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs p-4 text-neutral-900 ${
                                        firstNameError
                                            ? "placeholder:text-red-400"
                                            : "placeholder:text-neutral-300"
                                    }`}
                                />
                            </fieldset>
                            {firstNameError && (
                                <p className="mt-1 text-xs text-red-500 ml-4">
                                    {firstNameError}
                                </p>
                            )}
                        </div>

                        {/* Last name */}
                        <div className="sm:col-span-3">
                            <fieldset
                                className={`border rounded-full ${
                                    lastNameError
                                        ? "border-red-400"
                                        : "border-neutral-200"
                                }`}
                            >
                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                    Last name:
                                </legend>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    placeholder="Your Last Name"
                                    className={`w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs p-4 text-neutral-900 ${
                                        lastNameError
                                            ? "placeholder:text-red-400"
                                            : "placeholder:text-neutral-300"
                                    }`}
                                />
                            </fieldset>
                            {lastNameError && (
                                <p className="mt-1 text-xs text-red-500 ml-4">
                                    {lastNameError}
                                </p>
                            )}
                        </div>

                        {/* Email Address */}
                        <div className="col-span-full">
                            <fieldset
                                className={`border rounded-full ${
                                    emailError
                                        ? "border-red-400"
                                        : "border-neutral-200"
                                }`}
                            >
                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                    Email address
                                </legend>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    className={`w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs p-4 text-neutral-900 ${
                                        emailError
                                            ? "placeholder:text-red-400"
                                            : "placeholder:text-neutral-300"
                                    }`}
                                />
                            </fieldset>
                            {emailError && (
                                <p className="mt-1 text-xs text-red-500 ml-4">
                                    {emailError}
                                </p>
                            )}
                        </div>

                        {/* Message */}
                        <div className="col-span-full">
                            <fieldset
                                className={`border rounded-xl ${
                                    messageError
                                        ? "border-red-400"
                                        : "border-neutral-200"
                                }`}
                            >
                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                    Message
                                </legend>
                                <textarea
                                    type="text"
                                    id="message"
                                    name="message"
                                    placeholder="Write your message"
                                    className={`w-full focus:outline-none rounded-xl h-36 placeholder:text-xs placeholder:leading-xs p-4 text-neutral-900 resize-none ${
                                        messageError
                                            ? "placeholder:text-red-400"
                                            : "placeholder:text-neutral-300"
                                    }`}
                                ></textarea>
                            </fieldset>
                            {messageError && (
                                <p className="mt-1 text-xs text-red-500 ml-4">
                                    {messageError}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="pb-8">
                        <div className="space-y-10">
                            <fieldset>
                                <div className="mt-6 space-y-3">
                                    <div className="flex gap-3">
                                        <div className="flex h-6 shrink-0 items-center">
                                            <div className="group grid size-4 grid-cols-1">
                                                <input
                                                    defaultChecked
                                                    id="agree_privacy_policy"
                                                    name="agree_privacy_policy"
                                                    type="checkbox"
                                                    aria-describedby="agree_privacy_policy-description"
                                                    className={`col-start-1 row-start-1 appearance-none rounded-sm border bg-neutral-900/10 checked:border-blue-700 checked:bg-blue-700 indeterminate:border-neutral-900 indeterminate:bg-blue-700 focus-visible:outline-none disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-blue-700/10 forced-colors:appearance-auto ${
                                                        privacyError
                                                            ? "border-red-400"
                                                            : "border-neutral-200"
                                                    }`}
                                                />
                                                <svg
                                                    fill="none"
                                                    viewBox="0 0 14 14"
                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-mint-500/25"
                                                >
                                                    <path
                                                        d="M3 8L6 11L11 3.5"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="opacity-0 group-has-[input:checked]:opacity-100 group-has-"
                                                    />
                                                    <path
                                                        d="M3 7H11"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="opacity-0 group-has-[input:indeterminate]:opacity-100"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="text-sm/6">
                                            <label
                                                htmlFor="agree_privacy_policy"
                                                className={`font-medium text-xs leading-xs ${
                                                    privacyError
                                                        ? "text-red-500"
                                                        : "text-neutral-500"
                                                }`}
                                            >
                                                I agree to the privacy
                                                policy.(Required)
                                            </label>
                                            {privacyError && (
                                                <p className="text-xs text-red-500 mt-1">
                                                    {privacyError}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="flex h-6 shrink-0 items-center">
                                            <div className="group grid size-4 grid-cols-1">
                                                <input
                                                    id="receive_newsletter"
                                                    name="receive_newsletter"
                                                    type="checkbox"
                                                    aria-describedby="receive_newsletter-description"
                                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-neutral-200 bg-neutral-900/10 checked:border-blue-700 checked:bg-blue-700 indeterminate:border-neutral-900 indeterminate:bg-blue-700 focus-visible:outline-none disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-blue-700/10 forced-colors:appearance-auto"
                                                />
                                                <svg
                                                    fill="none"
                                                    viewBox="0 0 14 14"
                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-mint-500/25"
                                                >
                                                    <path
                                                        d="M3 8L6 11L11 3.5"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="opacity-0 group-has-[input:checked]:opacity-100"
                                                    />
                                                    <path
                                                        d="M3 7H11"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="opacity-0 group-has-[input:indeterminate]:opacity-100"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="text-sm/6">
                                            <label
                                                htmlFor="receive_newsletter"
                                                className="font-medium text-neutral-500 text-xs leading-xs"
                                            >
                                                Receive our Newsletter
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="text-xs sm:text-sm font-medium leading-sm rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 h-12 sm:h-[58px] text-neutral-50 bg-blue-700 flex w-full sm:w-auto sm:inline-flex justify-center sm:items-center transition-colors duration-200 hover:bg-blue-900"
                >
                    Submit Now
                </button>

                {/* Success Message */}
                {successMessage && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-300 text-green-700 rounded-lg">
                        {successMessage}
                    </div>
                )}
            </form>
        </div>
    );
}
