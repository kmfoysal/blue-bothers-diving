"use client";
import { useState } from "react";
import Link from "next/link";
import { StrapiImage } from "@/components/StrapiImage/StrapiImage";

export default function FilterableActivityList({
  initialData,
  availableCategories,
}) {
  const [filterType, setFilterType] = useState("all"); // 'all', 'tour', 'course'
  const [filterCategory, setFilterCategory] = useState("all");

  // --- Filtering Logic ---
  const filteredItems = initialData.filter((item) => {
    // 1. Check Type
    const matchesType = filterType === "all" || item.type === filterType;

    // 2. Check Category
    const itemCategories = item.categories?.map((c) => c.name) || [];
    const matchesCategory =
      filterCategory === "all" || itemCategories.includes(filterCategory);

    return matchesType && matchesCategory;
  });

  // Helper for Button Styling
  const btnClass = (isActive) =>
    `px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 border ${
      isActive
        ? "bg-blue-700 text-white border-blue-700"
        : "bg-white text-neutral-600 border-neutral-300 hover:border-blue-500 hover:text-blue-600"
    }`;

  return (
    <div>
      {/* --- Filter Controls --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 border-b border-neutral-200 pb-8">
        {/* Type Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setFilterType("all")}
            className={btnClass(filterType === "all")}
          >
            All
          </button>
          <button
            onClick={() => setFilterType("tour")}
            className={btnClass(filterType === "tour")}
          >
            Tours
          </button>
          <button
            onClick={() => setFilterType("course")}
            className={btnClass(filterType === "course")}
          >
            Courses
          </button>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <select
            className="appearance-none px-5 py-2.5 pr-10 border border-neutral-300 rounded-full text-sm font-medium text-neutral-700 bg-white hover:border-blue-500 focus:outline-none cursor-pointer"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {availableCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {/* Custom Arrow Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* --- Grid Display --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className="group border border-neutral-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="h-56 relative overflow-hidden">
              <StrapiImage
                src={item.page_banner?.background?.url}
                alt={
                  item.page_banner?.background?.alternativeText || item.title
                }
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Type Badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider text-white ${
                  item.type === "course" ? "bg-orange-500" : "bg-blue-600"
                }`}
              >
                {item.type}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-neutral-900 leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Categories Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.categories?.slice(0, 2).map((cat, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-1 rounded"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-100">
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400 font-medium uppercase">
                    Starting From
                  </span>
                  <span className="text-blue-700 font-bold text-lg">
                    €{item.startingPrice}
                  </span>
                </div>

                <Link
                  href={item.link} // Logic from loader decides /tours or /courses
                  className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full transition-transform hover:-translate-y-0.5"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-neutral-50 rounded-lg border border-dashed border-neutral-300">
          <p className="text-neutral-500 font-medium">
            No activities found matching your filters.
          </p>
          <button
            onClick={() => {
              setFilterType("all");
              setFilterCategory("all");
            }}
            className="mt-4 text-blue-600 text-sm font-semibold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
