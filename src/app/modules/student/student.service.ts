import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { StudentSearchableFields } from "./student.constant";
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
      const studnetQuery = new QueryBuilder(
        Student.find().populate('admissionSemester'),
        query,
    )
        .search(StudentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await studnetQuery.modelQuery;
    return result;
}
const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id })
    const result = await Student.findById( id ).populate("admissionSemester").populate({
        path: "academicDepartment",
        populate: {
            path: "academicFaculty"
        }
    })
    return result;
}
const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const result = await Student.findByIdAndUpdate( id , { isDeleted: true }, { new: true, session }) // this will not work because we are using query middleware to check isDeleted: false
        if (!result) {
            throw new AppError(httpStatus.NOT_FOUND, 'Student delete failed');
        }
        // get user id from student
        const userId = result.user;
        const isUserDeleted = await User.findByIdAndUpdate( userId , { isDeleted: true }, { new: true, session })
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
    const result = await Student.findByIdAndUpdate(id , modifiedStudentData, { new: true, runValidators: true });
    return result;
}
export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentInfoInDB
}