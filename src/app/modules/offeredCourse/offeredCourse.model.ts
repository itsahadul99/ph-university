import { Schema, model } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { Days } from './offeredCourse.constant';
const offeredCourseSchema = new Schema<TOfferedCourse>(
    {
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
            unique: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
            required: true,
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
            required: true,
        },
        semesterRegistration: {
            type: Schema.Types.ObjectId,
            ref: "SemesterRegistration"
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        faculty: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        },

        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        maxCapacity: {
            type: Number,
            required: true
        },
        days: [{
            type: String,
            enum: Days,
        }],
        section: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
    },
);


export const OfferedCourse = model<TOfferedCourse>(
    'OfferedCourse',
    offeredCourseSchema,
);