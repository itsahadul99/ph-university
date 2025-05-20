import httpStatus from 'http-status';
import { catchAsync, sendResponse } from "../../utils";
import { StudentServices } from "./student.service";
import { updateStudentInfoValidationSchema } from "./student.validation";

// get all students from DB
const getAllStudents = catchAsync(async (req, res, next) => {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Student are retrieved successfully.",
        data: result
    })
})
// get single student from DB
const getSingleStudent = catchAsync(async (req, res, next) => {

    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Student retrieved successfully.",
        data: result
    })
})

// update student info in DB
const updateStudentInfo = catchAsync(async (req, res, next) => {
    const { student } = req.body;
    const { studentId } = req.params;
    // validate the data using zod validation schema
    const zodParsedData = updateStudentInfoValidationSchema.parse(student);
    const result = await StudentServices.updateStudentInfoInDB(studentId, zodParsedData);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Student is update successfully.",
        data: result
    })
})

// Delete student from DB
const deleteStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Student deleted successfully.",
        data: result
    })
})

export const StudentControllers = {
    updateStudentInfo,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}