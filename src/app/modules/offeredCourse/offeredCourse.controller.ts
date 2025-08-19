import httpStatus from 'http-status';
import { catchAsync, sendResponse } from "../../utils";
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseService.createofferedCourseIntoDB(req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Offered Course created successfully.",
        data: result
    })
})
const getAllOfferedCourses = catchAsync(async (req, res) => {
    const result = await OfferedCourseService.getAllOfferedCourseFromDB(req.query);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Offered Course retrieved successfully.",
        data: result
    })
})
const getSingleOfferedCourse = catchAsync(async (req, res) => {
    const { OfferedCourseId } = req.params;
    const result = await OfferedCourseService.getSingleOfferedCourseFromDB(OfferedCourseId);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Semester Registration retrieved successfully.",
        data: result
    })
})
const updateOfferedCourse = catchAsync(async (req, res) => {
    const { OfferedCourseId } = req.params;
    const result = await OfferedCourseService.updateOfferedCourseIntoDB(OfferedCourseId, req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Semester Registration updated successfully.",
        data: result
    })
})
export const OfferedCourseControler = {
    createOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourse,
    updateOfferedCourse
}