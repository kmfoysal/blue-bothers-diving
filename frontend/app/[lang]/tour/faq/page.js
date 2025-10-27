import { Accordion } from "@/components/Accordion/Accordion";
import CallToAction from "@/components/CallToAction/CallToAction";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

const accordionData = [
    {
        id: 1,
        title: "How do I get from Hurghada Airport to El Gouna?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 2,
        title: "How far is it from Hurghada Airport to El Gouna?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 3,
        title: "What kind of suit should I bring when I dive in El Gouna?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 4,
        title: "What kind of clothes do I need in El Gouna?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 5,
        title: "Can I take small children on board?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 6,
        title: "What do I need to bring with me to dive at Blue Brothers Diving?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 7,
        title: "Can non-divers come on the boat?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
];
const SecondAccordionData = [
    {
        id: 1,
        title: "How do I get from Hurghada Airport to El Gouna?",
        content:
            "If you do not have a transfer with your travel company, we can organize a shuttle service. It is also possible to travel by cab. If you do not have a transfer with your travel company, we can organize a shuttle service. It is also possible to travel by cab. If you do not have a transfer with your travel company, we can organize a shuttle service. It is also possible to travel by cab.",
    },
    {
        id: 2,
        title: "How far is it from Hurghada Airport to El Gouna?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 3,
        title: "What kind of suit should I bring when I dive in El Gouna?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 4,
        title: "What kind of clothes do I need in El Gouna?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 5,
        title: "Can I take small children on board?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 6,
        title: "What do I need to bring with me to dive at Blue Brothers Diving?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 7,
        title: "Can non-divers come on the boat?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
    {
        id: 8,
        title: "Can non-divers come on the boat?",
        content:
            "Only if you are lucky, you will get to see a shark while diving. When snorkeling, the chance is much smaller. Even though there are incidents with sharks from time to time, it is very, very rare that anything happens. Shark accidents while diving are mostly cases of harpoon fishing or shark feeding, both of which arouse the sharks’ feeding instinct.",
    },
];

export default async function Faq() {
    const getTourFaqData = await getAboutPagesData("tour-faq");

    return (
        <main>
            <SubPageBanner
                bannerContent={getTourFaqData?.data[0]?.page_banner}
            />

            <section className="container section-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="col-span-1">
                        <Accordion accordionItem={accordionData} />
                    </div>
                    <div className="col-span-1">
                        <Accordion
                            accordionItem={SecondAccordionData}
                            defaultOpen={false}
                        />
                    </div>
                </div>
            </section>
            <CallToAction />
        </main>
    );
}
