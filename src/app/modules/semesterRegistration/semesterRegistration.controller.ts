import httpStatus from 'http-status';
import { catchAsync, sendResponse } from "../../utils";
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationService.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Semester Registration created successfully.",
        data: result
    })
})
const getAllSemesterRegistrations = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationService.getAllSemesterRegistrationsFromDB();
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Semester Registrations retrieved successfully.",
        data: result
    })
})
export const SemesterRegistrationControler = {
    createSemesterRegistration,
    getAllSemesterRegistrations
}