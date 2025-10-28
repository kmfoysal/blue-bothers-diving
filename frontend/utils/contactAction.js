"use server";

import { contactFormService } from "@/data/services";
import z from "zod";

const contactFormSchema = z.object({
    first_name: z.string().min(2, {
        message: "First name must be at least 2 characters",
    }),
    last_name: z.string().min(2, {
        message: "Last name must be at least 2 characters",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters",
    }),
    agree_privacy_policy: z.boolean().refine((val) => val === true, {
        message: "You must agree to the privacy policy",
    }),
    received_newsletter: z.boolean().optional(),
});

export async function contactFormAction(prevState, formData) {
    const first_name = formData.get("fname");
    const last_name = formData.get("lname");
    const email = formData.get("email");
    const message = formData.get("message");
    const agree_privacy_policy = formData.get("agree_privacy_policy") === "on";
    const received_newsletter = formData.get("receive_newsletter") === "on";

    const validatedFields = contactFormSchema.safeParse({
        first_name,
        last_name,
        email,
        message,
        agree_privacy_policy,
        received_newsletter,
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            strapiErrors: null,
            errorMessage: null,
        };
    }

    const responseData = await contactFormService(validatedFields.data);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            errorMessage: "Ops! Something went wrong. Please try again later.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            errorMessage: "Failed to submit. Please try again.",
        };
    }

    // Success case
    return {
        strapiErrors: null,
        zodErrors: null,
        errorMessage: null,
        successMessage: "Message sent successfully!",
    };
}
