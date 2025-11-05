import TeamCard from "../TeamCard/TeamCard";

export default function TeamSection({ teamData }) {

    return (
        <section className="section-padding">
            <div className="container flex flex-col sm:grid sm:grid-cols-12 gap-6 sm:gap-8">
                {teamData?.map((member) => (
                    <TeamCard key={member.id} memberData={member} />
                ))}
            </div>
        </section>
    );
}
