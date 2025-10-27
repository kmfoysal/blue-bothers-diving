import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";

// export async function subscribeService(email) {
//     const url = new URL("/api/newsletters-signup", getStrapiURL());

//     try {
//         const response = await fetchAPI(url.toString(), {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 data: {
//                     email,
//                 },
//             }),
//         });

//         return response;
//     } catch (error) {
//         console.error("Subscribe service error:", error);
//         throw error;
//     }
// }

export async function subscribeService(email) {
    const url = new URL("/api/newsletters-signup", getStrapiURL());

    try {
        const response = await fetchAPI(url.toString(), {
            method: "POST",
            body: {
                data: { email },
            }, // Pass object with data wrapper, but don't stringify
        });

        return response;
    } catch (error) {
        console.error("Subscribe service error:", error);
        throw error;
    }
}
