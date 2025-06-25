import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find();
    return result;
}
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload)
    return result;
}
const updateAcademicDepartmentIntoDB = async (semesterId: string, payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.updateOne({ _id: semesterId }, payload, { new: true })
    return result;
}

const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartment.findOne({ _id: id })
    return result;
}
export const AcademicDepartmentServices = {
    getAllAcademicDepartmentsFromDB,
    createAcademicDepartmentIntoDB,
    updateAcademicDepartmentIntoDB,
    getSingleAcademicDepartmentFromDB
}