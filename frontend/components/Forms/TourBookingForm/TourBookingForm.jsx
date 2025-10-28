"use client";

import { format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { useEffect, useRef } from "react";

export default function TourBookingForm() {
    const [participants, setParticipants] = useState(1);
    const [tieredPricing, setTieredPricing] = useState("1-2 Days: €99");
    const [isTimeOpen, setIsTimeOpen] = useState(false);
    const [isPricingOpen, setIsPricingOpen] = useState(false);
    const [isDateOpen, setisDateOpen] = useState(false);

    //timepicker
    const [selectedTime, setSelectedTime] = useState("12:00 am");
    const [isOpen, setIsOpen] = useState(false);
    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(0);
    const [period, setPeriod] = useState("am");
    const pickerRef = useRef(null);

    // Close picker on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Parse existing time when opening picker
    useEffect(() => {
        if (isOpen && selectedTime) {
            const [time, per] = selectedTime.split(" ");
            const [h, m] = time.split(":");
            setHour(parseInt(h));
            setMinute(parseInt(m));
            setPeriod(per);
        }
    }, [isOpen]);

    const handleApply = () => {
        const formattedTime = `${hour}:${minute
            .toString()
            .padStart(2, "0")} ${period}`;
        setSelectedTime(formattedTime);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    // Prevent dropdown from closing when clicking AM/PM
    const handlePeriodChange = (newPeriod, e) => {
        e.preventDefault();
        e.stopPropagation(); // This prevents the click from bubbling up
        setPeriod(newPeriod);
    };

    //price option
    const pricingOptions = [
        "1-2 Days: €99",
        "3-5 Days: €199",
        "6-10 Days: €349",
        "10+ Days: €499",
    ];

    // Calculate pricing based on days

    const incrementParticipants = () => {
        setParticipants((prev) => prev + 1);
    };

    const decrementParticipants = () => {
        setParticipants((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const [range, setRange] = useState();

    // Format the selected range for display
    const formatDateRange = () => {
        if (!range) return "04 August, 2025";

        if (range.from) {
            if (!range.to) {
                return format(range.from, "dd MMMM, yyyy");
            }
            return `${format(range.from, "dd MMMM, yyyy")} - ${format(
                range.to,
                "dd MMMM, yyyy"
            )}`;
        }
        return "04 August, 2025";
    };

    return (
        <div className=" sticky top-8">
            <form className="px-3 py-6 md:p-6 border border-neutral-500 rounded-lg">
                <div className="flex flex-col gap-6">
                    {/* Select Date */}
                    <div className="sm:col-span-3 pick-date">
                        <fieldset className="border border-neutral-200 rounded-full relative pr-4 px-4 pb-2">
                            <legend className="text-2xs font-semibold text-neutral-900 ml-1 px-1">
                                Select Date
                            </legend>

                            <div
                                className="relative"
                                onClick={() => {
                                    setisDateOpen(!isDateOpen);
                                    setIsDateOpen(false);
                                    setIsTimeOpen(false);
                                }}
                            >
                                <input
                                    type="text"
                                    value={formatDateRange()}
                                    readOnly
                                    className="w-full text-2xs text-neutral-900 min-h-10 bg-transparent outline-none cursor-pointer"
                                    onClick={() =>
                                        document
                                            .getElementById("calendar-popup")
                                            .classList.toggle("hidden")
                                    }
                                />
                                <span className="absolute right-2 top-2 -z-30">
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

                                {/* Calendar Popup */}
                                <div
                                    id="calendar-popup"
                                    className="hidden absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl border border-neutral-200 shadow-lg p-4"
                                >
                                    <DayPicker
                                        mode="range"
                                        selected={range}
                                        onSelect={setRange}
                                        classNames={{}}
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* time picker */}

                    <div className="relative" ref={pickerRef}>
                        {/* Your Custom Input Design */}
                        <div
                            className="sm:col-span-3 -mt-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <fieldset className="border border-neutral-200 rounded-full relative pr-4 px-4 pb-2 cursor-pointer hover:border-neutral-300 transition-colors">
                                <legend className="text-2xs font-semibold text-neutral-900 ml-1 px-1">
                                    Choose Available Start Time
                                </legend>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={selectedTime}
                                        readOnly
                                        className="w-full text-2xs text-neutral-900 min-h-10 bg-transparent outline-none cursor-pointer"
                                        placeholder="Select time"
                                    />
                                    {/* Clock Icon */}
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

                        {/* Custom Time Picker Dropdown */}
                        {isOpen && (
                            <div className="absolute z-50 mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl p-5 min-w-[280px]">
                                <div className="flex gap-3 items-center justify-center mb-4">
                                    {/* Hour Selector */}
                                    <div className="flex flex-col items-center">
                                        <label className="text-xs text-neutral-500 mb-1">
                                            Hour
                                        </label>
                                        <select
                                            value={hour}
                                            onChange={(e) =>
                                                setHour(Number(e.target.value))
                                            }
                                            className="border border-neutral-300 rounded-lg px-3 py-2 text-2xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        >
                                            {[...Array(12)].map((_, i) => (
                                                <option
                                                    key={i + 1}
                                                    value={i + 1}
                                                >
                                                    {(i + 1)
                                                        .toString()
                                                        .padStart(2, "0")}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <span className="text-md font-bold text-neutral-400 mt-4">
                                        :
                                    </span>

                                    {/* Minute Selector */}
                                    <div className="flex flex-col items-center">
                                        <label className="text-xs text-neutral-500 mb-1">
                                            Minute
                                        </label>
                                        <select
                                            value={minute}
                                            onChange={(e) =>
                                                setMinute(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="border border-neutral-300 rounded-lg px-3 py-2 text-2xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        >
                                            {[...Array(12)].map((_, i) => (
                                                <option
                                                    key={i * 5}
                                                    value={i * 5}
                                                >
                                                    {(i * 5)
                                                        .toString()
                                                        .padStart(2, "0")}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* AM/PM Selector */}
                                    <div className="flex flex-col items-center">
                                        <label className="text-xs text-neutral-500 mb-1">
                                            Period
                                        </label>
                                        <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                                            <button
                                                onClick={(e) =>
                                                    handlePeriodChange("am", e)
                                                }
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                } // Prevents focus issues
                                                className={`px-4 py-2 text-2xs font-medium transition-colors ${
                                                    period === "am"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-white text-neutral-700 hover:bg-neutral-50"
                                                }`}
                                            >
                                                AM
                                            </button>
                                            <button
                                                onClick={(e) =>
                                                    handlePeriodChange("pm", e)
                                                }
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                } // Prevents focus issues
                                                className={`px-4 py-2 text-2xs font-medium transition-colors border-l border-neutral-300 ${
                                                    period === "pm"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-white text-neutral-700 hover:bg-neutral-50"
                                                }`}
                                            >
                                                PM
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 border border-neutral-300 text-neutral-700 rounded-lg px-4 py-2 text-2xs font-medium hover:bg-neutral-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleApply}
                                        className="flex-1 bg-blue-500 text-white rounded-lg px-4 py-2 text-2xs font-medium hover:bg-blue-600 transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* <div className="sm:col-span-3 -mt-2">
                        <fieldset className="border border-neutral-200 rounded-full relative pr-4 px-4 pb-2">
                            <legend className="text-2xs font-semibold text-neutral-900 ml-1 px-1">
                                Choose Available Start Time
                            </legend>

                            <div className="relative">
                                <input
                                    type="text"
                                    value={selectedTime}
                                    readOnly
                                    className="w-full text-2xs text-neutral-900 min-h-10 bg-transparent outline-none cursor-pointer"
                                    
                                />
                            </div>
                        </fieldset>
                    </div> */}

                    {/* Participants */}
                    <div className="sm:col-span-3">
                        <fieldset className="border border-neutral-200 rounded-full">
                            <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                Participants
                            </legend>
                            <div className="w-full focus:outline-none rounded-full h-14 p-4 flex items-center justify-between">
                                <span className="text-neutral-900 text-2xs">
                                    {participants.toString().padStart(2, "0")}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={incrementParticipants}
                                        className="w-8 h-8 flex items-center justify-center text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors text-2xl"
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z"
                                                fill="#4B4B4B"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={decrementParticipants}
                                        disabled={participants <= 1}
                                        className={`w-8 h-8 flex items-center justify-center text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors text-2xl ${
                                            participants <= 1
                                                ? "opacity-40 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        <svg
                                            width="14"
                                            height="2"
                                            viewBox="0 0 14 2"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M14 0H0V2H14V0Z"
                                                fill="#4B4B4B"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Tiered pricing */}
                    <div className="sm:col-span-3">
                        <fieldset className="border border-neutral-200 rounded-full relative">
                            <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                Tiered pricing
                            </legend>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsPricingOpen(!isPricingOpen);
                                        setIsDateOpen(false);
                                        setIsTimeOpen(false);
                                    }}
                                    className="w-full focus:outline-none rounded-full h-14 text-2xs leading-xs text-neutral-900 p-4 flex items-center justify-between"
                                >
                                    <span>{tieredPricing}</span>
                                    <svg
                                        className={`w-5 h-5 transition-transform ${
                                            isPricingOpen ? "rotate-180" : ""
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
                                </button>
                                {isPricingOpen && (
                                    <div className="absolute z-20 w-full mt-2 bg-white border border-neutral-200 rounded-2xl shadow-lg">
                                        {pricingOptions.map((option, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    setTieredPricing(option);
                                                    setIsPricingOpen(false);
                                                }}
                                                className="w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors text-neutral-900 text-2xs first:rounded-t-2xl last:rounded-b-2xl"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </fieldset>
                    </div>
                </div>

                {/* Price */}
                <div className="my-6 flex flex-col gap-2">
                    <p className="text-2xs leading-3xs tracking-md text-neutral-950">
                        Pricing
                    </p>
                    <div className="flex items-center justify-between gap-6">
                        <div className="">
                            <h4 className="text-sm leading-md font-semiBold tracking-xs text-neutral-950 mb-0.5">
                                On-Site
                            </h4>
                            <p className="text-2xs leading-3xs tracking-md text-neutral-500">
                                booking made 14 days or fewer before the trip
                            </p>
                        </div>
                        {/* Price */}
                        <h4 className="text-sm leading-md font-semiBold tracking-xs text-neutral-950">
                            419 €
                        </h4>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                        <div className="">
                            <h4 className="text-sm leading-md font-semiBold tracking-xs text-neutral-950 mb-0.5">
                                Early Bird
                            </h4>
                            <p className="text-2xs leading-3xs tracking-md text-neutral-500">
                                booking made more than 14 days in advance
                            </p>
                        </div>
                        {/* Price */}
                        <h4 className="text-sm leading-md font-semiBold tracking-xs text-neutral-950">
                            319 €
                        </h4>
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:gap-6">
                    {/* Divider */}
                    <div className="border-b border-neutral-200"></div>

                    <h4 className="text-sm leading-md font-semiBold tracking-xs text-neutral-950">
                        Reserve Your Day Today
                    </h4>

                    <div className="flex items-center gap-3">
                        <h3 className="text-ml leading-ml font-semiBold tracking-xs text-blue-700">
                            319 €
                        </h3>
                        <h4 className="text-sm leading-md font-semiBold tracking-xs text-neutral-500 line-through">
                            419 €
                        </h4>
                    </div>
                    {/* Button */}
                    <button
                        type="submit"
                        className="text-xs sm:text-sm font-medium leading-sm rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 h-12 sm:h-[58px] text-neutral-50 bg-blue-700 flex w-full sm:w-auto sm:inline-flex justify-center sm:items-center transition-colors duration-200 hover:bg-blue-900"
                    >
                        Pay Now
                    </button>
                </div>
            </form>
        </div>
    );
}
