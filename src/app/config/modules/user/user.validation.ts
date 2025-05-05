import { z } from "zod";

const userValidationSchema = z.object({
    password: z.string().min(6).max(20, {message: "Password must be between 6 and 20 characters"}),
})

export const userValidation = {
    userValidationSchema
}