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
// Light Gallery

// import { PhotoProvider, PhotoView } from "react-image-previewer";
import Link from "next/link";
import { getStrapiMedia, StrapiImage } from "../StrapiImage/StrapiImage";

export default function OurGallery({ ourGallery }) {
    // const onInit = () => {
    //     console.log("lightGallery has been initialized");
    // };
    const onBeforeSlide = (detail) => {
        const { index, prevIndex } = detail;
        // console.log(index, prevIndex);
    };
    return (
        <section className=" section-padding container">
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="custom-wrapper-class our-gallery grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8 "
                onBeforeSlide={onBeforeSlide}
                getCaptionFromTitleOrAlt={false}
            >
                {ourGallery?.map((item) => (
                    <Link
                        key={item?.id}
                        href={getStrapiMedia(item?.url)}
                        className="our-gallery-item"
                    >
                        <StrapiImage
                            src={item?.url}
                            width={356}
                            height={442}
                            alt={item?.alternativeText}
                            className="w-full h-[152px] md:max-h-[411px] md:h-full object-cover rounded-md xl:rounded-lg "
                        />
                    </Link>
                ))}
            </LightGallery>
        </section>
    );
}
