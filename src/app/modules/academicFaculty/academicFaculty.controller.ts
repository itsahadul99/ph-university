import httpStatus from 'http-status';
import { catchAsync, sendResponse } from "../../utils";
import { AcademicFacultyServices } from './academicFaculty.service';
// get all students from DB
const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic Faculty retrieved successfully.",
        data: result
    })
})
const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic Faculty created successfully.",
        data: result
    })
})
const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId, req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic faculty updated successfully.",
        data: result
    })
})
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic Faculty retrieved successfully.",
        data: result
    })
})

export const AcademicFacultyControllers = {
    getAllAcademicFaculties,
    createAcademicFaculty,
    updateAcademicFaculty,
    getSingleAcademicFaculty
}