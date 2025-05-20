import { z } from 'zod';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';
const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
            required_error: 'Semester name is required!',
        }),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
            required_error: 'Semester code is required!',
        }),
        year: z.string({
            required_error: 'Year is required!',
        }),
        startMonth: z.enum([...Months] as [string, ...string[]]),
        endMonth: z.enum([...Months] as [string, ...string[]]),
    })
});

export const academicSemesterValidations = {
    createAcademicSemesterValidationSchema
}