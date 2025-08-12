import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import httpStatus from 'http-status';
const createAcademicSemesterIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemester = payload.academicSemester;
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({academicSemester});
    if (isSemesterRegistrationExists) {
         throw new AppError(httpStatus.CONFLICT, "Semester Registration already exists for this academic semester");
    }
    // Check the semester is exists or not
    if (academicSemester) {
        const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);
        if (!isAcademicSemesterExists) {
            throw new AppError(httpStatus.NOT_FOUND, "Academic semester not found");
        }
    }
    const result = await SemesterRegistration.create(payload)
    return result;
}
const getAllSemesterRegistrationsFromDB = async () => {
    const result = await SemesterRegistration.find().populate('academicSemester');
    return result;
}
export const SemesterRegistrationService = {
    createAcademicSemesterIntoDB,
    getAllSemesterRegistrationsFromDB
}