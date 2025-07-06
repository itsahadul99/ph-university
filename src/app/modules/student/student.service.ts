import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';
import { User } from "../user/user.model";
const getAllStudentsFromDB = async () => {
    const result = await Student.find().populate("admissionSemester").populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty"
        }
    })
    return result;
}
const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id })
    const result = await Student.findOne({ id }).populate("admissionSemester").populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty"
        }
    })
    return result;
}
const deleteStudentFromDB = async (id: string) => {
    // check if student exists
    const isStudentExists = await Student.isUserExists(id);
    if (!isStudentExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
    }
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const result = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session }) // this will not work because we are using query middleware to check isDeleted: false
        if (!result) {
            throw new AppError(httpStatus.NOT_FOUND, 'Student delete failed');
        }
        const isUserDeleted = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session })
        if (!isUserDeleted) {
            throw new AppError(httpStatus.NOT_FOUND, 'User delete failed');
        }
        await session.commitTransaction();
        await session.endSession();
        return result;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete student');
    }

}
// update student info in DB
const updateStudentInfoInDB = async (id: string, studentData: Partial<TStudent>) => {
    const isStudentExists = await Student.isUserExists(id);
    if (!isStudentExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
    }
    // extract the non premetive data 
    const { name, guardian, localGuardian, ...restOfTheStudentData } = studentData;
    const modifiedStudentData: Record<string, unknown> = { ...restOfTheStudentData };
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedStudentData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedStudentData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedStudentData[`localGuardian.${key}`] = value;
        }
    }
    const result = await Student.updateOne({ id }, modifiedStudentData, { new: true, runValidators: true });
    return result;
}
export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentInfoInDB
}