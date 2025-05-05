import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { updateStudentInfoValidationSchema } from "./student.validation";

// get all students from DB
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: "Student are retrieved successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error
        })
    }
}
// get single student from DB
const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: "Student is retrieved successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error
        })
    }
}

// update student info in DB
const updateStudentInfo = async (req: Request, res: Response) => {
    try {
        const { student } = req.body;
        const { studentId } = req.params;
        // validate the data using zod validation schema
        const zodParsedData = updateStudentInfoValidationSchema.parse(student);
        const result = await StudentServices.updateStudentInfoInDB(studentId, zodParsedData);
        res.status(200).json({
            success: true,
            message: "Student is updated successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong.",
            error: error
        })

    }
}

// Delete student from DB
const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: "Student is deleted successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error
        })
    }
}

export const StudentControllers = {
    updateStudentInfo,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}