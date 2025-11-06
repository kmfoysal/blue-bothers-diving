import BookableCard from "../BookableCard/BookableCard";
import BorderButton from "../Buttons/BorderButton";

export default function ToursActivities({ data, coursesData }) {
    const { section_heading } = data;
    return (
        <section className="section-padding">
            <div className="container">
                {/* section heading */}
                <div className="text-center max-w-[918px] mx-auto">
                    <span className="text-blue-700 text-2xs sm:text-sm font-medium leading-3xs sm:leading-md tracking-xl mb-[2px]">
                        {section_heading?.sub_title}
                    </span>
                    <h2 className="text-lg sm:text-xl text-neutral-950 leading-ml sm:leading-xl font-bold tracking-xs mb-[2px]">
                        {section_heading?.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-neutral-500 leading-sm sm:leading-md">
                        {section_heading?.description}
                    </p>
                </div>

                {/*  Professional Courses Card  */}
                <div className="grid grid-cols-12 gap-4 sm:gap-8 mt-6 sm:mt-12">
                    {/* Card */}
                    {coursesData.map((course) => (
                        <BookableCard
                            key={course.id}
                            course={course}
                            slugPrefix="booking"
                        />
                    ))}
                </div>

                {/* View All Courses */}
                <div className="mt-8 sm:mt-12 flex justify-center">
                    <BorderButton href="/booking" label="View All Courses" />
                </div>
            </div>
        </section>
    );
}
