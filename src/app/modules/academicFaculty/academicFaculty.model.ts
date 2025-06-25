import { model, Schema } from "mongoose";
import brcrypt from 'bcrypt';
import config from "../../config";
import { TAcademicFaculty } from "./academicFaculty.interface";
const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        require: true,
        unique: true,
    },
}, {
    timestamps: true,
})


export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema)