"use client";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";

export default function Testimonials({
    sectionBgColor,
    cardBg,
    heading = {},
    testimonials = [],
}) {
    const { section_heading } = heading;
    // const { reviews } = testimonials;

    return (
        <>
            <section
                className={`section-padding ${
                    sectionBgColor ? sectionBgColor : "bg-white"
                }`}
            >
                <div className="container">
                    {/* section heading */}

                    <div className="text-center max-w-[918px] mx-auto">
                        <span className="text-blue-700 text-2xs sm:text-sm font-medium leading-3xs sm:leading-md tracking-xl mb-[2px]">
                            {section_heading?.sub_title || "Testimonials"}
                        </span>
                        <h2 className="text-lg sm:text-xl text-neutral-950 leading-ml sm:leading-xl font-bold tracking-xs">
                            {section_heading?.title || "What Our Guests Say"}
                        </h2>
                    </div>

                    {/* testimonials card */}
                    <div className="mt-6 sm:mt-12 grid grid-cols-12 pb-[72px] sm:pb-0">
                        <div className="col-span-12 sm:col-span-10 sm:col-start-2 relative testimonial-slider">
                            {/* Custom Navigation Buttons */}
                            <div className="swiper-button-prev custom-nav-btn">
                                <svg
                                    width="20"
                                    height="21"
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13 5.5C13 5.5 8.00001 9.18242 8 10.5C7.99999 11.8177 13 15.5 13 15.5"
                                        stroke="#E0E0E0"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="swiper-button-next custom-nav-btn">
                                <svg
                                    width="20"
                                    height="21"
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.00005 5.5C8.00005 5.5 13 9.18242 13 10.5C13 11.8177 8 15.5 8 15.5"
                                        stroke="#E0E0E0"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <Swiper
                                modules={[Autoplay, Navigation]}
                                spaceBetween={24}
                                speed={1200}
                                loop={true}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                className="overflow-hidden"
                            >
                                {testimonials.map((item) => (
                                    <SwiperSlide key={item?.id}>
                                        <div
                                            className={`py-6 sm:py-12 px-3 sm:px-16 rounded-md relative text-center ${
                                                cardBg ? cardBg : "bg-blue-50"
                                            }`}
                                        >
                                            <Image
                                                src="/images/quote-icon.svg"
                                                alt="Testimonial"
                                                width={55}
                                                height={52}
                                                className="object-cover rounded-md absolute top-3 sm:top-12 left-3 sm:left-16 w-9 sm:w-14"
                                            />

                                            {/* Star Rating */}
                                            <div className="flex justify-center items-center gap-2 mb-3 sm:mb-6">
                                                {/* Rating number */}
                                                <span className="text-sm font-medium leading-md">
                                                    {item?.rating}
                                                </span>
                                                {/* Rating stars */}
                                                {Array.from(
                                                    { length: 5 },
                                                    (_, index) => index + 1
                                                ).map((starNumber) => (
                                                    <svg
                                                        key={starNumber}
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`${
                                                            starNumber <=
                                                            Math.round(
                                                                item?.rating
                                                            )
                                                                ? "text-yellow-200" // Filled stars
                                                                : "text-yellow-200/40"
                                                        } w-5 sm:w-6`}
                                                    >
                                                        <path
                                                            d="M23.2243 8.45108L16.0296 7.35612L12.8133 0.528203C12.7255 0.341259 12.581 0.189923 12.4024 0.0979342C11.9547 -0.133521 11.4106 0.0593584 11.1868 0.528203L7.97055 7.35612L0.77582 8.45108C0.577461 8.48076 0.396105 8.57868 0.257255 8.72705C0.0893918 8.90772 -0.0031083 9.15079 7.97568e-05 9.40284C0.00326781 9.6549 0.101883 9.89531 0.274257 10.0713L5.47974 15.3858L4.24992 22.8903C4.22108 23.0649 4.23953 23.2444 4.30317 23.4086C4.36681 23.5727 4.47311 23.7149 4.60999 23.819C4.74688 23.9231 4.90889 23.985 5.07764 23.9976C5.24639 24.0102 5.41514 23.973 5.56475 23.8903L12.0001 20.3473L18.4354 23.8903C18.6111 23.9882 18.8151 24.0209 19.0106 23.9853C19.5037 23.8962 19.8352 23.4066 19.7502 22.8903L18.5204 15.3858L23.7259 10.0713C23.8675 9.92587 23.9611 9.73595 23.9894 9.52824C24.0659 9.00895 23.7202 8.52823 23.2243 8.45108V8.45108Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                ))}
                                            </div>

                                            <p className="text-neutral-900 text-md sm:text-ml leading-[30px] sm:leading-ml font-semiBold tracking-xs mb-6 sm:mb-8">
                                                {item?.content}
                                            </p>
                                            {/* Name */}
                                            <h4 className="text-xs sm:text-sm leading-xs sm:leading-md font-semiBold text-neutral-900 tracking-xs mb-1">
                                                {item?.name}
                                            </h4>
                                            {/* Designation */}
                                            <p className="text-3xs sm:text-2xs font-medium leading-3xs text-neutral-500 tracking-md">
                                                {item?.designation}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
