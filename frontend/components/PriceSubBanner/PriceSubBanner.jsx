export default function PriceSubBanner({ bannerData }) {
    return (
        <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-[120px] bg-blue-50 pb-[462px]">
            {/* section heading */}
            <div className="container grid grid-cols-12 relative z-10">
                <div className="col-span-full sm:col-span-10 sm:col-start-2 text-left sm:text-center">
                    <div className="max-w-[998px] mx-auto">
                        <h1 className="text-xl sm:text-2xl leading-xl sm:leading-2xl text-neutral-900 font-play-fair-display font-black max-w-[998px] mx-auto md:mx-auto mb-3">
                            {bannerData?.title}
                        </h1>
                        <p className="text-xs sm:text-sm leading-sm md:leading-md mt-3 text-neutral-500">
                            {bannerData?.content}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
