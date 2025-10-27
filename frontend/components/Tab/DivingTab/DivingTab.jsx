import Image from "next/image";

// JSON data for diving packages
const divingData = {
    packages: [
        {
            id: 1,
            heading: "",
            days: "1-2 diving days",
            description: "incl. 2 dives per day",
            onSitePrice: "99 €",
            earlyBirdPrice: "94 €",
        },
        {
            id: 2,
            heading: "",
            days: "3-4 diving days",
            description: "incl. 2 dives per day",
            onSitePrice: "94 €",
            earlyBirdPrice: "89 €",
        },
        {
            id: 3,
            heading: "On-Site Price",
            days: "5-9 Diving days",
            description: "incl. 2 dives per day",
            onSitePrice: "90 €",
            earlyBirdPrice: "85 €",
        },
        {
            id: 4,
            heading: "Early Bird Price",
            days: "from 10 diving days",
            description: "",
            onSitePrice: "87 €",
            earlyBirdPrice: "82 €",
        },
    ],
};

export default function DivingTab() {
    return (
        <main>
            {/* Header */}
            <div className="">
                <Image
                    src="/icons/diving-icon.png"
                    alt="Diving Icon"
                    width={96}
                    height={96}
                    className="mb-4 w-16 md:w-24 h-16 md:h-24"
                />
                <h2 className="text-neutral-900 text-lg leading-lg tracking-xs font-bold mb-2">
                    Diving
                </h2>
                <p className="text-neutral-500 text-xs leading-xs font-medium">
                    All prices are per person in EUR incl. 14% VAT,
                    environmental tax and port fees. The food and drinks are
                    charged extra on the boat.
                </p>
            </div>

            <div className="mt-6">
                <h3 className="text-md leading-ml uppercase tracking-xs font-semiBold text-neutral-900 mb-1">
                    Full day diving trips
                </h3>
                <p className="text-xs leading-xs italic text-neutral-500 font-default">
                    Price per day
                </p>

                {/* Table */}
                <div className="">
                    {/* For Desktop version */}
                    <table className="w-full mt-4 border-separate price-table rounded-lg overflow-hidden">
                        <thead>
                            <tr className="text-neutral-900 text-3xs md:text-2xs leading-xs font-medium tracking-md bg-blue-50">
                                {divingData.packages.map((packageData) => (
                                    <th
                                        key={packageData.id}
                                        className="text-left p-4"
                                    >
                                        {packageData.heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {divingData.packages.map((packageData) => (
                                <tr
                                    key={packageData.id}
                                    className="text-neutral-500 text-3xs md:text-xs leading-3xs md:leading-xs font-medium tracking-xs"
                                >
                                    <td className="p-4 text-neutral-900">
                                        {packageData.days}
                                    </td>
                                    <td className="p-4 text-neutral-900">
                                        {packageData.description}
                                    </td>
                                    <td className="p-4 text-neutral-900">
                                        {packageData.onSitePrice}
                                    </td>
                                    <td className="p-4 text-neutral-900">
                                        {packageData.earlyBirdPrice}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* For Mobile version */}
                </div>

                <p className="text-xs leading-xs italic text-neutral-500 font-default mt-4">
                    Prices quoted include 2 dives per day with dive guide,
                    tanks, weights & weight belt. Excl. Rental equipment
                </p>
            </div>
        </main>
    );
}
