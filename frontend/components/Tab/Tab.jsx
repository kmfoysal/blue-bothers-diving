"use client";

import { useState } from "react";
import DivingTab from "./DivingTab/DivingTab";
import SnorkelingTab from "./SnorkelingTab/SnorkelingTab";
import GeneralInfoTab from "./GeneralInfoTab/GeneralInfoTab";

export default function Tab() {
    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        {
            id: 1,
            label: "Home",
            content: <DivingTab />,
        },
        {
            id: 2,
            label: "Snorkeling",
            content: <SnorkelingTab />,
        },
        {
            id: 3,
            label: "General Info ",
            content: <GeneralInfoTab />,
        },
    ];

    return (
        <div className="w-full ">
            {/* Tab Navigation */}
            <div className="">
                <nav className="flex justify-center md:justify-start">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`font-medium text-xs md:text-sm leading-sm duration-200 py-1.5 md:py-4 px-4 md:px-8 first:rounded-ss-md last:rounded-se-md ${
                                activeTab === tab.id
                                    ? "bg-blue-700 text-white"
                                    : "bg-blue-50 text-neutral-900"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`transition-opacity duration-200 ${
                            activeTab === tab.id
                                ? "opacity-100"
                                : "opacity-0 hidden"
                        }`}
                    >
                        <div className="p-6 md:rounded-ss-none rounded-md border border-blue-50 py-12 px-3 md:px-6">
                            {tab.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
