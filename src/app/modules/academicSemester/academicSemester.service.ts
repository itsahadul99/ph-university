import AppError from "../../errors/AppError";
import { academicSemesterNameMapper } from "./academicSemester.constant";
import { TAcademicSemester, TUpdateAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const getAcademicSemesterFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
}
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    // Check the semester is match if not throw error
    if (academicSemesterNameMapper[payload.name] !== payload.code) {
        throw new AppError(402,"Invalid semester code !!")
    }
    const result = await AcademicSemester.create(payload)
    return result;
}
const updateAcademicSemesterIntoDB = async (semesterId: string, payload: TUpdateAcademicSemester) => {
    if (typeof (payload.name) === 'string') {
        if (academicSemesterNameMapper[payload.name] !== payload.code) {
            throw new AppError(402,"Invalid semester code !!")
        }
    }
    const result = await AcademicSemester.updateOne({ _id: semesterId }, payload, { new: true })
    return result;
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findOne({ _id: id })
    return result;
}
export const AcademicSemesterService = {
    getAcademicSemesterFromDB,
    createAcademicSemesterIntoDB,
    updateAcademicSemesterIntoDB,
    getSingleAcademicSemesterFromDB
}