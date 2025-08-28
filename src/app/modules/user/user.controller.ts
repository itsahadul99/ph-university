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

const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty } = req.body;
    // Validate the data using zod validation schema
    const result = await UserServices.createFacultyIntoDB(password, faculty);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Faculty created successfully.",
        data: result
    })
})
const createAdmin = catchAsync(async (req, res) => {
    const { password, admin } = req.body;
    // Validate the data using zod validation schema
    const result = await UserServices.createAdminIntoDB(password, admin);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Admin created successfully.",
        data: result
    })
})
const getMe = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await UserServices.getMe(user?.userId, user.role);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Admin created successfully.",
        data: result
    })
})
const changeStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.changeStatus(id, req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Status changed successfully.",
        data: result
    })
})

export const UserControllers = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe,
    changeStatus
}