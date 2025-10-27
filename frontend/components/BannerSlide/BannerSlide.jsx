"use client";

import {
    Autoplay,
    EffectFade,
    FreeMode,
    Navigation,
    Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { getStrapiMedia, StrapiImage } from "../StrapiImage/StrapiImage";

export function BannerSlide({ dict, data }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="overflow-hidden">
            {/* Main Carousel */}
            <div className="relative xl:min-h-[1024px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
                    <div className="col-span-1 h-[380px] sm:h-full order-2 sm:order-1 relative">
                        <div className="absolute left-0 w-full h-[380px] sm:h-full">
                            <Swiper
                                modules={[Thumbs, Autoplay, EffectFade]}
                                spaceBetween={0}
                                speed={800} // fade transition (milliseconds)
                                allowTouchMove={false}
                                effect="fade"
                                fadeEffect={{ crossFade: true }} // smooth fade effect
                                thumbs={{
                                    swiper:
                                        thumbsSwiper && !thumbsSwiper.destroyed
                                            ? thumbsSwiper
                                            : null,
                                }}
                                loop={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                onSlideChange={(swiper) =>
                                    setActiveIndex(swiper.realIndex)
                                }
                                className="h-full"
                            >
                                {data?.slideImage.map((slide) => (
                                    <SwiperSlide key={slide?.id}>
                                        <StrapiImage
                                            height={1024}
                                            width={999}
                                            src={getStrapiMedia(slide.url)}
                                            className="w-full h-[380px] sm:h-full object-cover"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    {/*  */}
                    <div className="col-span-1 order-1 sm:order-2 relative h-full flex items-center ">
                        <div className="w-full sm:max-w-[615px] px-4 sm:px-0 pb-16 pt-[48px] lg:py-[150px] xl:py-[180px] xxl:py-[220px] sm:pl-[106px] h-full ">
                            <span className="text-blue-700 text-2xs sm:text-sm font-medium leading-sm sm:leading-md tracking-[6px] mb-1">
                                {data?.sub_title}
                            </span>
                            <h1 className="text-neutral-950 text-xl sm:text-2xl leading-xl sm:leading-2xl font-play-fair-display font-black">
                                {data?.title}
                            </h1>
                            <p className="text-neutral-500 text-xs sm:text-sm font-medium leading-sm sm:leading-md mt-3 sm:mt-4 mb-6 sm:mb-12">
                                {data?.description}
                            </p>

                            <Link
                                href={data?.button?.href}
                                className="border border-blue-700 text-xs sm:text-sm font-medium leading-sm rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 text-blue-700 flex w-full sm:w-auto sm:inline-flex justify-center sm:items-center  transition-colors duration-200 hover:bg-blue-700 hover:text-white h-12 sm:h-[58px]"
                            >
                                {data?.button?.label}
                            </Link>
                        </div>
                        <div className="absolute left-0 bottom-0 h-16 sm:h-28 w-full">
                            <Image
                                src="/images/home-banner-shape.svg"
                                alt="Shape"
                                width={100}
                                height={100}
                                className="max-w-full w-full h-16 sm:h-28 object-contain left-0 object-left-bottom"
                            />
                        </div>
                    </div>
                </div>

                {/* Thumbnails Carousel */}
                <div className="max-w-[256px] sm:max-w-[120px] md:h-[600px] absolute top-auto sm:top-1/2 left-1/2 transform bottom-[calc(380px-32px)] sm:bottom-auto sm:-translate-y-1/2 -translate-x-1/2 z-10">
                    <Swiper
                        modules={[FreeMode, Navigation, Thumbs]}
                        onSwiper={setThumbsSwiper}
                        spaceBetween={80}
                        slidesPerView={3}
                        freeMode={true}
                        watchSlidesProgress={true}
                        breakpoints={{
                            // Mobile (640px and below) - horizontal
                            0: {
                                direction: "horizontal",
                                spaceBetween: 20,
                            },
                            // Desktop (641px and above) - vertical
                            641: {
                                direction: "vertical",
                                spaceBetween: 80,
                            },
                        }}
                        className="thumbs-swiper max-h-[248px] sm:max-h-[448px]"
                    >
                        {data?.slideImage?.map((image, index) => (
                            <SwiperSlide key={image.id}>
                                <div
                                    className={`relative aspect-square cursor-pointer transition-all duration-300 max-w-[256px] sm:max-w-24 rounded-full ${
                                        activeIndex === index
                                            ? "border-md border-blue-100 relative before:absolute before:content-[''] before:w-full before:h-full before:-inset-1 before:bg-blue-100/0 before:rounded-full before:transition-colors before:decoration-blue-500"
                                            : "border-md border-blue-100 relative before:absolute before:content-[''] before:w-full before:h-full before:inset-0 before:bg-blue-100/80 before:rounded-full"
                                    }`}
                                >
                                    {/* <StrapiImage
                                        src={image?.url}
                                        alt={
                                            image?.alternativeText ||
                                            "Default Alt"
                                        }
                                        width={96}
                                        height={95}
                                        className="w-full h-full object-cover rounded-full"
                                    /> */}
                                    <StrapiImage
                                        src={getStrapiMedia(image?.url)}
                                        alt={image?.alternativeText}
                                        width={96}
                                        height={95}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                    {activeIndex === index && (
                                        <div className="absolute inset-0 bg-primary/20" />
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
