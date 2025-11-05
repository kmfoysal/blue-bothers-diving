import { StrapiImage } from "@/components/StrapiImage/StrapiImage";

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

export default function DivingTab({ data }) {

    return (
        <main>
            {/* Header */}

            <div className="">
                <StrapiImage
                    src={data?.icon?.url}
                    alt={data?.icon?.alternativeText || "Diving Icon"}
                    width={96}
                    height={96}
                    className="mb-4 w-16 md:w-24 h-16 md:h-24"
                />
                <h2 className="text-neutral-900 text-lg leading-lg tracking-xs font-bold mb-2">
                    {data?.title}
                </h2>
                <p className="text-neutral-500 text-xs leading-xs font-medium">
                    {data?.description}
                </p>
            </div>

            {/* Pricing Table */}
            {data?.pricing_table?.map((tableContent) => (
                <div key={tableContent?.id} className="mt-6">
                    {tableContent?.title && (
                        <h3 className="text-md leading-ml uppercase tracking-xs font-semiBold text-neutral-900 mb-1">
                            {tableContent?.title}
                        </h3>
                    )}

                    {tableContent?.sub_title && (
                        <p className="text-xs leading-xs italic text-neutral-500 font-default mb-4">
                            {tableContent?.sub_title}
                        </p>
                    )}

                    {/* Table */}

                    {/* Desktop Table Layout - Hidden on mobile */}
                    <div className="overflow-x-auto table-scrollbar">
                        <table className="w-full border-separate price-table rounded-lg overflow-x-auto min-w-[580px]">
                            <thead className="w-full">
                                <tr className="text-neutral-900 bg-blue-50">
                                    {tableContent?.pricing_column?.list_row_item.map(
                                        (heading, index) => (
                                            <th
                                                key={index}
                                                className={` ${
                                                    heading === ""
                                                        ? "bg-gray-100"
                                                        : "text-2xs leading-xs font-medium tracking-md text-left p-3 md:p-4"
                                                }`}
                                            >
                                                {heading?.text_list_item}
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {tableContent?.price_row_item?.map(
                                    (item, index) => (
                                        <tr
                                            key={index}
                                            className={
                                                index % 2 === 0
                                                    ? "bg-blue-100"
                                                    : "bg-blue-50"
                                            }
                                        >
                                            {item?.price_row?.map((row) => (
                                                <td
                                                    key={row?.id}
                                                    className="p-3 md:py-4 md:px-6 text-2xs leading-xs font-medium tracking-md"
                                                >
                                                    {row?.text}
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4">
                        {tableContent?.note
                            ?.split("\n\n")
                            .map((content, index) => (
                                <p
                                    key={index}
                                    className="text-2xs md:text-xs md:leading-xs italic text-neutral-500 font-default mt-2"
                                >
                                    {content || "Default Content"}
                                </p>
                            ))}
                    </div>
                </div>
            ))}
        </main>
    );
}
