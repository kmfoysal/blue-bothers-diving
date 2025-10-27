import Link from "next/link";

export default function UnderwaterAdventure({ data }) {
    // Data Destructuring
    const { highlight_content, right_content } = data;
    return (
        <section className="pt-[168px] sm:pt-[236px] pb-12 sm:pb-[120px] bg-blue-1000">
            <div className="container grid grid-cols-12 gap-6">
                <div className="col-span-full sm:col-span-6 flex flex-col gap-4 sm:gap-6">
                    {highlight_content?.map((highlightContent) => (
                        <div key={highlightContent.id} className="p-4 bg-blue-950/0 border border-blue-500/0 rounded-md transition-colors duration-300 hover:bg-blue-950 hover:border-blue-500">
                            <h4 className="text-md sm:text-ml text-neutral-50 font-semiBold leading-sm sm:leading-ml tracking-xs mb-2">
                                {highlightContent?.title || "Set your title"}
                            </h4>
                            <p className="text-xs sm:text-sm leading-sm sm:leading-md font-medium text-neutral-300 mb-4 sm:mb-6">
                                {highlightContent?.content || "Set your content"}
                            </p>
                            <Link
                                href={highlightContent?.cta?.href}
                                className="inline-flex items-center text-neutral-50"
                            >
                                {highlightContent?.cta?.label || "Set your label"}
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.4601 9.99951L8.86151 16.7974L8.27167 16.4849L11.5822 10.2339L11.7062 10.0005L11.5822 9.76611L8.27167 3.51416L8.86151 3.20166L12.4601 9.99951Z"
                                        stroke="#E0E0E0"
                                    />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="col-span-full sm:col-span-6">
                    <p className="text-2xs sm:text-sm leading-md font-medium tracking-[6px] text-neutral-50 mb-[2px]">
                        {right_content?.sub_title || "Set your subtitle"}
                    </p>
                    <h2 className="text-lg sm:text-xl leading-ml sm:leading-xl tracking-xs font-bold text-neutral-50 mb-2 sm:mb-4">
                        {right_content?.title || "Set your title"}
                    </h2>
                    <p className="text-xs sm:text-sm leading-sm sm:leading-md font-medium text-neutral-300 mb-6 sm:mb-10">
                        {right_content?.content || "Set your title"}
                    </p>

                    <Link
                        href={right_content?.cta?.href}
                        className="border border-neutral-100 text-xs sm:text-sm font-medium leading-sm rounded-full px-8 py-3.5 text-neutral-100 flex justify-center sm:justify-start sm:inline-flex w-full sm:w-auto items-center transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-950 h-12 sm:h-[58px]"
                    >
                        {right_content?.cta?.label || "Set your title"}
                    </Link>
                </div>
            </div>
        </section>
    );
}
