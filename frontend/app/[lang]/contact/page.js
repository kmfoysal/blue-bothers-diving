import ContactInfoCard from "@/components/ContactInfoCard/ContactInfoCard";
import GoogleMap from "@/components/GoogleMap/GoogleMap";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

export default async function ContactPage() {
    const getContactPageData = await getAboutPagesData("contact");

    console.log("Contact page data:", getContactPageData?.data[0]?.blocks[0]?.map_link);

    return (
        <main>
            <SubPageBanner
                bannerContent={getContactPageData?.data[0]?.page_banner}
            />
            <ContactInfoCard />
            {/* Google Map */}
            <GoogleMap location={getContactPageData?.data[0]?.blocks[0]?.map_link} />
            {/* Gallery */}
        </main>
    );
}
