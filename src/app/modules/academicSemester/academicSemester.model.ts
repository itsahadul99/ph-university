import { Schema, model } from 'mongoose';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import AppError from '../../errors/AppError';
const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            required: true,
            enum: AcademicSemesterName,
        },
        year: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: AcademicSemesterCode,
        },
        startMonth: {
            type: String,
            required: true,
            enum: Months,
        },
        endMonth: {
            type: String,
            required: true,
            enum: Months,
        },
    },
    {
        timestamps: true,
    },
);

// Check if the smester already exists

academicSemesterSchema.pre("save", async function (next) {
    const isExistsSemester = await AcademicSemester.findOne({
        name: this.name,
        year: this.year,
    })
    if (isExistsSemester) {
        throw new AppError(409,"Semester is already exists!!")
    }
    next()
})


export const AcademicSemester = model<TAcademicSemester>(
    'AcademicSemester',
    academicSemesterSchema,
);