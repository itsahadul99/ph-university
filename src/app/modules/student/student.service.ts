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
    const result = await Student.find({ id }).populate("admissionSemester").populate({
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
    const result = await Student.updateOne({ id }, studentData)
    return result;
}
export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentInfoInDB
}