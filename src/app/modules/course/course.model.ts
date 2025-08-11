import mongoose, { mongo, Schema } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from "./course.interface";
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


const assignCourseFacultySchema = new mongoose.Schema<TCourseFaculty>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        unique: true,
    },
    faculties: [{
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    }]
})

export const CourseFaculty = mongoose.model<TCourseFaculty>('CourseFaculty', assignCourseFacultySchema);