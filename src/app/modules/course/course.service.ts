import { join } from "path";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import httpStatus from "http-status";
const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;
    const session = await Course.startSession();
    try {
        session.startTransaction();
        //step 1: Update Basic Course Data
        const updatedBasicCourseData = await Course.findByIdAndUpdate(
            id, courseRemainingData, { new: true, runValidators: true, session }
        ).populate('preRequisiteCourses.course');
        if (!updatedBasicCourseData) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Course update failed');
        }
        if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
            //step 2: Update Pre-Requisite Courses
            // filter out deleted pre-requisite courses
            const deletedPreRequisiteCoursesId = preRequisiteCourses?.filter(course => course.isDeleted && course.isDeleted).map(course => course.course);
            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourses: { course: { $in: deletedPreRequisiteCoursesId } }
                    }
                },
                { new: true, runValidators: true, session }
            );
            if (!deletedPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete pre-requisite courses');
            }
            const updatedPreRequisiteCoursesId = preRequisiteCourses?.filter(course => !course.isDeleted);
            // Update existing pre-requisite courses
            const updatedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id, {
                $addToSet: {
                    preRequisiteCourses: {
                        $each: updatedPreRequisiteCoursesId
                    }
                }
            },
                { new: true, runValidators: true, session }
            );
            if (!updatedPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update pre-requisite courses');
            }
            const result = await Course.findById(id).populate('preRequisiteCourses.course');
            return result;
        }
        await session.commitTransaction();
        await session.endSession();
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update course');
    }
}
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
        .search(CourseSearchableFields)
        .filter()
        .paginate()
        .fields();
    const result = await courseQuery.modelQuery;
    return result;
}

const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
}
const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
}

const assignCourseWithFacultyIntoDB = async (id: string, facultyIds: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculties: { $each: facultyIds } }
        },
        {
            upsert: true,
            new: true,
        }
    )
    return result;
}

const deleteAssignCourseFacultyFromDB = async (id: string, facultyIds: string) => {
   const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
           $pull: { faculties: { $in: facultyIds } }
        },
        {
            upsert: true,
            new: true,
        }
    )
    return result;
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB,
    assignCourseWithFacultyIntoDB,
    deleteAssignCourseFacultyFromDB
}