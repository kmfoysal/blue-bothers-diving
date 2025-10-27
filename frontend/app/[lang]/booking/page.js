import ActivitiesBook from "@/components/ActivitiesBook/ActivitiesBook";


export default function BookingPage() {
    return (
        <main className="section-padding">
            <div className="container">
                {/* section heading */}
                <div className="text-center max-w-[918px] mx-auto">
                    <h2 className="text-lg sm:text-xl text-neutral-950 leading-ml sm:leading-xl font-bold tracking-xs mb-[2px]">
                        Activities Bookable Online
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-neutral-500 leading-sm sm:leading-md">
                        Dive into a world of aquatic excitement. Our team of
                        water sports enthusiasts is dedicated to ensuring you
                        have a fantastic time on and off the water.
                    </p>
                </div>
            </div>

            {/*  Professional Courses Card  */}
            <ActivitiesBook />
        </main>
    );
}
