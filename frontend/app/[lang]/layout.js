import { Barlow, Playfair_Display } from "next/font/google";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TermlyCMP from "@/components/TermlyCMP/TermlyCMP";
import { Providers } from "@/context/Providers/Providers";
import {
    getGlobalSection,
    getHomeBanner,
    getNavigationData,
} from "@/data/loaders";
import "../globals.css";

// Fonts
const barlow = Barlow({
    variable: "--font-barlow",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

const playFairDisplay = Playfair_Display({
    variable: "--font-play-fair-display",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

// Termly CMP Website UUID
const WEBSITE_UUID = "54d7aa8a-c601-4e73-b901-6de915df0dfd";

// Dynamic Metadata
export async function generateMetadata() {
    const bannerSlider = await getHomeBanner();

    const siteTitle = bannerSlider?.data?.blocks?.[0]?.title || "";
    const siteDescription = bannerSlider?.data?.blocks?.[0]?.description || "";

    return {
        title: {
            default: siteTitle,
            template: `%s | ${siteTitle}`,
        },
        description: siteDescription,
        twitter: {
            card: "summary_large_image",
            title: siteTitle,
            description: siteDescription,
        },
    };
}

export default async function RootLayout({ children }) {
    const globalData = await getGlobalSection();
    const data = globalData.data;

    const navigationData = await getNavigationData("main-menu");

    return (
        <html lang="en">
            <body className={`${playFairDisplay.variable} ${barlow.variable}`}>
                <TermlyCMP websiteUUID={WEBSITE_UUID} />
                <Providers>
                    <Header data={data.header} navData={navigationData} />
                    {children}
                    <Footer data={data.footer} />
                </Providers>
            </body>
        </html>
    );
}
