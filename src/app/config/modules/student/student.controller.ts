import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import { updateStudentInfoValidationSchema } from "./student.validation";
import { sendResponse } from "../../../utils";
import httpStatus from 'http-status'
// get all students from DB
const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Student are retrieved successfully.",
            data: result
        })
    } catch (error) {
        next(error)
    }
}
// get single student from DB
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Student retrieved successfully.",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// update student info in DB
const updateStudentInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
        next(error)
    }
}

// Delete student from DB
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Student deleted successfully.",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const StudentControllers = {
    updateStudentInfo,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}