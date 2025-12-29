import { format, parseISO, isAfter } from "date-fns";

export default function PricingBreakdown({
  pricingPeriods,
  pricingMode,
  className = "",
}) {
  // --- 1. Filter Valid Seasons ---
  const validSeasons =
    pricingPeriods?.filter((period) => {
      if (period.validTo) {
        const endDate = parseISO(period.validTo);
        return isAfter(endDate, new Date());
      }
      return true; // Keep open-ended dates
    }) || [];

  // --- 2. Get Tiers (from the first valid period) ---
  const activePeriod = validSeasons[0];
  const tiers = activePeriod?.sessionPricingTiers || [];

  // If no data, render nothing
  if (validSeasons.length === 0 && tiers.length === 0) return null;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* --- SEASONAL PRICING TABLE --- */}
      {validSeasons.length > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <h5 className="text-[10px] sm:text-xs font-bold text-blue-800 uppercase mb-2">
            Available Seasons
          </h5>
          <div className="flex flex-col gap-1">
            {validSeasons.map((period, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-[10px] sm:text-xs text-blue-900 border-b border-blue-100 last:border-0 pb-1 last:pb-0"
              >
                {/* Date Range */}
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {format(parseISO(period.validFrom), "d MMM yyyy")}
                    {period.validTo
                      ? ` - ${format(parseISO(period.validTo), "d MMM yyyy")}`
                      : " Onwards"}
                  </span>
                </div>

                {/* Price Display */}
                <span className="font-bold whitespace-nowrap ml-2">
                  {pricingMode === "static_per_booking"
                    ? `€${period?.staticPriceTotal} (Max ${period?.maxParticipantsIncluded})`
                    : `€${period?.pricePerParticipant} /p.p.`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MULTI-DAY TIERS --- */}
      {pricingMode === "discount_by_sessions" && tiers.length > 0 && (
        <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
          <h5 className="text-[10px] sm:text-xs font-bold text-green-800 uppercase mb-2">
            Multi-Day Discounts
          </h5>
          <div className="flex flex-col gap-1">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="flex justify-between text-[10px] sm:text-xs text-green-900 border-b border-green-100 last:border-0 pb-1 last:pb-0"
              >
                <span>
                  {tier.fromSessionCount}
                  {tier.toSessionCount ? ` - ${tier.toSessionCount}` : "+"} Days
                </span>
                <span className="font-semibold">
                  €{tier.pricePerParticipant}{" "}
                  <span className="text-green-600 font-normal">/ day</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
