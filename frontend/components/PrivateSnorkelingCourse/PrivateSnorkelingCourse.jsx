import CourseCard from "../CourseCard/CourseCard";

export default function PrivateSnorkelingCourse({ data }) {
    return (
        <section className="section-padding ">
            <div className="container grid grid-cols-12 gap-4 sm:gap-8">
                {/* Card */}
                {data?.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        slugPrefix="tour"
                    />
                ))}
            </div>
        </section>
    );
}
