import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function SubPageBanner({ bannerContent }) {
    const { title, content, background } = bannerContent;
    return (
        <section className="section-padding overflow-hidden relative h-auto sm:min-h-[444px] grid items-center before:absolute before:content-[''] before:w-full before:h-full before:inset-0 before:bg-blue-950/60 before:z-10">
            {/* Background Image */}
            <StrapiImage
                src={background?.url}
                alt={background?.alternativeText || "Banner Background"}
                quality={60}
                sizes="100vw"
                priority={true}
                width={1920}
                height={444}
                className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            />
            <div className="container grid grid-cols-12 relative z-10">
                <div className="col-span-full sm:col-span-10 sm:col-start-2 text-left sm:text-center">
                    <h1 className="text-xl sm:text-2xl leading-xl sm:leading-2xl text-neutral-50 font-play-fair-display font-black max-w-[998px] mx-auto md:mx-auto">
                        {title || "Default Title"}
                    </h1>
                    <p className="text-xs sm:text-sm leading-sm md:leading-md mt-3 text-neutral-50">
                        {content || "Default content goes here."}
                    </p>
                </div>
            </div>
        </section>
    );
}
