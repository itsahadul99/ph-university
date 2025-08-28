import { z } from "zod";
import { UserStatus } from "./user.constant";

const userValidationSchema = z.object({
    password: z.string().min(6).max(20, { message: "Password must be between 6 and 20 characters" }),
})
const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...UserStatus] as [string, ...string[]])
    })
})
export const userValidation = {
    userValidationSchema,
    changeStatusValidationSchema
}