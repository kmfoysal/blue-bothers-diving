import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import TeamSection from "@/components/TeamSection/TeamSection";
import { getAboutPagesData, getTeamMembers } from "@/data/about-us-loaders";

export default async function OurTeamPage() {
    // Testimonial data fetch
    const getTeamMembersData = await getTeamMembers();
    const teamMembersData =
        getTeamMembersData?.data?.sort((a, b) => b.priority - a.priority) || [];

    const getOurTeamBannerData = await getAboutPagesData("our-team");

    return (
        <main>
            <SubPageBanner
                bannerContent={getOurTeamBannerData?.data[0]?.page_banner}
            />
            <TeamSection teamData={teamMembersData} />
        </main>
    );
}
