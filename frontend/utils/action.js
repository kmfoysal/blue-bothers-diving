"use server";

import { subscribeService } from "@/data/services";
import z from "zod";

const subscribeSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});

export async function subscribeAction(prevState, formData) {
    const email = formData.get("email");

    const validatedFields = subscribeSchema.safeParse({
        email,
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            strapiErrors: null,
        };
    }

    const responseData = await subscribeService(validatedFields.data.email);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            errorMessage: "Ops! Something went wrong. Please try again later.",
        };
    }

    if (responseData.error) {
        // ← Fixed: removed the "!"
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            errorMessage: "Failed to subscribe. Please try again.",
        };
    }

    // Success case
    return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        errorMessage: null,
        successMessage: "Successfully Subscribed!",
    };
}
