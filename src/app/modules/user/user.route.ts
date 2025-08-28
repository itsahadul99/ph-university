import express from 'express';
import { UserControllers } from './user.controller';
import { auth, validateRequest } from '../../middlewares';
import { studentValidations } from '../student/student.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import { adminValidations } from '../admin/admin.validation';
import { USER_ROLE } from './user.constant';

const router = express.Router();

// will call controller function
router.post('/create-student', auth(USER_ROLE.admin), validateRequest(studentValidations.createStudentValidationSchema), UserControllers.createStudent)
router.post('/create-faculty', validateRequest(facultyValidations.createFacultyValidationSchema), UserControllers.createFaculty);
router.post('/create-admin', validateRequest(adminValidations.createAdminValidationSchema), UserControllers.createAdmin);
export const UserRoutes = router;
