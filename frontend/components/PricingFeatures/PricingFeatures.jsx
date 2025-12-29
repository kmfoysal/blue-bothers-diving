export default function PricingFeatures({ pricingMode, pricingPeriods }) {
  if (!pricingPeriods || pricingPeriods.length === 0) return null;

  return (
    <div className="mt-8 border border-neutral-200 rounded-lg overflow-hidden">
      <h3 className="bg-neutral-50 px-4 py-3 font-bold text-neutral-900 border-b border-neutral-200">
        Pricing & Seasons
      </h3>

      <div className="divide-y divide-neutral-100">
        {pricingPeriods.map((period) => (
          <div key={period.id} className="p-4 bg-white">
            {/* 1. Date Range */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded">
                {period.validFrom}{" "}
                {period.validTo ? `to ${period.validTo}` : "onwards"}
              </span>
            </div>

            {/* 2. Main Price */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-neutral-600">Base Price:</p>
                <p className="text-xl font-bold text-neutral-900">
                  {pricingMode === "static_per_booking"
                    ? `€${period.staticPriceTotal} (Total Boat)`
                    : `€${period.pricePerParticipant} / Person`}
                </p>
              </div>

              {/* Private Boat Capacity Info */}
              {pricingMode === "static_per_booking" && (
                <div className="text-right">
                  <p className="text-xs text-neutral-500">Capacity</p>
                  <p className="text-sm font-medium">
                    Up to {period.maxParticipantsIncluded} Guests
                  </p>
                </div>
              )}
            </div>

            {/* 3. Tiers (If Discount Mode) */}
            {pricingMode === "discount_by_sessions" &&
              period.sessionPricingTiers?.length > 0 && (
                <div className="mt-4 bg-green-50 p-3 rounded-md border border-green-100">
                  <p className="text-xs font-bold text-green-800 uppercase mb-2">
                    Bulk Discounts
                  </p>
                  <ul className="text-sm space-y-1">
                    {period.sessionPricingTiers.map((tier) => (
                      <li key={tier.id} className="flex justify-between">
                        <span>
                          {tier.fromSessionCount} - {tier.toSessionCount || "+"}{" "}
                          Days
                        </span>
                        <span className="font-bold">
                          €{tier.pricePerParticipant} / day
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
