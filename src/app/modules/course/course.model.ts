import mongoose, { Schema } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";
const preRequisiteCourseSchema = new mongoose.Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
})
const CourseSchema = new mongoose.Schema<TCourse>({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
        trim: true,
    },
    credit: {
        type: Number,
        required: true,

    },
    preRequisiteCourses: [preRequisiteCourseSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

export const Course = mongoose.model<TCourse>('Course', CourseSchema);