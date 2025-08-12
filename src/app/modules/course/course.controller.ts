import httpStatus from 'http-status';
import { catchAsync, sendResponse } from '../../utils';
import { CourseServices } from './course.service';
const createCourse = catchAsync(async (req, res) => {
    const { course } = req.body;
    const result = await CourseServices.createCourseIntoDB(course);
    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Course is created successfully',
        data: result,
    });
})
const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { course } = req.body;
    const result = await CourseServices.updateCourseIntoDB(id, course);
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Course updated successfully',
        data: result,
    });
})
const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Course is retrieved successfully',
        data: result,
    });
});

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Courses are retrieved successfully',
        data: result,
    });
});


const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Course is deleted successfully',
        data: result,
    });
});

const assignCourseWithFaculty = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignCourseWithFacultyIntoDB(courseId, faculties);
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Faculty assigned into this course successfully',
        data: result,
    });
})

const removeFacultyFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties} = req.body;
    const result = await CourseServices.deleteAssignCourseFacultyFromDB(courseId, faculties);
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Faculty removed from this course successfully',
        data: result,
    });
})

export const CourseControllers = {
    createCourse,
    updateCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    assignCourseWithFaculty,
    removeFacultyFromCourse
};