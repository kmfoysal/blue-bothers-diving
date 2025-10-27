import Link from "next/link";

export default function BorderButton({ href, className, label }) {
    return (
        <Link
            href={href}
            className={`${
                className ? className : "text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white"
            } border text-xs sm:text-sm font-medium leading-sm rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 inline-flex items-center  transition-colors duration-200 h-12 sm:h-[58px]`}
        >
            {label}
        </Link>
    );
}
