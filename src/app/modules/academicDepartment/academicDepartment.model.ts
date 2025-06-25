import { model, Schema } from "mongoose";
import brcrypt from 'bcrypt';
import config from "../../config";
import { TAcademicDepartment } from "./academicDepartment.interface";
const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        require: true,
    }
}, {
    timestamps: true,
})


export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)