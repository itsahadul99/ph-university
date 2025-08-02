import { z } from "zod";
const preRequisiteCourseValidationSchema =
    z.object({
        course: z.string(),
        isDeleted: z.boolean().default(false)
    })
const createCourseValidationSchema = z.object({
    body: z.object({
        course: z.object({
            title: z.string().min(1, "Title is required"),
            code: z.number().int().positive("Code must be a positive integer").min(1, "Code is required"),
            credit: z.number().min(1, "Credit hours must be at least 1"),
            prefix: z.string().min(1, "Prefix is required"),
            isDeleted: z.boolean().default(false),
            preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
        }),
    })
})

const updateCourseValidationSchema = z.object({
    body: z.object({
        course: z.object({
            title: z.string().optional(),
            code: z.number().int().positive("Code must be a positive integer").optional(),
            credit: z.number().min(1, "Credit hours must be at least 1").optional(),
            prefix: z.string().min(1, "Prefix is required").optional(),
            isDeleted: z.boolean().default(false),
            preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
        }),
    })
})
export const CourseValidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema
}