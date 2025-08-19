import { z } from 'zod';
import { Days } from './offeredCourse.constant';
export const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        academicFaculty: z.string({
            required_error: "Academic Faculty is required",
        }),
        academicDepartment: z.string({
            required_error: "Academic Department is required",
        }),
        semesterRegistration: z.string().optional(),
        course: z.string({
            required_error: "Course is required",
        }),
        faculty: z.string({
            required_error: "Faculty is required",
        }),
        startTime: z.string().refine((time) => {
            const regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/; // HH:MM 24-hour format
            return regex.test(time);
        }, { message: "Start Time must be in HH:MM format" }),
        endTime: z.string().refine((time) => {
            const regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
            return regex.test(time);
        }, { message: "End Time must be in HH:MM format" }),
        maxCapacity: z.number({
            required_error: "Max Capacity is required",
        }).min(1, "Max Capacity must be at least 1"),
        days: z.enum([...Days] as [string, ...string[]], {
            required_error: "Days is required",
        }),
        section: z.number({
            required_error: "Section is required",
        }).min(1, "Section must be at least 1"),
    }).refine((body) => {
        // startTime and endTime should not be the same
        const startDate = new Date(`1970-01-01T${body.startTime}:00`);
        const endDate = new Date(`1970-01-01T${body.endTime}:00`);
        return startDate < endDate;
    }, {
        message: "Start Time must be earlier than End Time",
    }),
});


export const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty: z.string().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        maxCapacity: z.number().min(1).optional(),
        days: z.enum([...Days] as [string, ...string[]]).optional(),
    }),
});

export const offeredCourseValidation = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema,
};
