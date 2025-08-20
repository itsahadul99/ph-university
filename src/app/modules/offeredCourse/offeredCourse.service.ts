import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
const createofferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const { academicDepartment, course, faculty, academicFaculty, semesterRegistration, section } = payload;
    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Semester Registration not found");
    }
    // check the academic department is exists or not
    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found");
    }
    // Check the course is exists or not
    const isCourseExists = await Course.findById(course);
    if (!isCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Course not found");
    }
    // Check the faculty is exists or not
    const isFacultyExists = await Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Faculty not found");
    }
    // Check the academic faculty is exists or not
    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found");
    }
    // check the faculty is belogs to the academic faculty
    const isDepartmentBelogToFaculty = await AcademicDepartment.findOne({ academicFaculty, _id: academicDepartment });
    if (!isDepartmentBelogToFaculty) {
        throw new AppError(httpStatus.NOT_FOUND, "Academic Department does not belong to this Academic Faculty");
    }
    // check the academic semester is already exists for this course
    const academicSemester = isSemesterRegistrationExists.academicSemester;

    // Check if the same course same section in the same semester already exists
    const isSameOfferedCourseExistsWithSameRegisteredSemester = await OfferedCourse.findOne({ semesterRegistration, course, section })
    if (isSameOfferedCourseExistsWithSameRegisteredSemester) {
        throw new AppError(httpStatus.CONFLICT, "Offered Course already exists for this semester with the same course and section");
    }
    const result = await OfferedCourse.create({ ...payload, academicSemester });
    return result;
}
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
    const result = await OfferedCourse.find()
        .populate("academicSemester")          // populate academicSemester
        .populate("academicFaculty")           // populate academicFaculty (not "faculty")
        .populate("faculty")                    // populate facult
        .populate("course")                    // populate course
        .populate("semesterRegistration")
        .populate('academicDepartment')    // populate semesterRegistration
    return result;
}

const getSingleOfferedCourseFromDB = async (id: string) => {

}
const updateOfferedCourseIntoDB = async (id: string, payload: Partial<TOfferedCourse>) => {

}
export const OfferedCourseService = {
    createofferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB
}