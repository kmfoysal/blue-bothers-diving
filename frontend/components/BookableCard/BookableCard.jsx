"use client";

import { getDisplayPrice } from "@/utils/price-helpers";
import { format, isAfter, isBefore, parseISO, startOfDay } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PricingBreakdown from "../PricingBreakdown/PricingBreakdown";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function BookableCard({ activity }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const title = activity?.title || "Untitled Activity";
  const description = activity?.description || "";
  const imageUrl = activity?.image;
  // Fallback link logic
  const href = activity?.link || `/`;

  // ✨ NEW: Detect Pricing Mode for Badges
  const isBulkDiscount = activity?.pricingMode === "discount_by_sessions";
  const isPrivate = activity?.pricingMode === "static_per_booking";

  // ✨ CALCULATE PRICE DISPLAY
  const { label, price, currency, type } = getDisplayPrice(activity);

  // 🗓️ LOGIC: Calculate Real Availability from Pricing Periods
  const getAvailabilityLabel = () => {
    const periods = activity?.pricingPeriods;

    // 1. Safety Check
    if (!periods || periods.length === 0) {
      return "Check availability";
    }

    const today = startOfDay(new Date());

    // 2. CHECK IF ACTIVE TODAY
    // (Is today inside any ValidFrom - ValidTo range?)
    const isActiveToday = periods.some((p) => {
      const start = parseISO(p.validFrom);
      // If start date is in the future, it's not active today
      if (isAfter(start, today)) return false;

      // If start date is past or today, check the end date
      if (!p.validTo) return true; // No end date = Open forever

      const end = parseISO(p.validTo);
      // Check if today is BEFORE or ON the end date
      return !isAfter(today, end);
    });

    // 3. FIND NEAREST FUTURE DATE
    // Filter only periods starting in the future
    const futurePeriods = periods.filter((p) =>
      isAfter(parseISO(p.validFrom), today)
    );

    if (futurePeriods.length > 0) {
      // Sort by date ascending (closest date first)
      futurePeriods.sort(
        (a, b) => new Date(a.validFrom) - new Date(b.validFrom)
      );

      const nextStart = parseISO(futurePeriods[0].validFrom);
      return `Next session on ${format(nextStart, "MM do, yy")}`;
    }

    if (isActiveToday) {
      return "Available Daily";
    }

    // 4. Fallback (Everything is in the past)
    return "Check availability";
  };

  const dateLabel = getAvailabilityLabel();

  return (
    <div
      key={activity?.id}
      className="rounded-md bg-blue-50 col-span-full sm:col-span-6 md:col-span-4 xl:col-span-3"
    >
      {/* Image Section */}
      <div className="relative">
        <StrapiImage
          src={imageUrl}
          alt={title}
          width={400}
          height={400}
          className="w-full max-w-full rounded-t-md object-cover min-h-[228px]"
        />

        {/* ✨ NEW: Pricing Badge */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-50">
          {isBulkDiscount && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase bg-green-500 text-white rounded shadow-sm">
              Bulk Savings
            </span>
          )}
          {isPrivate && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase bg-purple-600 text-white rounded shadow-sm">
              Private Boat
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="py-4 sm:py-6 px-3 sm:px-4">
        <div className="relative flex items-center gap-4 sm:gap-6 mb-2 sm:mb-4">
          <div className="flex items-center gap-2 text-neutral-700 text-2xs font-medium leading-xs">
            <Image
              src="/images/time-icon.svg"
              alt="Time Icon"
              width={24}
              height={24}
              className="w-5 sm:w-6 h-5 sm:h-6"
            />
            {dateLabel}

            {/* Tooltip Trigger Icon */}
            {activity?.pricingPeriods?.length > 0 && (
              <div
                className="cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)} // Mobile support
              >
                {/* Info Icon (SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-blue-500 hover:text-blue-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>

                {/* THE TOOLTIP POPUP */}
                {showTooltip && (
                  <div className="absolute right-0 top-6 w-64 p-2 bg-white rounded-lg shadow-xl border border-neutral-200 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <PricingBreakdown
                      pricingPeriods={activity.pricingPeriods}
                      pricingMode={activity.pricingMode}
                      className="gap-2" // Slightly tighter spacing for tooltip
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <h4 className="text-xs sm:text-sm font-semiBold leading-xs sm:leading-sm tracking-xs text-neutral-900 mb-3 line-clamp-2 min-h-12">
          {title}
        </h4>
        <p className="text-neutral-500 text-2xs sm:text-xs font-medium leading-xs mb-3 line-clamp-3 min-h-14">
          {description}
        </p>
        <p className="text-neutral-900 text-2xs sm:text-xs font-medium leading-xs mb-3">
          {activity?.packageInclude}
        </p>
        <div className="border-t border-blue-100 pt-4 sm:pt-6 flex justify-between items-center">
          {/* Price */}
          {price !== null ? (
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 font-medium uppercase">
                {label}
              </span>
              <span className="text-md font-bold text-blue-700">
                {currency}
                {price}
              </span>
            </div>
          ) : (
            // Fallback for "N/A" items
            <span className="text-xs font-bold text-neutral-500">
              Contact for Details
            </span>
          )}

          {/* Button */}
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-2xs sm:text-xs font-medium leading-sm sm:leading-md text-blue-700"
          >
            Book now
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
