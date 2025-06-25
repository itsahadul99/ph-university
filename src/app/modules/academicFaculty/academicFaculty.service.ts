import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
}
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload)
    return result;
}
const updateAcademicFacultyIntoDB = async (semesterId: string, payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.updateOne({ _id: semesterId }, payload, { new: true })
    return result;
}

const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findOne({ _id: id })
    return result;
}
export const AcademicFacultyServices = {
    getAllAcademicFacultiesFromDB,
    createAcademicFacultyIntoDB,
    updateAcademicFacultyIntoDB,
    getSingleAcademicFacultyFromDB
}