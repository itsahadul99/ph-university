import httpStatus from 'http-status';
import { catchAsync, sendResponse } from "../../utils";
import { UserServices } from "./user.service";
// create student in DB
const createStudent = catchAsync(async (req, res) => {

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
})

export const UserControllers = {
    createStudent,
}