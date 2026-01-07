// import { getStrapiURL } from "@/utils/get-strapi-url";
// import Image from "next/image";

// export default function StrapiImage({ src, alt, className, ...rest }) {
//     const imageUrl = getStrapiMedia(src);

//     if (!imageUrl) return null;
//     return (
//         <Image
//             src={imageUrl}
//             alt={alt}
//             className={className}
//             {...rest}
//             width={100}
//             height={100}
//         />
//     );
// }

// export function getStrapiMedia(url) {
//     if (url == null) return null;
//     if (url.startsWith("data")) return url;
//     if (url.startsWith("http") || url.startsWith("//")) return url;
//     // return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`
//     return getStrapiURL() + url;
// }

import { getStrapiURL } from "@/utils/get-strapi-url";
import Image from "next/image";

export function StrapiImage({ src, alt, className, width, height, ...rest }) {
    const imageUrl = getStrapiMedia(src);
    if (!imageUrl) return null;

    return <Image src={imageUrl || '/banner-slider-img-1.webp'} alt={alt || "Default Alt"} className={className} width={width || 100} height={height || 100} {...rest} />;
}

export function getStrapiMedia(url) {
    if (url == null) return null;
    if (url?.startsWith("data:")) return url;
    if (url?.startsWith("http") || url?.startsWith("//")) return url;
    return getStrapiURL() + url;
}
