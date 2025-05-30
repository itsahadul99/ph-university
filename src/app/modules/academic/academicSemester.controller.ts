import httpStatus from 'http-status';
import { catchAsync, sendResponse } from "../../utils";
import { AcademicSemesterService } from './academicSemester.service';
// get all students from DB
const getAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.getAcademicSemesterFromDB();
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic semester fetched successfully.",
        data: result
    })
})
const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic semester created successfully.",
        data: result
    })
})
const updateAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic semester updated successfully.",
        data: result
    })
})

export const AcademicSemesterControllers = {
    getAcademicSemester,
    createAcademicSemester
}