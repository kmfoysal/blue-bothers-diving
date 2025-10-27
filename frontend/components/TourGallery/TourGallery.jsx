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

// import plugins if you need

export default function TourGallery({ tourGallery }) {
    const onBeforeSlide = (detail) => {
        const { index, prevIndex } = detail;
        // console.log(index, prevIndex);
    };

    return (
        <section>
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="gap-2 md:1.5 grid grid-cols-1 md:grid-cols-10 lg:gap-1.5 tour-gallery w-full px-4 pb-4 md:px-0 md:pb-0"
                onBeforeSlide={onBeforeSlide}
                getCaptionFromTitleOrAlt={false}
            >
                {tourGallery?.map((item) => (
                    <Link
                        key={item?.id}
                        href={getStrapiMedia(item?.url)}
                        className="tour-gallery-item w-full h-full relative min-h-64 md:min-h-44 xl:min-h-[340px]"
                    >
                        <StrapiImage
                            src={item?.url}
                            alt={item?.alternativeText}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover inline-block absolute rounded-md md:rounded-[0px]"
                        />
                    </Link>
                ))}
            </LightGallery>
        </section>
    );
}
