"use client";

import { useState } from "react";
import BookableCard from "../BookableCard/BookableCard";

const courseData = [
    {
        id: 1,
        image: "/images/professional-courses-img-1.webp",
        alt: "Courses Image 1",
        title: "Diving – 10 Day Package",
        description: "Blue Brothers Diving",
        date: "Next available on Jul. 26",
        availability: "Availability : The whole year",
        price: "549",
        offerPrice: "499",
        packageInclude: "1 Day, incl. 2 Dives",
        category: "Diving",
    },
    {
        id: 2,
        image: "/images/professional-courses-img-2.webp",
        alt: "Courses Image 2",
        title: "Snorkeling – Full-Day trip",
        description: "Blue Brothers Diving",
        date: "Next available on Jul. 26",
        availability: "Availability : The whole year",
        price: "549",
        offerPrice: "499",
        packageInclude: "2 Dives",
        category: "Snorkeling",
    },
    {
        id: 3,
        image: "/images/professional-courses-img-3.webp",
        alt: "Courses Image 3",
        title: "Enriched Air (Nitrox) Diver",
        description: "Blue Brothers Diving",
        date: "Next available on Jul. 26",
        availability: "Availability : The whole year",
        price: "549",
        offerPrice: "499",
        packageInclude: "4 Dives",
        category: "Snorkeling",
    },
    {
        id: 4,
        image: "/images/professional-courses-img-4.webp",
        alt: "Courses Image 4",
        title: "Diving – 3 Day Package",
        description: "Blue Brothers Diving",
        date: "Next available on Jul. 26",
        availability: "Availability : The whole year",
        price: "549",
        offerPrice: "499",
        packageInclude: "5 Dives",
        category: "Courses",
    },
    {
        id: 5,
        image: "/images/professional-courses-img-5.webp",
        alt: "Courses Image 5",
        title: "Diving –7 Day Package",
        description: "Blue Brothers Diving",
        date: "Next available on Jul. 26",
        availability: "Availability : The whole year",
        price: "549",
        offerPrice: "499",
        packageInclude: "1 Day, incl. 2 Dives",
        category: "Diving",
    },
    {
        id: 6,
        image: "/images/professional-courses-img-6.webp",
        alt: "Courses Image 6",
        title: "Diving – 8 Day Package",
        description: "Blue Brothers Diving",
        date: "Next available on Jul. 26",
        availability: "Availability : The whole year",
        price: "549",
        offerPrice: "499",
        packageInclude: "1 Day, incl. 2 Dives",
        category: "Courses",
    },
];

export default function ActivitiesBook() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Get unique categories from courseData
    const uniqueCategories = [
        ...new Set(courseData.map((course) => course.category)),
    ];

    // Filter courses based on selected category
    const filteredCourses =
        selectedCategory === "All"
            ? courseData
            : courseData.filter(
                  (course) => course.category === selectedCategory
              );

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="container">
            {/* Filter buttons */}
            <div className="flex justify-center gap-4 mt-16">
                <button
                    onClick={() => handleCategoryClick("All")}
                    className={`px-6 py-3 rounded-full text-sm font-medium leading-sm text-neutral-900 transition-colors ${
                        selectedCategory === "All"
                            ? "bg-blue-500 text-white"
                            : "bg-blue-50 hover:bg-blue-100"
                    }`}
                >
                    All
                </button>
                {uniqueCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`px-6 py-3 rounded-full text-sm font-medium leading-sm text-neutral-900 transition-colors ${
                            selectedCategory === category
                                ? "bg-blue-500 text-white"
                                : "bg-blue-50 hover:bg-blue-100"
                        }`}
                    >
                        {category}
                    </button>
                ))}
                
            </div>

            <div className="grid grid-cols-12 gap-4 sm:gap-8 mt-6 sm:mt-12">
                {/* Card */}
                {filteredCourses.map((course) => (
                    <BookableCard
                        key={course.id}
                        course={course}
                        slugPrefix="courses"
                    />
                ))}
            </div>
        </div>
    );
}
