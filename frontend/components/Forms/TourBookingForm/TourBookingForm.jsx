"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { toast } from "react-toastify";

import { ProductContext } from "@/context";
import { calculateTripPrice } from "@/utils/pricing-calculator";

export default function TourBookingForm({ tourData }) {
  const router = useRouter();
  const { productData = [], setProductData } = useContext(ProductContext);

  // --- DEBUGGING CHECK ---
  if (!tourData) {
    return (
      <div className="p-6 border border-red-200 rounded-lg bg-red-50 text-red-600">
        Error: Tour Data Missing in Form
      </div>
    );
  }
  if (!tourData.pricingPeriods || tourData.pricingPeriods.length === 0) {
    // This is normal if you haven't added pricing in Strapi yet
    console.warn("No pricing periods found for this tour.");
  }

  // --- State ---
  const [participants, setParticipants] = useState(1);
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [priceError, setPriceError] = useState(null);

  // UI Toggles
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Time Picker State
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("am");
  const [selectedTime, setSelectedTime] = useState("09:00 am");
  const pickerRef = useRef(null);

  // --- 1. Price Calculation Effect ---
  useEffect(() => {
    // If no date selected, price is 0
    if (!range?.from) {
      setCalculatedPrice(0);
      return;
    }

    const result = calculateTripPrice(
      tourData,
      range.from,
      range.to,
      participants
    );

    if (result.error) {
      setPriceError(result.error);
      setCalculatedPrice(0);
    } else {
      setPriceError(null);
      setCalculatedPrice(result.price);
    }
  }, [range, participants, tourData]);

  // --- 2. Handlers ---
  const handleDateSelect = (val) => {
    if (!val) {
      setRange({ from: undefined, to: undefined });
      return;
    }
    // Handle Range vs Single mode
    if (tourData.pricingMode === "discount_by_sessions") {
      setRange(val);
    } else {
      // Single date mode: DayPicker returns a Date object
      setRange({ from: val, to: val });
      setIsDateOpen(false); // Close calendar
    }
  };

  const incrementParticipants = () => setParticipants((prev) => prev + 1);
  const decrementParticipants = () =>
    setParticipants((prev) => (prev > 1 ? prev - 1 : 1));

  // Time Picker Logic
  const handleApplyTime = () => {
    const formattedTime = `${hour}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
    setSelectedTime(formattedTime);
    setIsOpen(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // --- 3. Add to Cart ---
  function handleAddToCart(event) {
    event.stopPropagation();
    event.preventDefault();

    if (!range?.from) {
      toast.error("Please select a date.", { position: "bottom-right" });
      return;
    }
    if (calculatedPrice === 0) {
      toast.error("Pricing unavailable.", { position: "bottom-right" });
      return;
    }

    const currentProducts = Array.isArray(productData) ? productData : [];
    const found = currentProducts.find(
      (item) =>
        item.id === tourData.id &&
        item.bookingDate?.from?.toString() === range.from.toString()
    );

    if (found) {
      toast.info("Item already in cart.", { position: "bottom-right" });
      router.push("/checkout");
      return;
    }

    const cartItem = {
      cartId: crypto.randomUUID(), // 👈 Generate unique ID
      id: tourData.id,
      title: tourData.title,
      slug: tourData.slug,
      image: tourData.page_banner?.background?.url,
      price: calculatedPrice,
      participants: participants,
      bookingDate: range,
      selectedTime: selectedTime,
      pricingMode: tourData.pricingMode,
      currency: tourData.currency,
    };

    setProductData([...currentProducts, cartItem]);
    toast.success("Added to Cart!", { position: "bottom-right" });
    router.push("/checkout");
  }

  // --- Helpers ---
  const formatDateDisplay = () => {
    if (!range?.from) return "Select Date";
    if (!range.to || range.from === range.to)
      return format(range.from, "dd MMM, yyyy");
    return `${format(range.from, "dd MMM")} - ${format(
      range.to,
      "dd MMM, yyyy"
    )}`;
  };

  const activePeriod =
    tourData?.pricingPeriods?.find((p) => {
      const now = new Date();
      const start = new Date(p.validFrom);
      const end = p.validTo ? new Date(p.validTo) : new Date("2099-12-31");
      return now >= start && now <= end;
    }) || tourData?.pricingPeriods?.[0];

  const tiers = activePeriod?.sessionPricingTiers || [];

  const activePricingPeriod = tourData?.pricingPeriods?.[0];
  const pricingTiers = activePricingPeriod?.sessionPricingTiers || [];
  const showTierDropdown =
    tourData.pricingMode === "discount_by_sessions" && pricingTiers.length > 0;

  return (
    <div className="sticky top-8">
      <form className="px-3 py-6 md:p-6 border border-neutral-500 rounded-lg bg-white">
        <div className="flex flex-col gap-6">
          {/* --- DATE PICKER --- */}
          <div className="sm:col-span-3">
            <fieldset className="border border-neutral-200 rounded-full relative pr-4 px-4 pb-2">
              <legend className="text-2xs font-semibold text-neutral-900 ml-1 px-1">
                Select Date
              </legend>
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  setIsDateOpen(!isDateOpen);
                  setIsOpen(false);
                }}
              >
                <input
                  type="text"
                  value={formatDateDisplay()}
                  readOnly
                  className="w-full text-2xs text-neutral-900 min-h-10 bg-transparent outline-none cursor-pointer"
                />
                <span className="absolute right-2 top-2 -z-10">
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      isDateOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
                {isDateOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl border border-neutral-200 shadow-xl p-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DayPicker
                      mode={
                        tourData.pricingMode === "discount_by_sessions"
                          ? "range"
                          : "single"
                      }
                      selected={range}
                      onSelect={handleDateSelect}
                      disabled={{ before: new Date() }}
                      modifiersClassNames={{
                        selected: "bg-blue-600 text-white rounded-full",
                      }}
                    />
                  </div>
                )}
              </div>
            </fieldset>
          </div>

          {/* --- TIME PICKER --- */}
          <div className="relative" ref={pickerRef}>
            <div
              className="sm:col-span-3 -mt-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <fieldset className="border border-neutral-200 rounded-full relative pr-4 px-4 pb-2 cursor-pointer hover:border-neutral-300">
                <legend className="text-2xs font-semibold text-neutral-900 ml-1 px-1">
                  Start Time
                </legend>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedTime}
                    readOnly
                    className="w-full text-2xs text-neutral-900 min-h-10 bg-transparent outline-none cursor-pointer"
                  />
                  <svg
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </fieldset>
            </div>
            {isOpen && (
              <div className="absolute z-50 mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl p-5 min-w-[280px]">
                <div className="flex gap-3 items-center justify-center mb-4">
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-neutral-500 mb-1">
                      Hour
                    </label>
                    <select
                      value={hour}
                      onChange={(e) => setHour(Number(e.target.value))}
                      className="border rounded-lg px-2 py-1 text-xs outline-none bg-white"
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {(i + 1).toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className="text-md font-bold text-neutral-400 mt-4">
                    :
                  </span>
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-neutral-500 mb-1">
                      Minute
                    </label>
                    <select
                      value={minute}
                      onChange={(e) => setMinute(Number(e.target.value))}
                      className="border rounded-lg px-2 py-1 text-xs outline-none bg-white"
                    >
                      {[0, 15, 30, 45].map((m) => (
                        <option key={m} value={m}>
                          {m.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-neutral-500 mb-1">
                      Period
                    </label>
                    <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setPeriod("am")}
                        className={`px-3 py-1 text-xs ${
                          period === "am"
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                        }`}
                      >
                        AM
                      </button>
                      <button
                        type="button"
                        onClick={() => setPeriod("pm")}
                        className={`px-3 py-1 text-xs ${
                          period === "pm"
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                        }`}
                      >
                        PM
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 border border-neutral-300 rounded-lg py-2 text-xs hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyTime}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-xs"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* --- PARTICIPANTS --- */}
          <div className="sm:col-span-3">
            <fieldset className="border border-neutral-200 rounded-full">
              <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                Participants
              </legend>
              <div className="w-full focus:outline-none rounded-full h-14 p-4 flex items-center justify-between">
                <span className="text-neutral-900 text-2xs">
                  {participants} Guest{participants > 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={decrementParticipants}
                    disabled={participants <= 1}
                    className="w-8 h-8 flex items-center justify-center text-neutral-900 hover:bg-neutral-100 rounded-full text-xl"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={incrementParticipants}
                    className="w-8 h-8 flex items-center justify-center text-neutral-900 hover:bg-neutral-100 rounded-full text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </fieldset>
          </div>

          {/* --- TIER INFO (Optional) --- */}
          {showTierDropdown && (
            <div className="sm:col-span-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPricingOpen(!isPricingOpen)}
                  className="w-full text-2xs text-blue-600 underline text-left px-4"
                >
                  View Discount Rates
                </button>
                {isPricingOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg p-2">
                    {pricingTiers.map((tier, index) => (
                      <div
                        key={index}
                        className="px-2 py-1 text-2xs text-neutral-700"
                      >
                        {tier.fromSessionCount}
                        {tier.toSessionCount
                          ? `-${tier.toSessionCount}`
                          : "+"}{" "}
                        Days: €{tier.pricePerParticipant}/day
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ✅ NEW SECTION: VISUALIZE TIERS */}
        {tourData.pricingMode === "discount_by_sessions" &&
          tiers.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h5 className="text-xs font-bold text-blue-800 uppercase mb-2">
                Multi-Day Discounts
              </h5>
              <div className="flex flex-col gap-1">
                {tiers.map((tier, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-xs text-blue-900 border-b border-blue-100 last:border-0 pb-1 last:pb-0"
                  >
                    <span>
                      {tier.fromSessionCount}
                      {tier.toSessionCount
                        ? ` - ${tier.toSessionCount}`
                        : "+"}{" "}
                      Days
                    </span>
                    <span className="font-semibold">
                      €{tier.pricePerParticipant}{" "}
                      <span className="text-blue-500 font-normal">/ day</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-blue-500 mt-2 italic">
                * Select a date range to apply these discounts automatically.
              </p>
            </div>
          )}

        {/* --- TOTAL PRICE --- */}
        <div className="my-6 flex flex-col gap-2">
          <div className="border-b border-neutral-200 mb-4"></div>
          <div className="flex items-center justify-between gap-6">
            <div>
              <h4 className="text-sm leading-md font-semiBold tracking-xs text-neutral-950 mb-0.5">
                Total Price
              </h4>
              <p className="text-2xs leading-3xs tracking-md text-neutral-500">
                {priceError ? "Check selection" : "Estimated"}
              </p>
            </div>
            <div className="text-right">
              {priceError ? (
                <span className="text-xs text-red-500 font-bold block max-w-[150px] text-right">
                  {priceError}
                </span>
              ) : (
                <h3 className="text-ml leading-ml font-semiBold tracking-xs text-blue-700">
                  {calculatedPrice > 0
                    ? `${calculatedPrice.toFixed(2)} €`
                    : "-- €"}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* --- BOOK BUTTON --- */}
        <div className="flex flex-col gap-4 md:gap-6">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={calculatedPrice === 0 || !!priceError}
            className={`text-xs sm:text-sm font-medium leading-sm rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 h-12 sm:h-[58px] text-white flex w-full sm:w-auto sm:inline-flex justify-center sm:items-center transition-colors duration-200 ${
              calculatedPrice > 0
                ? "bg-blue-700 hover:bg-blue-900 shadow-md"
                : "bg-neutral-400 cursor-not-allowed"
            }`}
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
}
