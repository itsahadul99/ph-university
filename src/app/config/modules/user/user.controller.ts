import { Request, Response } from "express";
import { UserServices } from "./user.service";

// create student in DB
const createStudent = async (req: Request, res: Response) => {
    try {
        // Validate the data using zod validation schema
        const { password, student } = req.body;
        // const zodParsedData = studentValidationSchema.parse(student);
        // will call the service func to send this data
        const result = await UserServices.createStudentIntoDB(password, student)
        // send the res
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
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

export const UserControllers = {
    createStudent,
}