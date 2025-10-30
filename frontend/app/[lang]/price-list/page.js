import PriceListContent from "@/components/PriceListContent/PriceListContent";
import PriceSubBanner from "@/components/PriceSubBanner/PriceSubBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";

export async function generateMetadata() {
    const getMetaData = await getAboutPagesData("price-list");

    return {
        title: getMetaData?.data[0]?.meta_title || "",
        description: getMetaData?.data[0]?.meta_description || "",
    };
}

export default async function PriceList() {
    const getPriceListData = await getAboutPagesData("price-list");

    console.log("Price List page data:", getPriceListData?.data[0]?.blocks[0]);

    return (
        <main>
            <PriceSubBanner
                bannerData={getPriceListData?.data[0]?.page_banner}
            />
            <PriceListContent data={getPriceListData?.data[0]?.blocks[0]?.pricing_list_tab} />
        </main>
    );
}
