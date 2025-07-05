import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import httpStatus from 'http-status';
const createStudentIntoDB = async (password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {}
    // if password then use it otherwise use default password
    userData.password = password || (config.default_password as string);
    // set student role
    userData.role = 'student';
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
    if (!admissionSemester) {
        throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
    }
    // create a session for the student
    const session = await mongoose.startSession()
    try {
        session.startTransaction();
        userData.id = await generateStudentId(admissionSemester)
        // Create the userData
        const newUser = await User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        // create the student
        const newStudent = await Student.create([payload], { session });
        if (!newStudent) {
            console.log('New student created successfully:', newStudent);
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
        }
        await session.commitTransaction();
        await session.endSession();
        return newStudent;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create student');
    }
}

export const UserServices = {
    createStudentIntoDB
}