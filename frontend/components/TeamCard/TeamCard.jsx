import Link from "next/link";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function TeamCard({ memberData }) {
    const { name, designation, languages, image, social_link } =
        memberData || {};

    return (
        <div className="col-span-full sm:col-span-4 bg-blue-50 p-4 rounded-md">
            {/* Image */}
            <StrapiImage
                src={image?.url}
                alt={image?.alternativeText}
                width={453}
                height={381}
                className="rounded-md w-full"
            />
            {/* Content */}
            <div className="p-2 text-center">
                {/* Name */}
                <h3 className="text-ml leading-ml font-semiBold tracking-xs text-neutral-900">
                    {name}
                </h3>
                {/* Designation */}
                <p className="text-xs leading-xs font-medium text-neutral-900 my-2">
                    {designation}
                </p>
                {/* Language */}
                <p className="text-xs leading-xs font-medium text-neutral-900 my-2">
                    Languages:{" "}
                    {languages?.map((lang, index) => (
                        <span key={index}>
                            {lang?.language}
                            {index < languages?.length - 1 && ", "}
                        </span>
                    ))}
                </p>

                {/* Social links */}
                <div className="flex items-center justify-center gap-4 mt-4 sm:mt-6">
                    {social_link?.map((social) => (
                        <Link
                            key={social?.id}
                            href={social?.href}
                            target="_blank"
                            className="inline-flex h-9 w-9 items-center justify-center border bg-blue-700 border-blue-700 rounded-full transition-colors duration-200 hover:bg-blue-700/0 hover:border-blue-700 group"
                        >
                            <StrapiImage
                                src={social?.image?.url}
                                alt={social?.image?.alternativeText}
                                width={14}
                                height={14}
                                className="transition-colors duration-200 group-hover:fill-blue-700"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
