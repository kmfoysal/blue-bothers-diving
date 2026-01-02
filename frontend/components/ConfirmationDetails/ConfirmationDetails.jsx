"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { getStrapiURL } from "@/utils/get-strapi-url";
import { format, parseISO } from "date-fns";
import { ProductContext } from "@/context";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function ConfirmationDetails() {
  const searchParams = useSearchParams();
  const { setProductData } = useContext(ProductContext);

  const [status, setStatus] = useState("loading");
  const [bookingData, setBookingData] = useState(null);
  const [copied, setCopied] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const verifyPayment = async () => {
      const code = searchParams.get("bookingCode");

      if (!code) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch(`${getStrapiURL()}/api/booking/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingCode: code }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setBookingData(data.booking);

          // ✅ Clear Cart on Success
          localStorage.removeItem("productData");
          setProductData([]);
        } else {
          console.error("Verification failed:", data);
          setStatus("error");
        }
      } catch (err) {
        console.error("Network error:", err);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [searchParams, setProductData]);

  const handleCopy = async () => {
    if (!bookingData?.bookingCode) return;
    try {
      await navigator.clipboard.writeText(bookingData.bookingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // --- HELPER: Get Product Details ---
  const getItemDetails = (item) => {
    // 1. Try to get dynamic data from the Session Relation
    const tour = item.session?.tour;
    const course = item.session?.courses_collection;
    const product = tour || course;

    return {
      // Use dynamic title, fallback to snapshot slug
      title: product?.title || product?.meta_title || item.slug,

      // Use dynamic image, fallback to snapshot image
      imageUrl: product?.page_banner?.background?.url || item.image,
      alt:
        product?.page_banner?.background?.alternativeText || "Activity Image",

      // Date from the snapshot (reliable)
      date: item.date ? format(parseISO(item.date), "dd MMM yyyy") : "Date N/A",

      // Time from the Session (dynamic)
      time: item.session?.startDateTime
        ? format(parseISO(item.session.startDateTime), "hh:mm a")
        : "08:00 AM",

      duration: product?.duration || "Standard",

      // Price & Guest Count from Schema
      price: item.itemPriceTotal || item.price,
      currency: item.itemCurrency || "EUR",
      guestCount: item.itemGuestCount || item.participants,
    };
  };

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-bold text-neutral-700">
          Finalizing Booking...
        </h2>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Booking Not Found
        </h2>
        <p className="text-neutral-600 mb-6">
          We could not retrieve your booking details.
        </p>
        <Link href="/contact" className="text-blue-600 underline">
          Contact Support
        </Link>
      </div>
    );
  }

  // Destructure for cleaner JSX
  const { leadCustomer, bookingItems } = bookingData || {};

  console.log(bookingItems);

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        {/* Header & Breadcrumb */}
        <div className="md:flex hidden items-center gap-2 mb-6">
          <Link
            href="/booking"
            className="text-neutral-500 text-xs font-medium"
          >
            Booking
          </Link>
          <span className="text-neutral-500 text-xs">/</span>
          <span className="text-neutral-500 text-xs font-medium">
            Confirmation
          </span>
        </div>

        <div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-lg font-bold tracking-xs text-blue-600">
              {bookingData?.bookingCode}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Copy"
            >
              {copied ? (
                <span className="text-xs text-green-600 font-bold">
                  Copied!
                </span>
              ) : (
                <span>📋</span>
              )}
            </button>
          </div>

          {/* Operator Badge */}
          <div className=" bg-orange-25 rounded-lg flex items-center justify-between py-3">
            <p className="text-neutral-900 text-xs font-medium">
              This reservation is handled by Blue Brothers Diving
            </p>
            <Image
              src="/icons/small-logo.svg"
              alt="Logo"
              width={40}
              height={40}
            />
          </div>

          {/* Booking Summary Card */}
          <div className="py-6 border-t border-neutral-100">
            <h4 className="text-md font-semiBold text-neutral-950 mb-6">
              Booking Confirmed
            </h4>
            <div className="p-6 bg-green-50 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Display Lead Customer Name instead of just email */}
              <div>
                <p className="text-xs text-neutral-500 mb-1">Customer</p>
                <p className="text-sm font-medium">
                  {leadCustomer?.firstName} {leadCustomer?.lastName}
                </p>
                <p className="text-xs text-neutral-400">
                  {leadCustomer?.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Total Guests</p>
                <p className="text-sm font-medium">
                  {bookingData?.guestCountTotal} People
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Total Amount</p>
                <p className="text-sm font-bold text-blue-700">
                  {bookingData?.priceTotal} {bookingData?.currency || "€"}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Payment Status</p>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${
                    bookingData?.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {bookingData?.paymentStatus || "Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* ✅ DYNAMIC PRODUCT LIST (Iterating bookingItems) */}
          <div className="py-6 border-t border-neutral-100">
            <h4 className="text-md font-semiBold text-neutral-950 mb-4">
              Your Purchase Items
            </h4>

            {bookingItems?.map((item, index) => {
              const details = getItemDetails(item);

              return (
                <div key={index} className="bg-orange-50 p-4 rounded-lg mb-4">
                  <div className="block md:grid grid-cols-12 gap-6">
                    {/* Image Section */}
                    <div className="col-span-3 h-32 md:h-full relative rounded-md overflow-hidden bg-gray-200">
                      {details.imageUrl ? (
                        <StrapiImage
                          src={details.imageUrl}
                          alt={details.alt}
                          width={400}
                          height={400}
                          className="w-full max-w-full rounded-t-md object-cover min-h-[150px] h-full"
                        />
                      ) : (
                        <Image
                          src="/images/booking_details_image.webp"
                          alt="Fallback Activity Image"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="col-span-9 flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-bold text-neutral-900 mb-2">
                            {details.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-xs text-neutral-600">
                            <span className="flex items-center gap-1">
                              🗓️ <strong>Date:</strong> {details.date}
                            </span>
                            <span className="flex items-center gap-1">
                              ⏰ <strong>Time:</strong> {details.time}
                            </span>
                            <span className="flex items-center gap-1">
                              👥 <strong>Guests:</strong> {details.guestCount}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="block text-sm font-bold text-blue-700">
                            {details.price} {details.currency}
                          </span>
                        </div>
                      </div>

                      {/* ✅ Guest List (Iterating participants_details) */}
                      {item.participants_details &&
                        item.participants_details.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-orange-100">
                            <p className="text-xs font-bold text-neutral-700 mb-2">
                              Guest List:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {item.participants_details.map((guest, idx) => (
                                <div
                                  key={idx}
                                  className="text-xs text-neutral-600"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                    {guest?.fullName}
                                    {guest?.isLead && (
                                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 rounded">
                                        Lead
                                      </span>
                                    )}
                                  </div>
                                  <p>Mobile: {guest?.participantsPhone}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="my-6 border-t border-neutral-100"></div>
          <h4 className="text-sm font-semiBold text-neutral-950 mb-2">
            Cancellation Policy
          </h4>
          <p className="text-xs text-neutral-500">
            Full refunds will be issued for cancellations made at least 24 hours
            prior to the activity.
          </p>
        </div>
      </div>
    </section>
  );
}
