import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: "Academic Department name must be a string" , required_error: "Academic Department name is required" }),
        academicFaculty: z.string({invalid_type_error: "Academic department ID must be a string" })
    }),
})
const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: "Academic Department name must be a string" , required_error: "Academic Department name is required" }),
        academicFaculty: z.string({invalid_type_error: "Academic Department ID must be a string", required_error: "Academic Department ID is required" }).optional()
    }),
})
export const academicDepartmentValidtions = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}