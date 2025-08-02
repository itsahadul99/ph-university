import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;
    //step 1: Update Basic Course Data
    const updatedBasicCourseData = await Course.findByIdAndUpdate(
        id, courseRemainingData, { new: true, runValidators: true }
    )
    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
        //step 2: Update Pre-Requisite Courses
        // filter out deleted pre-requisite courses
        const deletedPreRequisiteCoursesId = preRequisiteCourses?.filter(course => course.isDeleted && course.isDeleted).map(course => course.course);
        const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
            $pull: {
                preRequisiteCourses: { course: { $in: deletedPreRequisiteCoursesId } }
            }
        })
        const updatedPreRequisiteCoursesId = preRequisiteCourses?.filter(course => !course.isDeleted);
        // Update existing pre-requisite courses
        const updatedPreRequisiteCourses = await Course.findByIdAndUpdate(
            id, {
            $addToSet: {
                preRequisiteCourses: {
                    $each: updatedPreRequisiteCoursesId
                }
            }
        }
        );
    }
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
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
export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB
}