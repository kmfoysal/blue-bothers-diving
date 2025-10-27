import CallToAction from "@/components/CallToAction/CallToAction";
import QuestionsElGouna from "@/components/QuestionsElGouna/QuestionsElGouna";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

const bannerContent = {
    title: "Frequently asked questions",
    content:
        "Dive into a world of aquatic excitement. Our team of water sports enthusiasts is dedicated to ensuring you have a fantastic time on and off the water.",
    image: "/images/faq-banner-bg.jpg",
};

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
