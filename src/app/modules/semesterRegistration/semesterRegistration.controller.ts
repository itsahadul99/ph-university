import httpStatus from 'http-status';
import { catchAsync, sendResponse } from "../../utils";
import { AcademicSemesterService } from './semesterRegistration.service';
// get all students from DB
const getAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.getAcademicSemesterFromDB();
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic semester retrieved successfully.",
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
    const { semesterId } = req.params;
    const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(semesterId, req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic semester updated successfully.",
        data: result
    })
})
const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterService.getSingleAcademicSemesterFromDB(semesterId);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Student retrieved successfully.",
        data: result
    })
})

export const AcademicSemesterControllers = {
    getAcademicSemester,
    createAcademicSemester,
    updateAcademicSemester,
    getSingleAcademicSemester
}