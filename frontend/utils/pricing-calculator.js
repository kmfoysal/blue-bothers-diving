import { isWithinInterval, parseISO, differenceInCalendarDays, isValid } from "date-fns";

export function calculateTripPrice(tour, dateFrom, dateTo, participants = 1) {
  // 1. Basic Validation
  if (!tour || !dateFrom || !isValid(dateFrom)) {
    return { price: 0, error: null }; // No error, just 0 price until valid
  }

  // 2. Normalize Dates
  const startDate = new Date(dateFrom);
  // If 'dateTo' is missing (single day trip), use startDate as endDate
  const endDate = (dateTo && isValid(dateTo)) ? new Date(dateTo) : startDate;

  // 3. Find Valid Pricing Period
  // We check if the START date falls into a valid season
  const activePeriod = tour.pricingPeriods?.find((period) => {
    const start = parseISO(period.validFrom);
    const end = period.validTo ? parseISO(period.validTo) : new Date("2099-12-31");
    // Check if our selected date is inside this period
    return isWithinInterval(startDate, { start, end });
  });

  if (!activePeriod) {
    return { price: 0, error: "No pricing available for this date." };
  }

  let finalPrice = 0;
  const mode = tour.pricingMode;

  // 4. Calculate Logic based on Mode
  if (mode === "fixed_per_participant") {
    // Simple: Price * Guests
    // Note: Usually these are 1-day trips, so days don't multiply price
    finalPrice = (activePeriod.pricePerParticipant || 0) * participants;
  } 
  else if (mode === "static_per_booking") {
    // Private Charter: Flat fee
    if (participants > (activePeriod.maxParticipantsIncluded || 100)) {
       return { price: 0, error: `Max capacity is ${activePeriod.maxParticipantsIncluded} guests.` };
    }
    finalPrice = activePeriod.staticPriceTotal || 0;
  } 
  else if (mode === "discount_by_sessions") {
    // Multi-day: Calculate duration
    // +1 because 5th to 5th is 1 day, 5th to 6th is 2 days
    const sessionCount = differenceInCalendarDays(endDate, startDate) + 1;

    // Find the Tier
    // e.g. Tier 1: 1-2 days, Tier 2: 3-5 days
    const tier = activePeriod.sessionPricingTiers?.find(
      (t) => sessionCount >= t.fromSessionCount && (!t.toSessionCount || sessionCount <= t.toSessionCount)
    );
    
    // If no tier found, fallback to base price
    const pricePerDay = tier ? tier.pricePerParticipant : (activePeriod.pricePerParticipant || 0);
    
    finalPrice = pricePerDay * participants * sessionCount;
  }

  return { 
    price: finalPrice, 
    // Calculate unit price for display
    pricePerPerson: participants > 0 ? finalPrice / participants : 0,
    currency: tour.currency || "EUR", 
    error: null 
  };
}