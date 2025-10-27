"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function BlockRendererClient({ content }) {
    if (!content) return null;
    return (
        <BlocksRenderer
            content={content}
            blocks={{
                // For paragraphs
                paragraph: ({ children }) => (
                    <p className="text-neutral-500">{children}</p>
                ),

                // For lists
                list: ({ children }) => (
                    <ul className="text-neutral-500 py-2 space-y-2">
                        {children}
                    </ul>
                ),

                "list-item": ({ children }) => (
                    <li className="pl-6 relative before:absolute before:content-[''] before:left-2.5 before:top-[11px] before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full">
                        {children}
                    </li>
                ),

                image: ({ image }) => {
                    console.log(image);
                    return (
                        <StrapiImage
                            src={image.url}
                            width={image.width}
                            height={image.height}
                            alt={image.alternativeText || ""}
                        />
                    );
                },
            }}
        />
    );
}
