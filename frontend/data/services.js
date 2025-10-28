import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";

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

export async function contactFormService(formData) {
    const url = new URL("/api/contact-form-data", getStrapiURL());

    try {
        const response = await fetchAPI(url.toString(), {
            method: "POST",
            body: {
                data: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    message: formData.message,
                    agree_privacy_policy: formData.agree_privacy_policy,
                    received_newsletter: formData.received_newsletter || false,
                },
            },
        });

        return response;
    } catch (error) {
        console.error("Contact form service error:", error);
        throw error;
    }
}
