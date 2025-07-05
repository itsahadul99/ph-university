import config from "../../config";
import AppError from "../../errors/AppError";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

    const userData: Partial<TUser> = {}

    // if password then use it otherwise use default password
    userData.password = password || (config.default_password as string);
    // set student role
    userData.role = 'student';
    // find the academic semester 
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
    if (!admissionSemester) {
        throw new AppError(402, 'Admission semester not found');
    }
    userData.id = await generateStudentId(admissionSemester)
    // Create the userData
    const newUser = await User.create(userData)
    // create a student if userData create successfully
    if (Object.keys(newUser).length) {
        payload.id = newUser.id;
        payload.user = newUser._id;
        // create the student
        const newStudent = await Student.create(payload);
        return newStudent;
    }
    return newUser;
}

export const UserServices = {
    createStudentIntoDB
}