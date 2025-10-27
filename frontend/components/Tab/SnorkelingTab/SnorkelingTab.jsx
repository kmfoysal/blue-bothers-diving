import Image from "next/image";

export default function SnorkelingTab() {
    return (
        <main>
            {/* Header */}
            <div className="">
                <Image
                    src="/icons/snorkeling-icon.png"
                    alt="Diving Icon"
                    width={96}
                    height={96}
                    className="mb-4 w-16 md:w-24 h-16 md:h-24"
                />
                <h2 className="text-neutral-900 text-lg leading-lg tracking-xs font-bold mb-2">
                    Snorkeling
                </h2>
                <p className="text-neutral-500 text-xs leading-xs font-medium">
                    All prices are per person in EUR incl. 14% VAT, environmental tax and port fees. The food and drinks are charged extra on the boat. The early bird price applies to bookings made at least two weeks in advance.
                </p>
            </div>

            <div className="mt-6">
                <h3 className="text-md leading-ml uppercase tracking-xs font-semiBold text-neutral-900 mb-1">
                    Full Day excursion on our big diving boat
                </h3>
                <p className="text-xs leading-xs italic text-neutral-500 font-default">
                    Price per day
                </p>

                <p className="text-xs leading-xs italic text-neutral-500 font-default mt-4">
                    Prices quoted include rental equipment
                </p>
            </div>
        </main>
    );
}
