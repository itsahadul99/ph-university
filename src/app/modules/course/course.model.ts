import mongoose, { Schema } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";
const preRequisiteCourseSchema = new mongoose.Schema<TPreRequisiteCourses>({
    couse: {
        type: Schema.Types.ObjectId,
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
    preQequisiteCourses: [preRequisiteCourseSchema],
}, {
    timestamps: true,
})

export const Course = mongoose.model<TCourse>('Course', CourseSchema);