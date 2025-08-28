/* This TypeScript code snippet is setting up routes for different modules in an Express application.
Here's a breakdown of what it does: */
import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { CourseRoute } from "../modules/course/course.route";
import { SemesterRegistrationRoute } from "../modules/semesterRegistration/semesterRegistration.route";
import { OfferedCourseRoute } from "../modules/offeredCourse/offeredCourse.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes
    },
    {
        path: '/faculties',
        route: FacultyRoutes
    },
    {
        path: "/admins",
        route: AdminRoutes
    },
    {
        path: '/courses',
        route: CourseRoute
    },
    {
        path: '/semester-registrations',
        route: SemesterRegistrationRoute
    },
    {
        path: '/offered-course',
        route: OfferedCourseRoute
    },
    {
        path: '/auth/',
        route: AuthRoutes,
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;