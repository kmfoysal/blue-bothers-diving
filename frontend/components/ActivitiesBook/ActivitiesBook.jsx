"use client";

import { useState } from "react";
import BookableCard from "../BookableCard/BookableCard";

export default function ActivitiesBook({ allActivities }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories from allActivities
  const uniqueCategories = [
    ...new Set(
      allActivities?.flatMap(
        (item) => item?.categories?.map((cat) => cat?.name) || []
      ) || []
    ),
  ];

  // Filter courses based on selected category
  const filteredActivities =
    selectedCategory === "All"
      ? allActivities
      : allActivities?.filter((item) =>
          item?.categories?.some((cat) => cat?.name === selectedCategory)
        ) || [];

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
        {uniqueCategories?.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium leading-sm text-neutral-900 transition-colors capitalize ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-blue-50 hover:bg-blue-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-4 sm:gap-6 mt-6 sm:mt-12">
        {/* Card */}
        {filteredActivities?.map((item, index) => (
          <BookableCard key={index} activity={item} />
        ))}
      </div>
    </div>
  );
}
