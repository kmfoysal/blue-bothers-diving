"use client";

import { ProductContext } from "@/context";
import { getStrapiURL } from "@/utils/get-strapi-url";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function CheckoutDetailsOverview() {
  const { productData, removeProduct } = useContext(ProductContext);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. LEAD GUEST (Contact Details) ---
  const [leadGuest, setLeadGuest] = useState({
    fullName: "",
    email: "",
    phone: "",
    hotelName: "",
    roomNumber: "",
    notes: "",
    termsAccepted: false,
    newsletterOptIn: false,
  });

  // --- 2. PARTICIPANT DETAILS (Per Item) ---
  const [itemGuests, setItemGuests] = useState({});

  // --- Initialize Item Guests Structure ---
  useEffect(() => {
    if (productData?.length > 0) {
      setItemGuests((prev) => {
        const newState = { ...prev };
        productData.forEach((item) => {
          const currentList = newState[item.cartId] || [];
          // Ensure array length matches participant count
          if (currentList.length !== item.participants) {
            newState[item.cartId] = Array.from(
              { length: item.participants },
              (_, i) => ({
                fullName: currentList[i]?.fullName || "",
                phone: currentList[i]?.phone || "",
              })
            );
          }
        });
        return newState;
      });
    } else {
      // Redirect if cart is empty
      const timer = setTimeout(() => router.push("/booking"), 100);
      return () => clearTimeout(timer);
    }
  }, [productData, router]);

  // --- HANDLERS ---
  const handleRemoveProduct = (cartId) => {
    removeProduct(cartId);
    toast.success("Product removed");
  };

  const handleLeadChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLeadGuest((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleParticipantChange = (cartId, index, field, value) => {
    setItemGuests((prev) => {
      const list = [...(prev[cartId] || [])];
      if (!list[index]) list[index] = {};
      list[index][field] = value;
      return { ...prev, [cartId]: list };
    });
  };

  // --- CALCULATION MEMO ---
  const calculations = useMemo(() => {
    const productsTotal =
      productData?.reduce(
        (sum, item) => sum + (parseFloat(item?.price) || 0),
        0
      ) || 0;
    const taxRate = 0.14; // 14% Tax
    const tax = productsTotal * taxRate;
    const fees = 0;
    const subTotal = productsTotal + tax + fees;

    // Ensure 2 decimal places are strictly respected for the logic
    return {
      productsTotal,
      tax,
      fees,
      subTotal,
      total: parseFloat(subTotal.toFixed(2)),
    };
  }, [productData]);

  // --- SUBMIT PAYLOAD ---
  const handleSubmit = async () => {
    // 1. Validation
    if (!leadGuest.fullName || !leadGuest.email) {
      toast.error("Please fill in Name and Email.");
      return;
    }
    if (!leadGuest.termsAccepted) {
      toast.error("Please accept the Terms and Conditions.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Prepare Lead Customer Data (Split Name safely)
      const cleanLeadName = (leadGuest.fullName || "").trim();
      const firstSpaceIndex = cleanLeadName.indexOf(" ");
      const leadFirst =
        firstSpaceIndex === -1
          ? cleanLeadName
          : cleanLeadName.substring(0, firstSpaceIndex);
      const leadLast =
        firstSpaceIndex === -1
          ? "-"
          : cleanLeadName.substring(firstSpaceIndex + 1);

      // 3. Construct Payload
      const payload = {
        // Root fields
        amount: calculations.total, // Uses the exact calculation with tax
        currency: "EUR",
        locale: "en",
        newsletterOptIn: leadGuest.newsletterOptIn,
        termsAccepted: leadGuest.termsAccepted,
        source: "website",

        // Customer Object (Backend maps this to 'leadCustomer')
        customer: {
          firstName: leadFirst,
          lastName: leadLast || "-",
          email: leadGuest.email,
          phone: leadGuest.phone,
          hotelName: leadGuest.hotelName,
          roomNumber: leadGuest.roomNumber,
          notes: leadGuest.notes,
        },

        // Items Array (Backend maps this to 'bookingItems')
        items: productData.map((item) => {
          const guestsForThisItem = itemGuests[item.cartId] || [];

          // Map Participants for this specific item
          const participantsDetails = guestsForThisItem.map((guest, idx) => {
            // Logic: Fallback to Lead Guest info for first slot if empty
            const rawName =
              guest.fullName ||
              (idx === 0 ? leadGuest.fullName : `Guest ${idx + 1}`);

            // Split Guest Name
            const cleanGName = rawName.trim();
            const gSpaceIdx = cleanGName.indexOf(" ");
            const gFirst =
              gSpaceIdx === -1
                ? cleanGName
                : cleanGName.substring(0, gSpaceIdx);
            const gLast =
              gSpaceIdx === -1 ? "-" : cleanGName.substring(gSpaceIdx + 1);

            return {
              firstName: gFirst,
              lastName: gLast,
              participantsPhone:
                guest.phone || (idx === 0 ? leadGuest.phone : ""),
              isLead: idx === 0, // Mark first slot as lead for this item
            };
          });

          return {
            slug: item.slug,
            type: item.type || "tour",
            // Date format: yyyy-MM-dd
            date: item.bookingDate?.from
              ? format(new Date(item.bookingDate.from), "yyyy-MM-dd")
              : format(new Date(), "yyyy-MM-dd"),
            participants: item.participants,
            price: item.price,
            image: item.image, // Passed for reference/snapshot
            participants_details: participantsDetails,
          };
        }),
      };

      console.log("🚀 Submitting Payload:", payload);

      // 4. Send to Backend
      const apiUrl = `${getStrapiURL()}/api/booking/initiate`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Booking failed");
      }

      // 5. Handle Success / Redirect
      if (data.redirectUrl) {
        toast.success("Redirecting to Payment...");
        // Delay slightly to let toast show
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 1000);
      } else {
        // Fallback if no redirect (e.g. 100% discount or dev mode)
        toast.success("Booking Initiated!");
        router.push(`/confirmation?bookingCode=${data.bookingCode}`);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Helper: Format Booking Date ---
  const getBookingDateString = (item) => {
    if (!item?.bookingDate?.from) return "Date not selected";
    const from = new Date(item.bookingDate.from);
    const to = item.bookingDate.to ? new Date(item.bookingDate.to) : from;
    if (from.getTime() === to.getTime()) return format(from, "dd MMM yyyy");
    return `${format(from, "dd MMM")} - ${format(to, "dd MMM yyyy")}`;
  };

  return (
    <section className="py-8 md:py-16">
      <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 xl:gap-16">
        {/* --- LEFT COLUMN --- */}
        <div className="col-span-full md:col-span-6 xl:col-span-7 relative before:absolute before:content-[''] before:w-full md:before:w-[1px] before:h-[1px] md:before:h-full before:left-0 md:before:left-auto md:before:-right-6 xl:before:-right-8 before:-bottom-6 md:before:top-0 before:bg-neutral-300">
          <div className="md:flex hidden items-center gap-2">
            <Link
              href="/booking"
              className="text-neutral-500 text-xs font-medium transition-colors duration-200 hover:text-blue-700"
            >
              Booking
            </Link>
            <Image
              src={"/icons/badgeIcon.svg"}
              alt="Icon"
              width={24}
              height={24}
              className="w-[22px] md:w-6 h-[22px] md:h-6 inline-block"
            />
            <p className="text-neutral-500 text-xs font-medium">Checkout</p>
          </div>

          <div>
            <p className="text-lg leading-lg font-bold text-neutral-900 tracking-xs md:my-6 my-2">
              Overview
            </p>

            {/* CART LIST */}
            <div className="md:p-6 p-3 rounded-lg bg-white border border-neutral-500 mb-5">
              {productData?.length > 0 ? (
                <>
                  <h4 className="md:text-ml text-sm font-semiBold tracking-xs md:leading-ml leading-sm md:mb-5 mb-5">
                    Booking Details
                  </h4>
                  <div className="flex flex-col gap-5">
                    {productData?.map((item) => (
                      <div
                        key={item?.cartId}
                        className="rounded-md bg-neutral-100 gap-2 block md:grid grid-cols-12 items-center relative"
                      >
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveProduct(item?.cartId)}
                          className="absolute top-2 right-2 bg-red-200/50 backdrop:blur-sm p-2 rounded-full hover:bg-red-300/70 transition-colors z-10"
                          aria-label="Remove product"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                              fill="#ef4444"
                            />
                          </svg>
                        </button>

                        <StrapiImage
                          src={item?.image}
                          alt={item?.title || "Product Image"}
                          width={500}
                          height={500}
                          className="inline-block h-full w-full min-h-52 md:rounded-tl-md rounded-tl-md rounded-tr-md md:rounded-bl-md col-span-5 object-cover object-center"
                        />

                        <div className="flex flex-col gap-3 p-4 col-span-7">
                          <div className="flex items-center gap-2">
                            <Image
                              src={"/icons/calendar-icon.svg"}
                              alt="Date"
                              width={24}
                              height={24}
                              className="w-[18px] md:w-5 h-[18px] md:h-5 inline-block"
                            />
                            <p className="text-xs font-semiBold leading-xs text-neutral-700">
                              {getBookingDateString(item)}
                            </p>
                          </div>
                          {item?.selectedTime && (
                            <div className="flex items-center gap-2 -mt-1">
                              <Image
                                src={"/icons/Clock.svg"}
                                alt="Time"
                                width={24}
                                height={24}
                                className="w-[18px] md:w-5 h-[18px] md:h-5 inline-block"
                              />
                              <p className="text-xs font-semiBold leading-xs text-neutral-700">
                                {item.selectedTime}
                              </p>
                            </div>
                          )}
                          <h3 className="md:text-sm text-xs md:leading-md leading-xs font-semiBold tracking-xs mt-1">
                            {item?.title}
                          </h3>

                          <div className="flex items-center justify-between mt-2 pr-4">
                            <span className="text-xs font-bold text-neutral-700 bg-white border border-neutral-300 px-3 py-1.5 rounded-lg">
                              {item.participants} Guest
                              {item.participants > 1 ? "s" : ""}
                            </span>
                            <span className="text-blue-700 font-bold text-sm">
                              {parseFloat(item?.price).toFixed(2)} €
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <h4 className="md:text-ml text-sm font-semiBold text-center tracking-xs md:leading-ml leading-sm mb-5 py-10">
                  No products to checkout.
                </h4>
              )}
              <div className="flex flex-col gap-4 md:gap-6 mt-6">
                <Link
                  href="/tour"
                  className="text-xs sm:text-sm font-medium leading-sm rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 h-12 sm:h-[58px] text-neutral-900 border border-neutral-900 bg-white flex w-full sm:w-auto sm:inline-flex justify-center sm:items-center transition-colors duration-200 hover:bg-blue-700 hover:text-white hover:border-blue-500"
                >
                  + Add More
                </Link>
              </div>
            </div>
          </div>

          {/* --- CONTACT DETAILS (Lead Guest) --- */}
          {productData?.length > 0 && (
            <div className="py-6 border-t border-neutral-100">
              <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                Contact Details
              </h4>
              <div className="mt-4">
                <form className="px-3 py-6 md:p-6 border border-neutral-500 rounded-lg">
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="sm:col-span-1 col-span-2">
                        <fieldset className="border border-neutral-500 rounded-full relative px-4">
                          <legend className="text-2xs font-semiBold text-neutral-900 px-1 ml-3">
                            Full Name *
                          </legend>
                          <input
                            type="text"
                            name="fullName"
                            value={leadGuest.fullName}
                            onChange={handleLeadChange}
                            placeholder="John Doe"
                            className="w-full focus:outline-none bg-transparent h-10 text-sm text-neutral-900 placeholder:text-gray-400"
                          />
                        </fieldset>
                      </div>

                      {/* Email */}
                      <div className="sm:col-span-1 col-span-2">
                        <fieldset className="border border-neutral-500 rounded-full relative px-4">
                          <legend className="text-2xs font-semiBold text-neutral-900 px-1 ml-3">
                            Email Address *
                          </legend>
                          <input
                            type="email"
                            name="email"
                            value={leadGuest.email}
                            onChange={handleLeadChange}
                            placeholder="john@example.com"
                            className="w-full focus:outline-none bg-transparent h-10 text-sm text-neutral-900 placeholder:text-gray-400"
                          />
                        </fieldset>
                      </div>
                      {/* Phone */}
                      <div className="col-span-2">
                        <fieldset className="border border-neutral-500 rounded-full relative px-4">
                          <legend className="text-2xs font-semiBold text-neutral-900 px-1 ml-3">
                            Phone Number
                          </legend>
                          <input
                            type="tel"
                            name="phone"
                            value={leadGuest.phone}
                            onChange={handleLeadChange}
                            placeholder="+49 123 456"
                            className="w-full focus:outline-none bg-transparent h-10 text-sm text-neutral-900 placeholder:text-gray-400"
                          />
                        </fieldset>
                      </div>
                      {/* Hotel */}
                      <div className="sm:col-span-1 col-span-2">
                        <fieldset className="border border-neutral-500 rounded-full relative px-4">
                          <legend className="text-2xs font-semiBold text-neutral-900 px-1 ml-3">
                            Hotel (Pickup)
                          </legend>
                          <input
                            type="text"
                            name="hotelName"
                            value={leadGuest.hotelName}
                            onChange={handleLeadChange}
                            placeholder="e.g. Steigenberger"
                            className="w-full focus:outline-none bg-transparent h-10 text-sm text-neutral-900 placeholder:text-gray-400"
                          />
                        </fieldset>
                      </div>
                      {/* Room */}
                      <div className="sm:col-span-1 col-span-2">
                        <fieldset className="border border-neutral-500 rounded-full relative px-4">
                          <legend className="text-2xs font-semiBold text-neutral-900 px-1 ml-3">
                            Room Number
                          </legend>
                          <input
                            type="text"
                            name="roomNumber"
                            value={leadGuest.roomNumber}
                            onChange={handleLeadChange}
                            placeholder="Optional"
                            className="w-full focus:outline-none bg-transparent h-10 text-sm text-neutral-900 placeholder:text-gray-400"
                          />
                        </fieldset>
                      </div>
                      {/* Notes */}
                      <div className="col-span-2">
                        <fieldset className="border border-neutral-500 rounded-xl relative px-4 pt-2">
                          <legend className="text-2xs font-semiBold text-neutral-900 px-1 ml-3">
                            Special requests
                          </legend>
                          <textarea
                            name="notes"
                            value={leadGuest.notes}
                            onChange={handleLeadChange}
                            placeholder="Dietary requirements, sizes, etc."
                            className="w-full h-[100px] bg-transparent focus:outline-none text-sm p-2 placeholder:text-gray-400"
                          />
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* --- PARTICIPANT DETAILS (Dynamic Per Item) --- */}
          {productData?.length > 0 && (
            <div className="py-6 border-t border-neutral-100">
              <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                Guest Details (Per Activity)
              </h4>
              <div className="mt-4 flex flex-col gap-6">
                {productData?.map((item, itemIndex) => (
                  <div
                    key={item.cartId}
                    className="px-3 py-6 md:p-6 border border-neutral-500 rounded-lg bg-neutral-50/50"
                  >
                    <h5 className="text-base font-semiBold text-neutral-950 mb-4 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {item.title || item.title} - {getBookingDateString(item)}
                      </span>
                      <span className="text-xs font-normal text-neutral-500">
                        ({item.participants} Participants)
                      </span>
                    </h5>

                    <div className="flex flex-col gap-4">
                      {itemGuests[item.cartId]?.map((guest, guestIndex) => (
                        <div
                          key={guestIndex}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="col-span-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-[-10px] mt-2">
                            {guestIndex === 0 && itemIndex === 0
                              ? "Lead Guest (You)"
                              : `Guest ${guestIndex + 1}`}
                          </div>

                          <div className="sm:col-span-1 col-span-2">
                            <fieldset className="border border-neutral-500 rounded-full relative px-4 bg-white">
                              <legend className="text-2xs font-semiBold text-neutral-900 px-1 ml-3">
                                Full Name
                              </legend>
                              <input
                                type="text"
                                value={guest.fullName}
                                onChange={(e) =>
                                  handleParticipantChange(
                                    item.cartId,
                                    guestIndex,
                                    "fullName",
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  guestIndex === 0 && itemIndex === 0
                                    ? leadGuest.fullName
                                    : "Guest Name"
                                }
                                className="w-full focus:outline-none bg-transparent h-10 text-sm text-neutral-900 placeholder:text-gray-400"
                              />
                            </fieldset>
                          </div>

                          <div className="sm:col-span-1 col-span-2">
                            <fieldset className="border border-neutral-500 rounded-full relative px-4 bg-white">
                              <legend className="text-2xs font-semiBold text-neutral-900 px-1 ml-3">
                                Phone
                              </legend>
                              <input
                                type="tel"
                                value={guest.phone}
                                onChange={(e) =>
                                  handleParticipantChange(
                                    item.cartId,
                                    guestIndex,
                                    "phone",
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  guestIndex === 0 && itemIndex === 0
                                    ? leadGuest.phone
                                    : "Optional"
                                }
                                className="w-full focus:outline-none bg-transparent h-10 text-sm text-neutral-900 placeholder:text-gray-400"
                              />
                            </fieldset>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- INFORMATION SECTION --- */}
          <div>
            <div className="border-t border-neutral-100 pt-6">
              <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs">
                Information
              </h4>
              <div className="mt-1">
                <p className="text-xs leading-md text-neutral-900">
                  Confirmation
                </p>
                <ul className="pl-6 flex flex-col gap-1.5 mt-1">
                  <li className="leading-xs relative text-neutral-500 before:absolute before:content-[''] before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full before:top-4 before:-translate-y-1/2 before:-left-3.5">
                    We'll send you a final Booking Confirmation Email within 24
                    hours.
                  </li>
                  <li className="leading-xs relative text-neutral-500 before:absolute before:content-[''] before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full before:top-1/2 before:-translate-y-1/2 before:-left-3.5">
                    Check your Spam folder if not received.
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <h5 className="text-neutral-900 font-semiBold text-xs leading-xs">
                  Pick Up Information
                </h5>
                <p className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500">
                  We offer pickup service from all hotels, apartments, and
                  villas in El Gouna.
                </p>
              </div>
            </div>
            <div className="border-t border-neutral-100 pt-6 mt-6">
              <h4 className="text-sm leading-md font-semiBold text-neutral-950 tracking-xs mb-3">
                Cancellation policy
              </h4>
              <p className="text-2xs sm:text-xs leading-2xs sm:leading-xs text-neutral-500">
                Full refunds issued for cancellations made at least 24 hours
                prior.
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR (Billing & Payment) --- */}
        <div className="col-span-full md:col-span-6 xl:col-span-5">
          <div className="">
            {/* BILLING SUMMARY */}
            <div className="w-full bg-white md:p-6 p-3 border border-neutral-500 rounded-lg">
              <div className="mb-6">
                <h4 className="md:text-ml text-sm font-semiBold tracking-xs md:leading-ml leading-sm md:mb-2 mb-2">
                  Billing summary
                </h4>
                <p className="text-xs font-medium leading-xs text-neutral-500">
                  Review your total costs below.
                </p>
              </div>

              <div className="space-y-4 mb-6 border-t border-neutral-300 pt-5">
                {productData?.map((item) => (
                  <div
                    key={item?.cartId}
                    className="flex justify-between items-top gap-6"
                  >
                    <div className="flex flex-col">
                      <span className="text-neutral-950 text-sm font-semiBold">
                        {item?.title}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {getBookingDateString(item)}
                      </span>
                      <span className="text-xs text-neutral-400">
                        x {item.participants} Guests
                      </span>
                    </div>
                    <span className="text-neutral-950 text-sm font-semiBold shrink-0">
                      {parseFloat(item?.price).toFixed(2)} €
                    </span>
                  </div>
                ))}

                <div className="flex justify-between items-center">
                  <span className="text-neutral-950 text-sm font-semiBold">
                    Tax (14%)
                  </span>
                  <span className="text-neutral-950 text-sm font-semiBold">
                    {calculations.tax.toFixed(2)} €
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-950 text-sm font-semiBold">
                    Service Fees
                  </span>
                  <span className="text-neutral-950 text-sm font-semiBold">
                    {calculations.fees.toFixed(2)} €
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-300 mb-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-ml leading-ml text-neutral-900">
                  Total
                </span>
                <span className="text-blue-700 text-ml leading-ml">
                  {calculations.total.toFixed(2)} €
                </span>
              </div>
            </div>

            {/* PAYMENT DETAILS */}
            <div className="w-full bg-white md:p-6 p-3 border border-neutral-500 rounded-lg mt-14">
              <h2 className="md:text-ml text-sm font-semiBold tracking-xs md:leading-ml leading-sm md:mb-2 mb-2">
                Payment Details
              </h2>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4 pt-2 border-t border-neutral-300">
                  <label className="text-xs text-neutral-500 font-medium">
                    Secured by Saferpay
                  </label>
                </div>
                <div className="flex gap-2 opacity-60 mb-4">
                  <Image
                    src={"/icons/visa.svg"}
                    alt="Visa"
                    width={32}
                    height={20}
                    className="w-8"
                  />
                  <Image
                    src={"/icons/master.svg"}
                    alt="Master"
                    width={32}
                    height={20}
                    className="w-8"
                  />
                </div>
                <p className="text-xs text-neutral-500 mb-4">
                  You will be redirected to a secure payment page to complete
                  your booking.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={leadGuest.termsAccepted}
                    onChange={handleLeadChange}
                    className="mt-1 w-4 h-4 accent-blue-600 rounded border-gray-300"
                  />
                  <span className="text-xs text-neutral-600">
                    I accept the{" "}
                    <Link href="/terms" className="text-blue-600 underline">
                      Terms & Conditions
                    </Link>
                    .
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="newsletterOptIn"
                    checked={leadGuest.newsletterOptIn}
                    onChange={handleLeadChange}
                    className="w-4 h-4 accent-blue-600 rounded border-gray-300"
                  />
                  <span className="text-xs text-neutral-600">
                    Subscribe to newsletter.
                  </span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-full transition-colors duration-200 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Pay now"}
              </button>
            </div>

            <div className="title-summary w-full bg-white md:p-6 p-3 border border-neutral-500 rounded-lg mt-14">
              <h4 className="md:text-ml text-sm font-semiBold tracking-xs md:leading-ml leading-sm md:mb-2 mb-2">
                Booking Policy
              </h4>
              <p className="text-xs font-medium leading-xs">
                Please review your booking details carefully. By clicking "Pay
                now", you agree to our Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
