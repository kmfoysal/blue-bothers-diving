export function getDisplayPrice(activity) {
  // 1. Safety Check
  if (
    !activity ||
    !activity?.pricingPeriods ||
    activity?.pricingPeriods?.length === 0
  ) {
    return { label: "", price: null, type: "contact" };
  }

  // 2. Get the "Main" Period (Usually the first active one or the cheapest)
  // For now, we take the first one in the list.
  const period = activity?.pricingPeriods[0];
  const mode = activity?.pricingMode;

  // 3. Logic by Mode
  if (mode === "static_per_booking") {
    // PRIVATE CHARTER: Show the total boat price
    return {
      label: "Total Price",
      price: period?.staticPriceTotal || 0,
      currency: "€",
      type: "fixed",
    };
  } else if (mode === "discount_by_sessions") {
    // COURSES: Show "From X" (Base price)
    return {
      label: "Starting from",
      price: period?.pricePerParticipant || 0,
      currency: "€",
      type: "from",
    };
  } else {
    // STANDARD TOUR: Per Person
    return {
      label: "Per Person",
      price: period?.pricePerParticipant || 0,
      currency: "€",
      type: "person",
    };
  }
}
