import ContactInfoCard from "@/components/ContactInfoCard/ContactInfoCard";
import GoogleMap from "@/components/GoogleMap/GoogleMap";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

export async function generateMetadata() {
    const getOurBoatData = await getAboutPagesData("contact");

    return {
        title: getOurBoatData?.data[0]?.meta_title || "",
        description: getOurBoatData?.data[0]?.meta_description || "",
    };
}

export default async function ContactPage() {
    const getContactPageData = await getAboutPagesData("contact");

    return (
        <main>
            <SubPageBanner
                bannerContent={getContactPageData?.data[0]?.page_banner}
            />
            <ContactInfoCard
                contactInfo={getContactPageData?.data[0]?.blocks[0]}
            />
            {/* Google Map */}
            <GoogleMap
                location={getContactPageData?.data[0]?.blocks[1]?.map_link}
            />
            {/* Gallery */}
        </main>
    );
}
