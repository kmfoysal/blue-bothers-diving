import PrivateSnorkelingCourse from "@/components/PrivateSnorkelingCourse/PrivateSnorkelingCourse";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getAboutPagesData } from "@/data/about-us-loaders";
import { getTourPagesData } from "@/data/tour-loaders";

export async function generateMetadata() {
    const getMetaData = await getTourPagesData("private-snorkeling-excursions");

    return {
        title: getMetaData?.data[0]?.title || "",
        description: getMetaData?.data[0]?.description || "",
    };
}

export default async function Tour() {
    const getSnorkelingExcursionsData = await getTourPagesData(
        "private-snorkeling-excursions"
    );

    // Page Banner
    const getTourPageData = await getAboutPagesData("tour");

    // const privateSnorkelingCardData = await getPrivateSnorkelingCardData();
    const tourCollectionData = await getTourPagesData();

    return (
        <main>
            <SubPageBanner
                bannerContent={
                    getTourPageData?.data[0]?.page_banner
                }
            />
            <PrivateSnorkelingCourse data={tourCollectionData?.data} />
        </main>
    );
}
