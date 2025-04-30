import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: "Student are retrieved successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}
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
        console.log(error);
    }
}

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student } = req.body;
        // will call the service func to send this data
        const result = await StudentServices.createStudentIntoDB(student)
        // send the res
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent
}