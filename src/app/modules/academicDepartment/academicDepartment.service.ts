import AppError from "../../errors/AppError";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find().populate('academicFaculty');
    return result;
}
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const isDepartmentExists = await AcademicDepartment.findOne({ name: payload.name });
    if (isDepartmentExists) {
        throw new AppError(400, "Academic Department already exists!");
    }
    const result = await AcademicDepartment.create(payload)
    return result;
}
const updateAcademicDepartmentIntoDB = async (departmentId: string, payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.updateOne({ _id: departmentId }, payload, { new: true })
    return result;
}

const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartment.findOne({ _id: id }).populate('academicFaculty')
    return result;
}
export const AcademicDepartmentServices = {
    getAllAcademicDepartmentsFromDB,
    createAcademicDepartmentIntoDB,
    updateAcademicDepartmentIntoDB,
    getSingleAcademicDepartmentFromDB
}