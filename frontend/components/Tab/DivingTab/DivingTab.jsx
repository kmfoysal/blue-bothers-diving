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
            description: "incl. 2 dives per day",
            onSitePrice: "87 €",
            earlyBirdPrice: "82 €",
        },
        {
            id: 5,
            heading: "Early Bird Price",
            days: "from 10 diving days",
            description: "",
            onSitePrice: "87 €",
            earlyBirdPrice: "82 €",
        },
        {
            id: 6,
            heading: "Early Bird Price",
            days: "from 10 diving days",
            description: "",
            onSitePrice: "87 €",
            earlyBirdPrice: "82 €",
        },
    ],
};

export default function DivingTab() {


    const uniqueHeadings = [...new Set(
        divingData.packages
            .map(item => item.heading)
            .filter(h => h !== "")
    )];

    const tableHeaders = ["", "", ...uniqueHeadings];
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
                <p className="text-xs leading-xs italic text-neutral-500 font-default mb-4">
                    Price per day
                </p>

                {/* Table */}
                <div className="">
                    {/* Desktop Table Layout - Hidden on mobile */}
                    <div className="hidden md:block">
                        <table className="w-full border-separate price-table rounded-lg overflow-hidden">
                            <thead>
                                <tr className="text-neutral-900 bg-blue-50">
                                    {tableHeaders.map((heading, index) => (
                                        <th
                                            key={index}
                                            className={` ${heading === ""
                                                    ? "bg-gray-100"
                                                    : "text-2xs leading-xs font-medium tracking-md text-left p-4"
                                                }`}
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {divingData.packages.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'}
                                    >
                                        <td className="py-4 px-6 text-2xs leading-xs font-medium tracking-md">
                                            {item.days}
                                        </td>
                                        <td className="py-4 px-6 text-2xs leading-xs font-medium tracking-md">
                                            {item.description}
                                        </td>
                                        <td className="py-4 px-6 text-2xs leading-xs font-medium tracking-md">
                                            {item.onSitePrice}
                                        </td>
                                        <td className="py-4 px-6 text-2xs leading-xs font-medium tracking-md">
                                            {item.earlyBirdPrice}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* For Mobile version */}
                    <table className="md:hidden w-full mt-4 border-separate price-table rounded-md overflow-hidden">
                        <tbody>
                            {divingData.packages.map((packageData, index) => (
                                <tr
                                    key={packageData.id}
                                    className={`${index % 2 === 0 ? "bg-blue-50" : "bg-neutral-50"
                                        }`}>
                                    {/* Left Column - Days and Description */}
                                    <td className="p-4 align-top">
                                        <div className="text-neutral-900 text-2xs leading-xs font-semibold mb-1">
                                            {packageData.days}
                                        </div>
                                        {packageData.description && (
                                            <div className="text-neutral-900 text-2xs leading-xs font-medium">
                                                {packageData.description}
                                            </div>
                                        )}
                                    </td>

                                    {/* Right Column - Price Labels and Values */}
                                    <td className="p-4 align-top">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center gap-4">
                                                <span className="text-neutral-900 text-2xs leading-xs font-medium whitespace-nowrap">
                                                    On-Site Price
                                                </span>
                                                <span className="text-neutral-900 text-2xs leading-xs font-semibold">
                                                    {packageData.onSitePrice}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center gap-4">
                                                <span className="text-neutral-900 text-2xs leading-xs font-medium whitespace-nowrap">
                                                    Early Bird Price
                                                </span>
                                                <span className="text-neutral-900 text-2xs leading-xs font-semibold">
                                                    {packageData.earlyBirdPrice}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-xs leading-xs italic text-neutral-500 font-default mt-4">
                    Prices quoted include 2 dives per day with dive guide,
                    tanks, weights & weight belt. Excl. Rental equipment
                </p>
            </div>
        </main>
    );
}
