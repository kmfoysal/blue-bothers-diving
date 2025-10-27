"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react';



export default function ConfirmationDetails() {

    const [copied, setCopied] = useState(false);
    const code = "OD43MN";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <section className="py-8 md:py-16">
            <div className="container ">
                <div className="md:flex hidden items-center gap-2">
                    <Link href={{}} className="text-neutral-500 text-xs font-medium"> Snorkeling</Link>
                    <Image
                        src={"/icons/badgeIcon.svg"
                        }
                        alt="Icon"
                        width={24}
                        height={24}
                        className="w-[22px] md:w-6 h-[22px] md:h-6 inline-block" />
                    <Link href={{}} className="text-neutral-500 text-xs font-medium"> Private Snorkeling Excursion – Blue Brothers 1 (up to 5 guests, 2.5 hours)</Link>
                </div>
                <div className="">
                    <div className="">
                        {/* Copy Code Display */}
                        <div className="flex items-center gap-3 mt-6">
                            <span className="text-lg leading-lg font-bold tracking-xs ">
                                {code}
                            </span>

                            {/* Copy Button */}
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative group"
                                title="Copy to clipboard"
                            >
                                {copied ? (
                                    // Checkmark Icon (Copied)
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-green-600"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    // Copy Icon
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.83317 5.00002V2.50002C5.83317 2.03979 6.20627 1.66669 6.6665 1.66669H16.6665C17.1267 1.66669 17.4998 2.03979 17.4998 2.50002V14.1667C17.4998 14.6269 17.1267 15 16.6665 15H14.1665V17.4993C14.1665 17.9599 13.7916 18.3334 13.3275 18.3334H3.33888C2.87549 18.3334 2.5 17.9629 2.5 17.4993L2.50217 5.83408C2.50225 5.37345 2.8772 5.00002 3.34118 5.00002H5.83317ZM4.16868 6.66669L4.16682 16.6667H12.4998V6.66669H4.16868ZM7.49983 5.00002H14.1665V13.3334H15.8332V3.33335H7.49983V5.00002Z" fill="#4B4B4B" />
                                    </svg>

                                )}
                            </button>
                        </div>

                        {/* Copied Message */}
                        {copied && (
                            <p className="text-sm text-green-600 mt-2 animate-pulse">
                                Copied to clipboard!
                            </p>
                        )}
                    </div>


                    <div className='p-6 bg-orange-25 rounded-lg flex items-center justify-between my-6'>
                        <p className='text-neutral-900 text-xs font-medium leading-ml'>This reservation is handled by:</p>

                        <Image
                            src={"/icons/small-logo.svg"}
                            alt="Icon"
                            width={52}
                            height={52}
                            className="inline-block"
                        />

                    </div>
                    <div className="py-6 border-t border-neutral-100">
                        <h4 className="md:text-ml text-sm leading-md font-semiBold text-neutral-950 tracking-xs mb-6">
                            Booking confirmed
                        </h4>
                        <div className='p-6 bg-orange-25 rounded-lg '>
                            <div className='grid grid-cols-3 md:gap-0 gap-5'>
                                <div className=' md:col-span-1 col-span-3'>
                                    <div className=' mb-5'>
                                        <p className='text-xs font-medium leading-xs text-neutral-500'>Source</p>
                                        <p className=' text-sm font-semiBold leading-md text-neutral-900'>Blue Brothers Diving</p>
                                    </div>
                                    <div className=' mb-5'>
                                        <p className='text-xs font-medium leading-xs text-neutral-500'>Status</p>
                                        <p className=' text-xs text-green-450 font-medium mt-2 leading-md  bg-green-150 inline-flex rounded-full px-3 py-1'>Confirmed</p>
                                    </div>
                                    <div className=''>
                                        <p className='text-xs font-medium leading-xs text-neutral-500'>Guest email</p>
                                        <p className=' text-xs font-medium  leading-md text-neutral-900 inline-flex rounded-full'>testmode@example.com</p>
                                    </div>
                                </div>
                                <div className='md:col-span-1 col-span-3'>
                                    <div className='mb-5'>
                                        <p className='text-xs font-medium leading-xs text-neutral-500'>Issuing date</p>
                                        <p className=' text-xs font-medium  leading-md text-neutral-900 inline-flex rounded-full'>06/02/2025</p>
                                    </div>
                                    <div className='mb-5'>
                                        <p className='text-xs font-medium leading-xs text-neutral-500'>Guest phone number</p>
                                        <p className=' text-xs font-medium  leading-md text-neutral-900 inline-flex rounded-full'>+44 07242242424</p>
                                    </div>
                                    <div className=''>
                                        <p className='text-xs font-medium leading-xs text-neutral-500'>Guests</p>
                                        <p className=' text-xs font-medium  leading-md text-neutral-900 inline-flex rounded-full'>Hector Price</p>
                                    </div>
                                </div>
                            </div>
                            <div className='my-6 border-t border-neutral-100'> </div>
                            <p className='text-xs font-medium  leading-md text-neutral-900 inline-flex rounded-full'>You’ll need these details to manage your booking.</p>

                        </div>
                    </div>
                    <div className="py-6 border-t border-neutral-100">
                        <h4 className="md:text-ml text-sm leading-md font-semiBold text-neutral-950 tracking-xs mb-6">
                            Booking Details
                        </h4>
                        <div className='p-6 bg-orange-25 rounded-lg '>
                            <div className="rounded-md bg-neutral-100 gap-2 block md:grid grid-cols-12">
                                <Image
                                    src={"/images/booking_details_image.webp"}
                                    alt="Icon"
                                    width={335}
                                    height={224}
                                    className=" inline-block h-full w-full md:rounded-tl-md rounded-tl-md rounded-tr-md md:rounded-bl-md col-span-3 object-contain"
                                />
                                <div className="flex flex-col gap-3 p-4 col-span-9 max-w-[583px] w-full">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={"/icons/Clock.svg"
                                            }
                                            alt="Icon"
                                            width={24}
                                            height={24}
                                            className="w-[22px] md:w-6 h-[22px] md:h-6 inline-block"
                                        />
                                        <p className="text-xs font-semiBold leading-xs text-neutral-700">2.5 hour</p>
                                    </div>
                                    <h3 className="md:text-sm text-xs md:leading-md leading-xs font-semiBold tracking-xs">Private Snorkeling Excursion – Blue Brothers 1 (up to 5 guests, 2.5 hours)</h3>
                                    <p className="md:text-xs leading-xs text-neutral-500 font-medium">Enjoy a private 2.5-hour snorkeling trip on Blue Brothers 1. Perfect for small groups of up to 5 guests – fast, flexible, and personalized.</p>

                                    <div className="flex items-center gap-1">
                                        <Image
                                            src={"/icons/rate.svg"
                                            }
                                            alt="Icon"
                                            width={80}
                                            height={16}
                                            className=" md:h-6 inline-block"
                                        />
                                        <p className=" text-2xs leading-3xs font-medium text-neutral-900">(4598 reviews)</p>
                                    </div>
                                </div>
                            </div>

                            <div className='my-6 border-t border-neutral-100'> </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div className=''>
                                    <p className='text-2xs font-medium leading-xs text-neutral-500'>Check in</p>
                                    <p className=' text-xs font-medium  leading-md text-neutral-900 inline-flex rounded-full'>Tue 18 Feb</p>
                                    <p className='text-2xs font-medium leading-xs text-neutral-500'>from 14:00 </p>
                                </div>
                                <div className=''>
                                    <p className='text-2xs font-medium leading-xs text-neutral-500'>Check out</p>
                                    <p className=' text-xs font-medium  leading-md text-neutral-900 inline-flex rounded-full'>Thu 20 Feb</p>
                                    <p className='text-2xs font-medium leading-xs text-neutral-500'>until 12:00</p>
                                </div>
                            </div>
                        </div>


                        <div className='my-6 border-t border-neutral-100'></div>

                        <h4 className="md:text-ml text-sm leading-md font-semiBold text-neutral-950 tracking-xs mb-6">
                            Contact details
                        </h4>

                        <div className=" p-6 bg-orange-25 rounded-lg ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                                {/* Email Section */}
                                <div className="flex items-start gap-4 border-r border-neutral-100">
                                    {/* Email Icon */}
                                    <div className="flex-shrink-0 ">
                                        <Image
                                            src={"/icons/email.svg"}
                                            alt="Icon"
                                            width={52}
                                            height={52}
                                            className="inline-block"
                                        />
                                    </div>

                                    {/* Email Text */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-2xs font-medium text-neutral-500 tracking-md">email</p>
                                        <p className=" text-xs leading-xs font-semiBold text-neutral-900">
                                            testmode@example.com
                                        </p>
                                    </div>
                                </div>

                                {/* Phone Section */}
                                <div className="flex items-start gap-4">
                                    {/* Phone Icon */}
                                    <div className="flex-shrink-0">
                                        <Image
                                            src={"/icons/call.svg"}
                                            alt="Icon"
                                            width={52}
                                            height={52}
                                            className="inline-block"
                                        />

                                    </div>

                                    {/* Phone Text */}
                                    <div className="flex-1 min-w-0">
                                        <p className="ttext-2xs font-medium text-neutral-500 tracking-md">Phone</p>
                                        <p className="text-xs leading-xs font-semiBold text-neutral-900">
                                            +44 07242242424
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='my-6 border-t border-neutral-100'></div>

                        <h4 className="md:text-ml text-sm leading-md font-semiBold text-neutral-950 tracking-xs mb-6">
                            Billing summary
                        </h4>

                        <div>
                            <div className="bg-orange-25 rounded-lg p-6">
                                {/* Header */}
                                    <h2 className="text-neutral-900 font-semiBold text-sm tracking-xs mb-5">
                                        Pay now
                                    </h2>

                                {/* Items List */}
                                <div className="">
                                    {/* Private Snorkeling */}
                                    <div className="flex justify-between items-center px-6 sm:px-8 py-5 bg-neutral-50">
                                        <span className=" text-xs font-semiBold text-neutral-500">Private Snorkeling</span>
                                        <span className=" text-xs font-semiBold text-neutral-500">196 €</span>
                                    </div>

                                    {/* Tax */}
                                    <div className="flex justify-between items-center px-6 sm:px-8 py-5 bg-blue-50">
                                        <span className="text-xs font-semiBold text-neutral-500">Tax</span>
                                        <span className="text-xs font-semiBold text-neutral-500">16 €</span>
                                    </div>

                                    {/* Fees */}
                                    <div className="flex justify-between items-center px-6 sm:px-8 py-5 bg-neutral-50">
                                        <span className="text-xs font-semiBold text-neutral-500">Fees</span>
                                        <span className="text-xs font-semiBold text-neutral-500">0 €</span>
                                    </div>

                                    {/* Sub-Total */}
                                    <div className="flex justify-between items-center px-6 sm:px-8 py-5 bg-blue-50">
                                        <span className="text-xs font-semiBold text-neutral-500">Sub-Total</span>
                                        <span className="text-xs font-semiBold text-neutral-500">212 €</span>
                                    </div>

                                    {/* Discount */}
                                    <div className="flex justify-between items-center px-6 sm:px-8 py-5 bg-neutral-50">
                                        <span className="text-xs font-semiBold text-neutral-500">Discount</span>
                                        <span className="text-xs font-semiBold text-neutral-500">(-22 €)</span>
                                    </div>

                                    {/* Total */}
                                    <div className="flex justify-between items-center px-6 sm:px-8 py-6 bg-blue-50">
                                        <span className="text-neutral-900 font-semiBold tracking-xs">Total</span>
                                        <span className="text-neutral-900 font-semiBold tracking-xs">190 €</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='my-6 border-t border-neutral-100'></div>
                         <h4 className="md:text-ml text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                                Cancellation policy
                            </h4>
                            <div className="mt-4">
                                <p className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500">
                                    Full refunds will be issued for cancellations made at least 24 hours prior to the activity

                                </p>
                            </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
