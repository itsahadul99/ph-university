import { TStudent } from "./student.interface";
import Student from "./student.model";

const getAllStudentsFromDB = async () => {
    const result = await Student.find()
    return result;
}
const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id })
    const result = await Student.aggregate([
        { $match: { id: id } }
    ])
    return result;
}
const deleteStudentFromDB = async (id: string) => {
    const result = await Student.updateOne({ id }, { isDeleted: true }) // this will not work because we are using query middleware to check isDeleted: false
    return result;
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