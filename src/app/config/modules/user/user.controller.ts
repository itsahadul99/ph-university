import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../../utils";
import httpStatus from 'http-status'
// create student in DB
const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate the data using zod validation schema
        const { password, student } = req.body;
        // const zodParsedData = studentValidationSchema.parse(student);
        // will call the service func to send this data
        const result = await UserServices.createStudentIntoDB(password, student)
        // send the res
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Student created successfully.",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const UserControllers = {
    createStudent,
}