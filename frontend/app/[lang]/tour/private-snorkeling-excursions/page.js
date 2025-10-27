import PrivateSnorkelingCourse from "@/components/PrivateSnorkelingCourse/PrivateSnorkelingCourse";
import SubPageBanner from "@/components/SubBanner/SubPageBanner";
import { getPrivateSnorkelingCardData } from "@/data/private-snorkeling-loaders";
import { getTourPagesData } from "@/data/tour-loaders";

export default async function PrivateSnorkelingExcursions() {
    const getSnorkelingExcursionsData = await getTourPagesData(
        "private-snorkeling-excursions"
    );

    const privateSnorkelingCardData = await getPrivateSnorkelingCardData();

    ;

    return (
        <main>
            <SubPageBanner
                bannerContent={
                    getSnorkelingExcursionsData?.data[0]?.page_banner
                }
            />
            <PrivateSnorkelingCourse data={privateSnorkelingCardData?.data} />
        </main>
    );
}
