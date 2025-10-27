"use client";

import { useState } from "react";

export function Accordion({ accordionItem, defaultOpen = true }) {
    // Initialize based on defaultOpen prop
    const [openItem, setOpenItem] = useState(
        defaultOpen && accordionItem?.length > 0 ? accordionItem[0].id : null
    );

    const toggleItem = (id) => {
        // If the clicked item is already open, close it; otherwise, open it
        setOpenItem((prevOpenItem) => (prevOpenItem === id ? null : id));
    };

    return (
        <div className="space-y-4">
            {accordionItem.map((item) => {
                const isOpen = openItem === item.id;

                return (
                    <div
                        key={item.id}
                        className="border border-neutral-500 rounded-md overflow-hidden"
                    >
                        <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full p-3 sm:p-6 text-left flex items-center justify-between transition-colors duration-200 focus:outline-none "
                        >
                            <span className="text-neutral-900 text-xs sm:text-sm leading-xs sm:leading-md font-bold tracking-xs">
                                {item.title}
                            </span>
                            <svg
                                className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ease-in-out ${
                                    isOpen ? "" : "rotate-180"
                                }`}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.00017 14C6.00017 14 10.4191 9.00001 12.0002 9C13.5813 8.99999 18.0001 14 18.0001 14"
                                    stroke="#4B4B4B"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isOpen
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="pl-3 pr-9 sm:px-6 pb-3 sm:pb-4">
                                <p className="text-neutral-500 text-xs leading-xs font-medium">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
