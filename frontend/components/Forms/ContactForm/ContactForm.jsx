export default function ContactForm() {
    return (
        <div className="lg:pl-20">
            <form className="px-3 py-8 xl:p-8 bg-neutral-50 rounded-lg shadow-[0_4px_40px_0_rgba(40,40,40,0.10)]">
                <div className="">
                    <h2 className="text-ml md:text-lg text-neutral-900 font-bold leading-ml md:leading-lg tracking-xs">
                        Send us a message
                    </h2>
                    <p className="text-2xs md:text-xs xl:text-sm leading-3xs md:leading-sm xl:leading-md text-neutral-500 tracking-md py-1 md:py-3.5 ">
                        We will get back to you quickly
                    </p>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
                        {/* First name */}
                        <div className="sm:col-span-3">
                            <fieldset className="border border-neutral-200 rounded-full">
                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                    First name:
                                </legend>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    placeholder="You First Name"
                                    className="w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs placeholder:text-neutral-300 p-4 text-neutral-900"
                                />
                            </fieldset>
                        </div>
                        {/* Last name */}
                        <div className="sm:col-span-3">
                            <fieldset className="border border-neutral-200 rounded-full">
                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                    Last name:
                                </legend>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    placeholder="You Last Name"
                                    className="w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs placeholder:text-neutral-300 p-4 text-neutral-900"
                                />
                            </fieldset>
                        </div>
                        {/* Email Address */}
                        <div className="col-span-full">
                            <fieldset className="border border-neutral-200 rounded-full">
                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                    Email address
                                </legend>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    className="w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs placeholder:text-neutral-300 p-4 text-neutral-900"
                                />
                            </fieldset>
                        </div>
                        {/* Message */}
                        <div className="col-span-full">
                            <fieldset className="border border-neutral-200 rounded-xl">
                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                    Message
                                </legend>
                                <textarea
                                    type="text"
                                    id="message"
                                    name="message"
                                    placeholder="Write your message"
                                    className="w-full focus:outline-none rounded-xl h-36 placeholder:text-xs placeholder:leading-xs placeholder:text-neutral-300 p-4 text-neutral-900 resize-none"
                                ></textarea>
                            </fieldset>
                        </div>
                    </div>

                    <div className=" pb-8">
                        <div className=" space-y-10">
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
                                                className="font-medium text-neutral-500 text-xs leading-xs"
                                            >
                                                I agree to the privacy
                                                policy.(Required)
                                            </label>
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
                <button className="text-xs sm:text-sm font-medium leading-sm rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 h-12 sm:h-[58px] text-neutral-50 bg-blue-700 flex w-full sm:w-auto sm:inline-flex justify-center sm:items-center transition-colors duration-200 hover:bg-blue-900">Submit Now</button>
            </form>
        </div>
    );
}
