import CallToAction from "@/components/CallToAction/CallToAction";
import QuestionsElGouna from "@/components/QuestionsElGouna/QuestionsElGouna";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

export async function generateMetadata() {
    const getMetaData = await getAboutPagesData("faq");

    return {
        title: getMetaData?.data[0]?.meta_title || "",
        description: getMetaData?.data[0]?.meta_description || "",
    };
}

export default async function FAQPage() {
    const getFaqPageData = await getAboutPagesData("faq");

    return (
        <main>
            <SubPageBanner
                bannerContent={getFaqPageData?.data[0]?.page_banner}
            />
            <QuestionsElGouna />
            <CallToAction />
        </main>
    );
}
