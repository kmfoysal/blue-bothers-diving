"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutDetailsOverview({ data }) {
    const [guestCount, setGuestCount] = useState(1);

    const handleAddGuest = () => {
        setGuestCount((prevCount) => prevCount + 1);
    };
    return (
        <section className="py-8 md:py-16">
            <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 xl:gap-16">
                <div className="col-span-full md:col-span-6 xl:col-span-7 relative before:absolute before:content-[''] before:w-full md:before:w-[1px] before:h-[1px] md:before:h-full before:left-0 md:before:left-auto md:before:-right-6 xl:before:-right-8 before:-bottom-6 md:before:top-0 before:bg-neutral-300">
                    <div className="">
                        <div className="md:flex hidden items-center gap-2">
                            <Link
                                href={{}}
                                className="text-neutral-500 text-xs font-medium"
                            >
                                {" "}
                                Snorkeling
                            </Link>
                            <Image
                                src={"/icons/badgeIcon.svg"}
                                alt="Icon"
                                width={24}
                                height={24}
                                className="w-[22px] md:w-6 h-[22px] md:h-6 inline-block"
                            />
                            <Link
                                href={{}}
                                className="text-neutral-500 text-xs font-medium"
                            >
                                {" "}
                                Private Snorkeling Excursion – Blue Brothers 1
                                (up to 5 guests, 2.5 hours)
                            </Link>
                        </div>
                        <div>
                            <p className="text-lg leading-lg font-bold text-neutral-900 tracking-xs md:my-6 my-2">
                                Overview
                            </p>
                            <div className="md:p-6 p-3 rounded-lg bg-white border border-neutral-500 mb-5">
                                <h4 className="md:text-ml text-sm font-semiBold tracking-xs md:leading-ml leading-sm md:mb-5 mb-5">
                                    Booking Details
                                </h4>
                                <div className="rounded-md bg-neutral-100 gap-2 block md:grid grid-cols-12">
                                    <Image
                                        src={
                                            "/images/booking_details_image.webp"
                                        }
                                        alt="Icon"
                                        width={335}
                                        height={250}
                                        className=" inline-block h-full w-full md:rounded-tl-md rounded-tl-md rounded-tr-md md:rounded-bl-md col-span-5 object-cover"
                                    />
                                    <div className="flex flex-col gap-3 p-4 col-span-7">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={"/icons/Clock.svg"}
                                                alt="Icon"
                                                width={24}
                                                height={24}
                                                className="w-[22px] md:w-6 h-[22px] md:h-6 inline-block"
                                            />
                                            <p className="text-xs font-semiBold leading-xs text-neutral-700">
                                                2.5 hour
                                            </p>
                                        </div>
                                        <h3 className="md:text-sm text-xs md:leading-md leading-xs font-semiBold tracking-xs">
                                            Private Snorkeling Excursion – Blue
                                            Brothers 1 (up to 5 guests, 2.5
                                            hours)
                                        </h3>
                                        <p className="md:text-xs leading-xs text-neutral-500 font-medium">
                                            Enjoy a private 2.5-hour snorkeling
                                            trip on Blue Brothers 1. Perfect for
                                            small groups of up to 5 guests –
                                            fast, flexible, and personalized.
                                        </p>

                                        <div className="flex items-center gap-1">
                                            <Image
                                                src={"/icons/rate.svg"}
                                                alt="Icon"
                                                width={80}
                                                height={16}
                                                className=" md:h-6 inline-block"
                                            />
                                            <p className=" text-2xs leading-3xs font-medium text-neutral-900">
                                                (4598 reviews)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Guest Details */}
                    <div className="py-6 border-t border-neutral-100">
                        <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                            Guest Details
                        </h4>

                        <div className=" mt-4">
                            <form className="px-3 py-6 md:p-6 border border-neutral-500 rounded-lg ">
                                <div className="flex flex-col gap-6">
                                    {/* Dynamically render guest fields */}
                                    {Array.from(
                                        { length: guestCount },
                                        (_, index) => (
                                            <div key={index}>
                                                <h5 className="text-base font-semiBold text-neutral-950 mb-4">
                                                    Guest Name{" "}
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </h5>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {/* First name */}
                                                    <div className="sm:col-span-1 col-span-2">
                                                        <fieldset className="border border-neutral-500 rounded-full">
                                                            <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                                                First Name
                                                            </legend>
                                                            <input
                                                                type="text"
                                                                id="fname"
                                                                name="fname"
                                                                placeholder="You First Name"
                                                                className="w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs placeholder:text-neutral-300 p-4 text-neutral-900"
                                                            />
                                                        </fieldset>
                                                    </div>
                                                    {/* Last name */}
                                                    <div className="sm:col-span-1 col-span-2">
                                                        <fieldset className="border border-neutral-500 rounded-full">
                                                            <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                                                Last Name
                                                            </legend>
                                                            <input
                                                                type="text"
                                                                id="lname"
                                                                name="lname"
                                                                placeholder="You Last Name"
                                                                className="w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs placeholder:text-neutral-300 p-4 text-neutral-900"
                                                            />
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="flex flex-col gap-4 md:gap-6 mt-6">
                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={handleAddGuest}
                                        className="text-xs sm:text-sm font-medium leading-sm rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 h-12 sm:h-[58px] text-neutral-50 bg-blue-700 flex w-full sm:w-auto sm:inline-flex justify-center sm:items-center transition-colors duration-200 hover:bg-blue-900"
                                    >
                                        Add Guest
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Contact Details */}
                    <div className="py-6  border-t border-neutral-100 ">
                        <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                            Contact Details
                        </h4>
                        <div className=" mt-4">
                            <form className="px-3 py-6 md:p-6 border border-neutral-500 rounded-lg ">
                                <div className="flex flex-col gap-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* First name */}
                                        <div className="sm:col-span-1  col-span-2">
                                            <fieldset className="border border-neutral-500 rounded-full">
                                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                                    First Name
                                                </legend>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    name="fname"
                                                    placeholder="You First Name"
                                                    className="w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs placeholder:text-neutral-300 p-4 text-neutral-900"
                                                />
                                            </fieldset>
                                        </div>
                                        {/* Last name */}
                                        <div className="sm:col-span-1 col-span-2">
                                            <fieldset className="border border-neutral-500 rounded-full">
                                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                                    Last Name
                                                </legend>
                                                <input
                                                    type="text"
                                                    id="lname"
                                                    name="lname"
                                                    placeholder="You Last Name"
                                                    className="w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs placeholder:text-neutral-300 p-4 text-neutral-900"
                                                />
                                            </fieldset>
                                        </div>
                                        {/* Email Address */}
                                        <div className="sm:col-span-1 col-span-2">
                                            <fieldset className="border border-neutral-500 rounded-full">
                                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                                    Choose Available Start Time
                                                </legend>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Enter your email address"
                                                    className="w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs placeholder:text-neutral-300 p-4 text-neutral-900"
                                                />
                                            </fieldset>
                                        </div>
                                        {/* Phone number */}
                                        <div className="sm:col-span-1 col-span-2">
                                            <fieldset className="border border-neutral-500 rounded-full">
                                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                                    Phone Number
                                                </legend>
                                                <input
                                                    type="number"
                                                    id="number"
                                                    name="number"
                                                    placeholder="Phone Number"
                                                    className="w-full focus:outline-none rounded-full h-14 placeholder:text-xs placeholder:leading-xs placeholder:text-neutral-300 p-4 text-neutral-900"
                                                />
                                            </fieldset>
                                        </div>

                                        {/* Write details */}
                                        <div className="col-span-2">
                                            <fieldset className="border border-neutral-500 rounded-xl ">
                                                <legend className="text-2xs font-semiBold text-neutral-900 leading-[1px] relative z-10 ml-4 before:absolute before:w-[calc(100%+8px)] before:h-5 before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:z-[-1]">
                                                    Special requests
                                                </legend>
                                                <textarea
                                                    id="custom-textarea"
                                                    placeholder="Write details"
                                                    maxLength=""
                                                    className={`w-full h-[146px] rounded-lg px-3 py-2 focus:outline-none border-0 bg-transparent`}
                                                    aria-describedby="charcount"
                                                />
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 md:gap-6 mt-6">
                                    {/* Button */}
                                    <button className="text-xs sm:text-sm font-medium leading-sm rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 h-12 sm:h-[58px] text-neutral-50 bg-blue-700 flex w-full sm:w-auto sm:inline-flex justify-center sm:items-center transition-colors duration-200 hover:bg-blue-900">
                                        Add Guest
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* checkout feature */}
                    <div className="py-6 border-t border-neutral-100">
                        {/* Others Info */}
                        <div className=" border-t border-neutral-100 pt-6">
                            <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                                Information
                            </h4>
                            <div className="mt-1">
                                <p className="text-xs leading-md text-neutral-900">
                                    Confirmation
                                </p>
                                <ul className="pl-6 flex flex-col gap-1.5 mt-1">
                                    <li className="leading-xs relative text-neutral-500 before:absolute before:content-[''] before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full before:top-4 before:-translate-y-1/2 before:-left-3.5">
                                        We’ll send you a final Booking
                                        Confirmation Email on average within 24
                                        hours. We advise you to not make any
                                        other travel arrangements before that
                                    </li>
                                    <li className="leading-xs relative text-neutral-500 before:absolute before:content-[''] before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full before:top-1/2 before:-translate-y-1/2 before:-left-3.5">
                                        In the event that you do not receive an
                                        email from us, please check your Spam
                                        folder or notify us via email
                                    </li>
                                </ul>
                            </div>

                            <div className=" mt-4">
                                <h5 className="text-neutral-900 font-semiBold text-xs leading-xs">
                                    Pick Up Information
                                </h5>
                                <p className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500">
                                    We offer pickup service from all hotels,
                                    apartments, and villas in El Gouna. We will
                                    meet you in front of your residence at the
                                    scheduled pickup time. Our driver will be
                                    wearing a Blue Brothers Diving shirt for
                                    easy identification.
                                </p>
                                <p className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500 py-4">
                                    Please indicate your hotel name and address
                                    on the checkout page
                                </p>
                                <p className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500">
                                    The dive center will reconfirm your pick up
                                    time and location at the latest one day in
                                    advance
                                </p>
                            </div>
                        </div>

                        {/* Cancellation policy */}
                        <div className=" border-t border-neutral-100 pt-6 mt-6">
                            <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs mb-3">
                                Cancellation policy
                            </h4>
                            <p className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500">
                                Full refunds will be issued for cancellations
                                made at least 24 hours prior to the activity
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-full md:col-span-6 xl:col-span-5">
                    <div className="">
                        <div className="w-full bg-white md:p-6 p-3 border border-neutral-500 rounded-lg ">
                            {/* Header */}
                            <div className="mb-6">
                                <h4 className="md:text-ml text-sm font-semiBold tracking-xs md:leading-ml leading-sm md:mb-2 mb-2">
                                    Billing summary
                                </h4>
                                <p className="text-xs font-medium leading-xs text-neutral-500">
                                    Lorem ipsum dolor sit amet consectetur.
                                    Vestibulum habitasse nulla sodales lorem eu.
                                </p>
                            </div>

                            {/* Line Items */}
                            <div className="space-y-4 mb-6 border-t border-neutral-300 pt-5">
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-950 text-sm font-semiBold ">
                                        Private Snorkeling
                                    </span>
                                    <span className="text-neutral-950 text-sm font-semiBold">
                                        196 €
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-950 text-sm font-semiBold ">
                                        Tax
                                    </span>
                                    <span className="text-neutral-950 text-sm font-semiBold">
                                        16 €
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-950 text-sm font-semiBold ">
                                        Fees
                                    </span>
                                    <span className="text-neutral-950 text-sm font-semiBold">
                                        0 €
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-neutral-300 mb-4"></div>

                            {/* Sub-total and Discount */}
                            <div className="space-y-4 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-950 text-sm font-semiBold">
                                        Sub-Total
                                    </span>
                                    <span className="text-neutral-950 text-sm font-semiBold">
                                        212 €
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-950 text-sm font-semiBold">
                                        Discount
                                    </span>
                                    <span className="text-neutral-950 text-sm font-semiBold">
                                        (-22 €)
                                    </span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="border-t border-neutral-300 mb-6"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-ml leading-ml text-neutral-900">
                                    Total
                                </span>
                                <span className="text-blue-700 text-ml leading-ml">
                                    190 €
                                </span>
                            </div>
                        </div>

                        <div className="w-full bg-white  md:p-6 p-3 border border-neutral-500 rounded-lg  mt-14">
                            {/* Header */}
                            <h2 className="md:text-ml text-sm font-semiBold tracking-xs md:leading-ml leading-sm md:mb-2 mb-2">
                                Payment Details
                            </h2>

                            {/* Card Details Section */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-4 pt-2 border-t border-neutral-300">
                                    <label className="text-xs text-neutral-500 font-medium">
                                        Card Details
                                    </label>
                                    <button className="text-xs text-neutral-500 font-medium">
                                        +Add new card
                                    </button>
                                </div>

                                {/* Card Number Input */}
                                <div className="mb-0">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="1234 1234 1234 1234"
                                            className="w-full px-4 py-3 border border-neutral-500 rounded-t-[10px] focus:outline-none "
                                        />
                                        {/* Card Logos */}
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                            <div className="flex gap-2">
                                                <Image
                                                    src={"/icons/visa.svg"}
                                                    alt="Icon"
                                                    width={20}
                                                    height={15}
                                                    className="w-[20px] md:w-4 h-[15px] md:h-3 inline-block"
                                                />
                                                <Image
                                                    src={"/icons/master.svg"}
                                                    alt="Icon"
                                                    width={20}
                                                    height={15}
                                                    className="w-[20px] md:w-4 h-[15px] md:h-3 inline-block"
                                                />
                                                <Image
                                                    src={"/icons/master2.svg"}
                                                    alt="Icon"
                                                    width={20}
                                                    height={15}
                                                    className="w-[20px] md:w-4 h-[15px] md:h-3 inline-block"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* MM/YY and CVC Row */}
                                <div className="grid grid-cols-2 ">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="px-4 py-3 border border-neutral-500 rounded-bl-[10px] focus:outline-none border-t-transparent border-r-transparent"
                                    />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="CVC"
                                            className="w-full px-4 py-3 border border-neutral-500 rounded-br-[10px] border-t-transparent focus:outline-none"
                                        />
                                        {/* Card Icon */}
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <Image
                                                src={"/icons/cvc.svg"}
                                                alt="Icon"
                                                width={24}
                                                height={24}
                                                className="w-[24px] md:w-5 h-[24px] md:h-5 inline-block"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pay Now Button */}
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-full transition-colors duration-200">
                                Pay now
                            </button>
                        </div>
                        <div className="title-summary w-full bg-white  md:p-6 p-3 border border-neutral-500 rounded-lg mt-14">
                            <h4 className="md:text-ml text-sm font-semiBold tracking-xs md:leading-ml leading-sm md:mb-2 mb-2">
                                Title summary{" "}
                            </h4>
                            <p className="text-xs font-medium leading-xs ">
                                Lorem ipsum dolor sit amet consectetur.
                                Vestibulum habitasse nulla sodales lorem eu.
                                Luctus turpis ut augue rhoncus leo turpis
                                accumsan. Sem eget sit placerat montes
                                pellentesque velit eu dictumst lacinia. Quis
                                vitae urna semper habitasse aliquet maecenas
                                vivamus felis. Gravida quam id nam risus et.
                                Volutpat volutpat neque eget eget in magna.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
