"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const languages = [
    { code: "en", name: "English", fullName: "English (England)", flag: "/icons/en.svg" },
    { code: "de", name: "Deutsch", fullName: "Deutsch (German)", flag: "/icons/de.svg" },
];

const locales = ["en", "de"];
const defaultLocale = "en";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const dropdownRef = useRef(null);

    // Detect current locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = locales.includes(segments[0]) ? segments[0] : defaultLocale;
    
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage =
        languages.find((lang) => lang.code === currentLocale) || languages[0];

    const handleLanguageChange = (newLocale) => {
        let newPath;

        // Remove current locale from pathname if exists
        const pathWithoutLocale = currentLocale === defaultLocale 
            ? pathname 
            : pathname.replace(`/${currentLocale}`, '') || '/';

        // Add new locale prefix only if it's not the default locale
        if (newLocale === defaultLocale) {
            newPath = pathWithoutLocale;
        } else {
            newPath = `/${newLocale}${pathWithoutLocale}`;
        }

        router.push(newPath);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* Current Selection */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50 focus:outline-none w-36"
            >
                <Image
                    src={currentLanguage.flag}
                    alt={currentLanguage.code}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                />
                <span className="text-xs leading-sm text-neutral-950 font-medium">
                    {currentLanguage.name}
                </span>

                <svg
                    className={`w-6 h-6 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 10C18 10 13.5811 15 12 15C10.4188 15 6 10 6 10"
                        stroke="#4B4B4B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-4 w-64 bg-white border-t-sm border-blue-700 rounded-md shadow-lg z-40 dropdown-arrow">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md ${
                                currentLocale === language.code
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700"
                            }`}
                        >
                            <Image
                                src={language.flag}
                                alt={language.code}
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                            <span className="text-xs leading-sm text-neutral-950 font-medium">
                                {language.fullName}
                            </span>
                            {currentLocale === language.code && (
                                <svg
                                    className="w-4 h-4 ml-auto text-blue-700"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}