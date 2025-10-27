import BorderButton from "../Buttons/BorderButton";
import NewCourseCard from "../NewCourseCard/NewCourseCard";

// const courseData = [
//     {
//         id: 1,
//         image: "/images/professional-courses-img-1.webp",
//         alt: "Courses Image 1",
//         title: "PADI Advanced Open Water Diver – Dive Deeper, Discover More",
//         description:
//             "The PADI Open Water Diver is PADI's first level of diving. Practice using scuba gear in a pool until you feel completely comfortable doing so.",
//         date: "3 days",
//         availability: "Availability : The whole year",
//         price: "549",
//         offerPrice: "499",
//     },
//     {
//         id: 2,
//         image: "/images/professional-courses-img-2.webp",
//         alt: "Courses Image 2",
//         title: "PADI Open Water Diver – The Most Popular Diving Certification",
//         description:
//             "The PADI Open Water Diver is PADI's first level of diving. Practice using scuba gear in a pool until you feel completely comfortable doing so.",
//         date: "5 days",
//         availability: "Availability : The whole year",
//         price: "549",
//         offerPrice: "499",
//     },
//     {
//         id: 3,
//         image: "/images/professional-courses-img-3.webp",
//         alt: "Courses Image 3",
//         title: "Drift Diving – Explore the Currents with the PADI Specialty Course",
//         description:
//             "The PADI Open Water Diver is PADI's first level of diving. Practice using scuba gear in a pool until you feel completely comfortable doing so.",
//         date: "3 days",
//         availability: "Availability : The whole year",
//         price: "549",
//         offerPrice: "499",
//     },
//     {
//         id: 4,
//         image: "/images/professional-courses-img-4.webp",
//         alt: "Courses Image 4",
//         title: "PADI Scuba Diver – Your First Step to Dive Certification",
//         description:
//             "The PADI Open Water Diver is PADI's first level of diving. Practice using scuba gear in a pool until you feel completely comfortable doing so.",
//         date: "1 days",
//         availability: "Availability : The whole year",
//         price: "549",
//         offerPrice: "499",
//     },
//     {
//         id: 5,
//         image: "/images/professional-courses-img-5.webp",
//         alt: "Courses Image 5",
//         title: "PADI Advanced Open Water Diver – Dive Deeper, Discover More",
//         description:
//             "The PADI Open Water Diver is PADI's first level of diving. Practice using scuba gear in a pool until you feel completely comfortable doing so.",
//         date: "3 days",
//         availability: "Availability : The whole year",
//         price: "549",
//         offerPrice: "499",
//     },
//     {
//         id: 6,
//         image: "/images/professional-courses-img-6.webp",
//         alt: "Courses Image 6",
//         title: "PADI Divemaster – Bring your diving experience to a new level",
//         description:
//             "The PADI Open Water Diver is PADI's first level of diving. Practice using scuba gear in a pool until you feel completely comfortable doing so.",
//         date: "10 - 12 days",
//         availability: "Availability : The whole year",
//         price: "549",
//         offerPrice: "499",
//     },
// ];

export default function ProfessionalCourses({ data, coursesData }) {
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
                        <NewCourseCard
                            key={course.id}
                            course={course}
                            slugPrefix="courses"
                        />
                    ))}
                </div>

                {/* View All Courses */}
                <div className="mt-8 sm:mt-12 flex justify-center">
                    <BorderButton href="/courses" label="View All Courses" />
                </div>
            </div>
        </section>
    );
}
