import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import httpStatus from 'http-status';
const createAcademicSemesterIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemester = payload.academicSemester;

    const isThereanyOngoingSemesterRegistration = await SemesterRegistration.findOne(
        {
            $or: [
                { status: "ONGOING" },
                { status: "UPCOMING" }
            ]
        }
    )
    if (isThereanyOngoingSemesterRegistration) {
        throw new AppError(httpStatus.CONFLICT, "There is already an ongoing or upcoming semester registration");
    }

    const isSemesterRegistrationExists = await SemesterRegistration.findOne({ academicSemester });
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
const getAllSemesterRegistrationsFromDB = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(
        SemesterRegistration.find().populate('academicSemester'),
        query
    ).filter()
        .sort()
        .paginate()
        .fields()
    const result = await semesterRegistrationQuery.modelQuery;
    return result;
}
const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id).populate('academicSemester');
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Semester Registration not found");
    }
    return result;
}
const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
    const currentSemesterRegistrationStatus = isSemesterRegistrationExists?.status;
    const requestedStatus = payload?.status;
    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Semester Registration not found");
    }
    if (currentSemesterRegistrationStatus === "ENDED") {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot update an ended semester registration");
    }
    // UPCOMING --> ONGOING --> ENDED ( Business Logic )
    // This logic ensures that the status can only be changed in a specific order
    if (currentSemesterRegistrationStatus === "UPCOMING" && requestedStatus === "ENDED") {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the status from UPCOMING to ENDED directly. Please change it to ONGOING first.");
    }
    if (currentSemesterRegistrationStatus === "ONGOING" && requestedStatus === "UPCOMING") {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the status from ONGOING to UPCOMING. Please change it to ENDED first.");
    }
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, { new: true }).populate('academicSemester');
    return result;
}
export const SemesterRegistrationService = {
    createAcademicSemesterIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}