import { model, Schema } from "mongoose";
import AppError from "../../errors/AppError";
import { TAcademicDepartment } from "./academicDepartment.interface";
const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    }
}, {
    timestamps: true,
})

academicDepartmentSchema.pre("updateOne", async function (next) {
    const query = this.getQuery();
    const isDepartmentExists = await this.model.findOne(query);
    if (!isDepartmentExists) {
        throw new AppError(404, "This department does not exists!")
    }
    next()
})

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)