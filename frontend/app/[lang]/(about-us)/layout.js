import CallToAction from "@/components/CallToAction/CallToAction";

export const metadata = {
    title: {
        default: "Passionate About Diving and Snorkeling in the Red Sea",
        template: "%s | Passionate About Diving and Snorkeling in the Red Sea",
    },
    description:
        "Look forward to our great team in, which awaits you in the diving center in El Gouna (Egypt). You will feel comfortable on our first class boat. Browse through our gallery and see more about us.",
    twitter: {
        card: "summary_large_image",
        title: "Passionate About Diving and Snorkeling in the Red Sea",
        description:
            "Look forward to our great team in, which awaits you in the diving center in El Gouna (Egypt). You will feel comfortable on our first class boat. Browse through our gallery and see more about us.",
    },
};

export default function AboutUsLayout({ children }) {
    return (
        <section>
            {children}
            <CallToAction />
        </section>
    );
}
