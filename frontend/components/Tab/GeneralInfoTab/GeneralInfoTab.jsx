import Image from "next/image";

export default function GeneralInfoTab() {
    return (
        <main>
            {/* Header */}
            <div className="">
                <Image
                    src="/icons/general-info-icon.png"
                    alt="Diving Icon"
                    width={96}
                    height={96}
                    className="mb-4 w-16 md:w-24 h-16 md:h-24"
                />
                <h2 className="text-neutral-900 text-lg leading-lg tracking-xs font-bold mb-2">
                    General
                </h2>
                <p className="text-neutral-500 text-xs leading-xs font-medium">
                    All prices are per person in EUR incl. 14% VAT, environmental tax and port fees. The food and drinks are charged extra on the boat.
                </p>
            </div>

            <div className="mt-6">
                <h3 className="text-md leading-ml uppercase tracking-xs font-semiBold text-neutral-900 mb-1">
                    Surcharges for special dives
                </h3>
                <p className="text-xs leading-xs italic text-neutral-500 font-default">
                    Price per day
                </p>

                <p className="text-xs leading-xs italic text-neutral-500 font-default mt-4">
                    Special dives are dependent on the number of participants and weather conditions. They can not be booked in advance!
                </p>
            </div>
        </main>
    );
}
