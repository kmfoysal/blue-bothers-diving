"use client";

// Light Gallery
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
import { getStrapiMedia, StrapiImage } from "../StrapiImage/StrapiImage";

export default function GridImageGallery({ imagesData }) {
    const onBeforeSlide = (detail) => {
        const { index, prevIndex } = detail;
        console.log(index, prevIndex);
    };

    return (
        <section className="">
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="grid grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                onBeforeSlide={onBeforeSlide}
                getCaptionFromTitleOrAlt={false}
            >
                {imagesData?.map((item) => (
                    <Link
                        key={item?.id}
                        href={getStrapiMedia(item?.url)}
                        className="col-span-6 lg:col-span-4 xl:col-span-3"
                    >
                        <StrapiImage
                            src={item?.url}
                            alt={item?.alternativeText}
                            width={356}
                            height={442}
                            className="w-full h-auto object-cover rounded-[6px] sm:rounded-md md:rounded-[12px] lg:rounded-lg"
                        />
                    </Link>
                ))}
            </LightGallery>
        </section>
    );
}
