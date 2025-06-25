import httpStatus from 'http-status';
import { catchAsync, sendResponse } from "../../utils";
import { AcademicDepartmentServices } from './academicDepartment.service';
// get all students from DB
const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic departments retrieved successfully.",
        data: result
    })
})
const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic Department created successfully.",
        data: result
    })
})
const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { academicDepartmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(academicDepartmentId, req.body);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic Department updated successfully.",
        data: result
    })
})
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { academicDepartmentId } = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(academicDepartmentId);
    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Academic Department retrieved successfully.",
        data: result
    })
})

export const AcademicDepartmentControllers = {
    getAllAcademicDepartments,
    createAcademicDepartment,
    updateAcademicDepartment,
    getSingleAcademicDepartment
}