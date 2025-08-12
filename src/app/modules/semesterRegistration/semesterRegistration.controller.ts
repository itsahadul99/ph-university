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
    const result = await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(req.query);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Semester Registrations retrieved successfully.",
        data: result
    })
})
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { semesterRegistrationId } = req.params;
    const result = await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(semesterRegistrationId);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Semester Registration retrieved successfully.",
        data: result
    })
})
const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { semesterRegistrationId } = req.params;
    const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(semesterRegistrationId, req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Semester Registration updated successfully.",
        data: result
    })
})
export const SemesterRegistrationControler = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}