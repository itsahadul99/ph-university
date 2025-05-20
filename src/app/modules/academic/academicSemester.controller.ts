import httpStatus from 'http-status';
import { catchAsync, sendResponse } from "../../utils";
import { AcademicSemesterService } from './academicSemester.service';
// get all students from DB
const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic semester created successfully.",
        data: result
    })
})

export const AcademicSemesterControllers = {
    createAcademicSemester
}