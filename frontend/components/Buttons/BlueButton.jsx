import Link from "next/link";

export default function BlueButton({ label, href, className }) {
    return (
        <Link href={href} className={`${className ? className : ""}  text-xs sm:text-sm font-medium leading-sm rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 h-12 sm:h-[58px] text-neutral-50 bg-blue-700 flex w-full sm:w-auto sm:inline-flex justify-center sm:items-center transition-colors duration-200 hover:bg-blue-900 `}>
            {label}
        </Link>
    );
}
