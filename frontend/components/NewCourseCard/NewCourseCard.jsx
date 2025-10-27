import Image from "next/image";
import Link from "next/link";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function NewCourseCard({ course, slugPrefix }) {
    return (
        <div
            key={course?.id}
            className="rounded-md bg-blue-25 col-span-full sm:col-span-4"
        >
            <StrapiImage
                src={course?.featured_image?.url}
                alt={course?.featured_image?.alt}
                width={485}
                height={317}
                className="w-full max-w-full rounded-t-md"
            />
            {/* Card Content */}
            <div className="py-4 sm:py-6 px-3 sm:px-4">
                <div className="flex items-center gap-4 sm:gap-6 mb-2 sm:mb-4">
                    <div className="flex items-center gap-2 text-neutral-700 text-2xs sm:text-xs font-medium leading-xs">
                        <Image
                            src="/images/time-icon.svg"
                            alt="Time Icon"
                            width={24}
                            height={24}
                            className="w-5 sm:w-6 h-5 sm:h-6"
                        />
                        {course?.duration}
                    </div>
                    {course?.availability ? (
                        <div className="flex items-center gap-2 text-neutral-700 text-2xs sm:text-xs font-medium leading-xs">
                            <Image
                                src="/images/calendar-icon.svg"
                                alt="Calendar Icon"
                                width={24}
                                height={24}
                                className="w-5 sm:w-6 h-5 sm:h-6"
                            />
                            Availability : {course?.availability}
                        </div>
                    ) : null}
                </div>
                <h4 className="text-xs sm:text-sm font-semiBold leading-xs sm:leading-md tracking-xs text-neutral-900 mb-2 sm:mb-4">
                    {course?.title}
                </h4>
                <p className="text-neutral-500 text-2xs sm:text-xs font-semiBold leading-xs mb-4 sm:mb-6">
                    {course?.description}
                </p>
                <div className="border-t border-blue-100 pt-4 sm:pt-6 flex justify-between items-center">
                    {/* Price */}
                    <div className="flex items-center gap-3">
                        {/* Offer Price */}
                        {course?.offerPrice ? (
                            <span className="text-md sm:text-ml font-semiBold text-neutral-900 leading-sm sm:leading-lg tracking-xs">
                                {course?.offerPrice}€
                            </span>
                        ) : null}
                        {course?.price ? (
                            <span className="text-xs sm:text-sm leading-sm sm:leading-md font-medium text-neutral-500 line-through">
                                {course?.price}€
                            </span>
                        ) : null}
                    </div>
                    {/* Button */}
                    <Link
                        href={`/${slugPrefix}/${course.id}`}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium leading-sm sm:leading-md text-blue-700"
                    >
                        {course?.book_now_cta?.label}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.00005 5C8.00005 5 13 8.68242 13 10C13 11.3177 8 15 8 15"
                                stroke="#4D7FBF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
