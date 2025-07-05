import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";


const findLastStudentId = async () => {
    const lastStudentId = await User.findOne(
        {
            role: "student"
        },
        {
            id: 1,
            _id: 0
        }
    ).sort({ createdAt: -1 }).lean()

    return lastStudentId?.id ? lastStudentId?.id : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
    // first time when no student
    let currentId = (0).toString();
    const lastStudentId = await findLastStudentId();
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
    const lastStudentYear = lastStudentId?.substring(0, 4);

    if (lastStudentId && lastStudentSemesterCode === payload.code && lastStudentYear === payload.year) {
        currentId = lastStudentId.substring(6)
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId;

}
