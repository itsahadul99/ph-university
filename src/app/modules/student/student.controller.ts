import httpStatus from 'http-status';
import { catchAsync, sendResponse } from "../../utils";
import { StudentServices } from "./student.service";

// get all students from DB
const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB(req.query);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Student are retrieved successfully.",
        data: result
    })
})
// get single student from DB
const getSingleStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Student retrieved successfully.",
        data: result
    })
})

// update student info in DB
const updateStudentInfo = catchAsync(async (req, res) => {
    const { student } = req.body;
    const { id } = req.params;
    const result = await StudentServices.updateStudentInfoInDB(id, student);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Student is update successfully.",
        data: result
    })
})

// Delete student from DB
const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);
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