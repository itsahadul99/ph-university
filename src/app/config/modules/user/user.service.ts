import config from "../..";
import { TStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    const userData: Partial<TUser> = {}

    // if password then use it otherwise use default password
    userData.password = password || (config.default_password as string);

    // set student role
    userData.role = 'student';

    // manually set the id
    userData.id = '203010001'

    // Create the userData
    const newUser = await User.create(userData)
    // create a student if userData create successfully
    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.user = newUser._id;
        // create the student
        const newStudent = await Student.create(studentData);
        return newStudent;
    }
    return newUser;
}

export const UserServices = {
    createStudentIntoDB
}