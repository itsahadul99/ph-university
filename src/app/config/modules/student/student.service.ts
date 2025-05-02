import { TStudent } from "./student.interface";
import Student from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
    // CUSTOM STATIC METHOD TO CHECK IF USER EXIST OR NOT
    if (await Student.isUserExist(studentData.id)) {
        throw new Error("Student already exists with this id")
    }
    const result = await Student.create(studentData) // this is build in method of mongoose
    // const student = new Student(studentData); // this is build in instance method of mongoose
    // if (await student.isUserExist(studentData.id)) {
    //     throw new Error("Student already exists with this id")
    // }
    // const result = await student.save(); // this is build in instance method of mongoose
    return result;
}
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
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentInfoInDB
}